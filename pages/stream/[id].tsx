import type { NextPage } from "next";
import Layout from '@component/layout';
import Messages from '@component/messages';
import useSWR from 'swr';
import useUser from '@libs/client/useUser';
import { useRouter } from 'next/router';
import { Message, Stream, User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { useEffect } from 'react';


interface MessageWithUser extends Message{
  user:User;
}

interface UserWhitStream extends Stream{ 
  user:User;
}

interface StreamResponse {
  ok:boolean;
  streams:UserWhitStream;
  messages: MessageWithUser[];
}


interface MessageForm{
  message:string;
}


const Stream: NextPage = () => {

  const {user} = useUser();
  const router = useRouter();
  const {register,handleSubmit,reset} = useForm<MessageForm>();
  const [sendMessage,{data:mesageData, loading}] = useMutation(`/api/streams/${router.query.id}/messages`);
  const {data, mutate} = useSWR<StreamResponse>(router.query.id ? `/api/streams/${router.query.id}` : null , 
  {
      refreshInterval:1000,
  }//useSWR이 서버에서 얼마나 새로고침 되기를 원하는지 명시할 수 있게 해준다.
  );
  console.log(data)

  const onvalid = (form : MessageForm) => {
      if (loading) 
          return;
      reset();
      mutate(prev => prev && ({
          ...prev,
          messages: [
              ...prev.messages, {
                  id: Date.now(),
                  message: form.message,
                  userId:user?.id,
                  user: {
                      ...user
                  }
              }
          ]
      } as any)
      ,false);
      console.log(mutate);
      //sendMessage(form);
  }




  return (
    <Layout canGoBack>
      <div className="py-10 px-4  space-y-4">
        <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">{data?.streams?.name}</h1>
          <span className="text-2xl block mt-3 text-gray-900">${data?.streams?.price}</span>
          <p className=" my-6 text-gray-700">
            {data?.streams?.description}
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
          <div className="py-10 pb-16 h-[50vh] overflow-y-scroll  px-4 space-y-4">
            {data?.messages?.map((mesages)=>(
              <Messages key={mesages.id} message={mesages.message} reversed={mesages.userId === user?.id} />
            ))}
          </div>
          <div className="fixed py-2 bg-white  bottom-0 inset-x-0">
            <form onSubmit={handleSubmit(onvalid)} className="flex relative max-w-md items-center  w-full mx-auto">
                <input
                  type="text"
                  {...register("message",{required:true})}
                  className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
                />
                <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                  <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 text-sm text-white">
                    &rarr;
                  </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stream;