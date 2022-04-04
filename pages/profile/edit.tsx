import type { NextPage } from "next";
import Button from '@component/button';
import Input from '@component/input';
import Layout from '@component/layout';
import useUser from '@libs/client/useUser';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { User } from '@prisma/client';
import useMutation from '@libs/client/useMutation';
import { useRouter } from 'next/router';

interface EditProfileForm{
  email? : string;
  phone? : string;
  name? : string;
  formErrors? : string;
}

interface EditProfileResponse{
  ok:boolean;
  error?:string;
}


const EditProfile: NextPage = () => {

  const {user} = useUser();
  const {register, handleSubmit, setValue, setError, formState:{errors}} = useForm<EditProfileForm>();
  const [editProfile,{data, loading}] = useMutation<EditProfileResponse>(`/api/users/me`);
  const router = useRouter();


console.log(data);
  useEffect(()=>{
    if(user?.email) setValue('email', user.email);
    if(user?.phone) setValue('phone', user.phone);
    if(user?.name) setValue("name" , user.name);
  },[user,setValue]);

  useEffect(()=>{
    if(data && !data?.ok){
      setError("formErrors", {message:data.error});
    }

    if(data?.ok === true){
      alert("변경완료");
    }
  },[data]);

  const onvaild = ({email,phone,name}:EditProfileForm) =>{
    if(loading) return;
    if(email === "" && phone === "" && name === ""){
      return setError('formErrors',{message:"이메일과 핸드폰중에 하나를 선택하여 정보를 입력해주세요"});
    }
    editProfile({email: email !== user?.email ? email : "",phone: phone !== user?.phone ? phone : "",name:name !== user?.name ? name : ""});
  };

  return (
    <Layout canGoBack title="Edit Profile">
      <form onSubmit={handleSubmit(onvaild)} className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
            register={register("name")}
            required={false}
            label="Name"
            name="Name"
            type="text"
        />
        <Input
            register={register("email")}
            required={false}
            label="Email address"
            name="email"
            type="email"
        />
        <Input
          register={register("phone")}
          required={false}
          label="Phone number"
          name="phone"
          type="number"
          kind="phone"
        />
        {errors ?<p className='text-sm text-red-500'>{errors.formErrors?.message}</p> : null}
        <Button text={loading ? "Loading..." : "Update profile"} />
      </form>
    </Layout>
  );
};

export default EditProfile;