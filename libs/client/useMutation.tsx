//react component고 function과 state를 return 할것이다.

import { useState } from 'react'

interface UseMutationState {
  loading: boolean;
  data?: object;
  error?: object;
}
type UseMutationResult = [(data:any) => void , UseMutationState];

export default function useMutation(url:string): UseMutationResult{
  //useMutation의 argument는 url이 될거다.
  //typescript를 사용하고 있다면 useMutation의 return type을 설정해줘야 한다.

  /*
  const [state,setState] = useState({
    loading:false,
    data: undefined,
    error: undefined,
  });
*/

const [loading, setLoading] = useState(false);
const [data, setData] = useState<undefined | any>(undefined);
const [error, setError] = useState<undefined | any>(undefined);

  function mutation(data: any){
    setLoading(true);
    fetch(url,{
      method:"POST",
      headers:{
        "content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json().catch(()=>{}))
    .then(setData)//(json) => setData(json) 줄일수도 있다.
    .catch(setError).finally(()=> setLoading(false));
  }// 백엔드로 보낸 data를 받게 될거다.

  return [mutation, {loading, data, error}];
}