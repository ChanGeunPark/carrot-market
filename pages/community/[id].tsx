import type { NextPage } from "next";
import Layout from '@component/layout';
import TextArea from '@component/textarea';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { Answer, Post, User } from '@prisma/client';
import { cls } from '@libs/utils';
import { useEffect } from 'react';


interface AnswerRequest{
  anwer:string;
}

interface AnswerWithUser extends Answer{
  user:User;
}

interface PostWithUser extends Post{
  user:User;
  _count:{
    answers:number;
    wondering:number;
  }
  answers:AnswerWithUser[];
}

interface coummunityPostResponse{
  ok: boolean;
  post : PostWithUser;
  isWondering:boolean;
}

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  const {data, mutate} = useSWR<coummunityPostResponse>(router.query.id ? `/api/community/${router.query.id}` : null);
  const {register, handleSubmit, reset} = useForm<AnswerRequest>();
  const [anwer,{data:anwerdata,loading:answerLoading}] = useMutation(`/api/community/${router.query.id}/answer`);

  const oninvalid = (data:AnswerRequest) =>{
    anwer(data);
  }
  console.log(data);

  const [wonder,{loading}] = useMutation(`/api/community/${router.query.id}/wonder`);

  const onWonderClick = () =>{
    if(!data) return;
    mutate({
      ...data, 
      post:{...data.post,
        _count:{...data.post._count,
          wondering: !data.isWondering ? data?.post._count.wondering + 1 : data?.post._count.wondering - 1 ,
        },
      },
      isWondering: !data.isWondering,
    },false);//mutate는 bound mutate이다  request에서 return 된 데이터만 mutate 할수있다.
    if(loading) {
      wonder({});//빈 배열만 보내도 백엔드 api에서 만들어준다. //mutate는 임시로 백엔드에 데이터를 바꿔준다.
    };
    
  }

  useEffect(()=> {
    if(anwerdata){
      reset();
      mutate();
    }
  },[anwerdata,reset,mutate]);


  return (
    <Layout canGoBack>
      <div>
        <span className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          동네질문
        </span>
        <div className="flex mb-3 px-4 cursor-pointer pb-3  border-b items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-slate-300" />
          <div>
            <p className="text-sm font-medium text-gray-700">{data?.post?.user.name}</p>
            <p className="text-xs font-medium text-gray-500">
              View profile &rarr;
            </p>
          </div>
        </div>
        <div>
          <div className="mt-2 px-4 text-gray-700">
            <span className="text-orange-500 font-medium">Q.</span>
            {data?.post?.question}
          </div>
          <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px]  w-full">
            <button 
              type='button' 
              className={cls('flex space-x-2 items-center text-sm cursor-pointer', data?.isWondering ? "text-green-500" : "")}
              onClick={onWonderClick}>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>궁금해요 {data?.post?._count?.wondering}</span>
            </button>
            <span className="flex space-x-2 items-center text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>답변 {data?.post?._count?.answers}</span>
            </span>
          </div>
        </div>
        
          <div className="px-4 my-5 space-y-5">
          {data?.post.answers.map((answer) => (
            <div key={answer.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-slate-200 rounded-full" />
              <div>
                <span className="text-sm block font-medium text-gray-700">
                  {answer.user.name}
                </span>
                <span className="text-xs text-gray-500 block ">{answer.createAt}</span>
                <p className="text-gray-700 mt-2">
                  {answer?.anwer}
                </p>
              </div>
            </div>
          ))}
          </div>
        

        <div className="px-4">
          <form onSubmit={handleSubmit(oninvalid)} >
            <TextArea
              register={register("anwer",{required:true,minLength:5})}
              name="description"
              placeholder="Answer this question!"
              required
            />
            <button className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none ">
              {answerLoading ? "Loading..." : 'Reply'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};
//6:00
export default CommunityPostDetail;