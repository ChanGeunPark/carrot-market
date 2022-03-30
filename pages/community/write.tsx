import type { NextPage } from "next";
import Button from '@component/button';
import Layout from '@component/layout';
import TextArea from '@component/textarea';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { useEffect } from 'react';
import { Post } from '@prisma/client';
import { useRouter } from 'next/router';

interface WriteForm{
  question:string;
}

interface WriteResponse{
  ok:boolean;
  community: Post;
}


const Write: NextPage = () => {
  const router = useRouter();
  const {register, handleSubmit} = useForm<WriteForm>();
  const [coummunity,{loading,data,error}] = useMutation<WriteResponse>("/api/community");
  
  const onValid = (data:WriteForm) => {
    if(loading) return;
    coummunity(data);
  }
  console.log(data);
useEffect(()=> {
if(data && data.ok){
  router.push(`/community/${data.community.id}`);
}
},[data,router]);

  return (
    <form className="px-4 py-10" onSubmit={handleSubmit(onValid)}>
      <TextArea register={register("question",{required:true,minLength:5})} required placeholder="Ask a question!"/>
      <Button text={loading ? "Loading..." : "Submit"}/>
    </form>
  );
};

//6.42초
export default Write;