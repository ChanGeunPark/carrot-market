import type { NextPage } from "next";
import Button from '@component/button';
import Input from '@component/input';
import Layout from '@component/layout';
import TextArea from '@component/textarea';
import useUser from '@libs/client/useUser';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Stream } from '@prisma/client';

interface CreateForm {
  name:string;
  price:number;
  description:string;
}

interface CreateResponse {
  ok:boolean;
  stream:Stream;
}

const Create: NextPage = () => {
  const {user,isLoading} = useUser();
  const router = useRouter();
  const {register, handleSubmit} = useForm<CreateForm>();
  const [createStream, {data,loading}] = useMutation<CreateResponse>(`/api/streams`);

  const onvalid = (form:CreateForm) => {
    if(loading) return;
    createStream(form);
  }
  
  useEffect(()=>{
    if(data && data.ok == true){
      router.push(`/stream/${data.stream.id}`);
    }
  },[data])


  return (
    <Layout canGoBack title="Go Live">
      <form onSubmit={handleSubmit(onvalid)} className=" space-y-4 py-10 px-4">
        <Input register={register("name",{required:true})} required label="Name" name="name" type="text" />
        <Input
          register={register("price",{required:true,valueAsNumber:true})}
          required
          label="Price"
          placeholder="0.00"
          name="price"
          type="text"
          kind="price"
        />
        <TextArea register={register("description")} name="description" label="Description" />
        <Button text={isLoading ? "Loading..." : "Go live"} />
      </form>
    </Layout>
  );
};

export default Create;