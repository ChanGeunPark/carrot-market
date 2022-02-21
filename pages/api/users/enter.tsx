import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import withHandler from "@libs/server/withHandler"

async function handler(req:NextApiRequest, res:NextApiResponse){
//클라이언트 핸드러러엔 두개의 prop을 갖는데 한개는 데이터를 보내느것 한개는 데이터를 받는것이다.
//NextApiRequest를 ctrl 클릭했을때 옵션을 보여준다.


  // if(req.method !== "POST"){
  //   res.status(401).end();
  // }

  console.log(req.body);
  res.status(200).end();
  //req.body를 console.log 하고 있고 status 200 을 보내고 있다.
}

export default withHandler("GET", handler);//nextjs는 export default를 안해주면 req, res를 받아오지 않는다.