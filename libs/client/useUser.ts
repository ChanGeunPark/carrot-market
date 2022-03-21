import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import useSWR from 'swr';

export default function useUser(){
  const {data, error} = useSWR("/api/users/me");
  //첫번째 인자가 url이 아니라 key라고 불리는 이유는 url이 api를 요청할 url이기도 하면서 캐시를 저장할때 사용할 key이기도 한다.
  const router = useRouter();
  useEffect(()=>{
    if(data && !data.ok){
      router.push("/enter");
    }
  },[data,router]);


  //const [user,setUser]= useState();
  // const router = useRouter();
  // useEffect(()=>{
  //   fetch("/api/users/me")
  //     .then(response => response.json())
  //     .then(data => {
  //       if(!data.ok){
  //         return router.push("/enter");
  //       }
  //       setUser(data.profile);
  //     });
  // },[router]);
  return {user:data?.profile, isLoading:!data && !error}; 
  /*
  user:{data} -> user:{profile}로 바꿈
  */
}