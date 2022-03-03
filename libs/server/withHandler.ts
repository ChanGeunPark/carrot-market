import { NextApiRequest, NextApiResponse } from 'next';



export interface ResponseType{
  ok: boolean;
  [key:string]:any;
}

export default function whitHandler(
    method : "GET" | "POST" | "DELETE",
    fn : (req : NextApiRequest, res : NextApiResponse) => void
) {

  //nextJS가 실행해야 할 것을 return해야한다.
  // 이함수가 nextJS가 실행할 함수이다.
  return async function(req : NextApiRequest, res : NextApiResponse){
    if(req.method !== method){
      res.status(405).end();
    }
    try{
      await fn(req, res);
    } catch(error){
      console.log(error);
      return res.status(500).json({error});
    }
  };
}