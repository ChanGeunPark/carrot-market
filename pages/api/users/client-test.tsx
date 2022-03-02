import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';

export default async function handler(
  req:NextApiRequest, res:NextApiResponse
){
//클라이언트 핸드러러엔 두개의 prop을 갖는데 한개는 데이터를 보내느것 한개는 데이터를 받는것이다.
//NextApiRequest를 ctrl 클릭했을때 옵션을 보여준다.
await client.user.create({
  data: {
    email: "hi@asdfasdf",
    name:"asdfasdf",
},
});

res.json({
  ok:true,
});
}