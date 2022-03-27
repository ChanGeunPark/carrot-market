import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from '@libs/server/client';
import { UserList } from 'twilio/lib/rest/conversations/v1/user';



async function handler(req : NextApiRequest, res : NextApiResponse<ResponseType>) {

if(req.method === "GET"){
  const products = await client.product.findMany({
    include:{
      _count:{
        select:{
          favs:true,
        },
      },
    },
  });//그냥 include에 favs를 하면 해당 데이터의 low를 다 가져온다. 그래서 _count에 select를 하는게 좋다.

  res.json({
    ok:true,
    products,
  });
}
if(req.method === "POST"){
  const {
    body: { name, price, description}, 
    session: {user}
  }= req;

  const product = await client.product.create({
    data:{
      image:"xx",
      name,
      price:+price,
      description,
      user: {
        connect:{
          id:user?.id
        }
      }
    }
  });

    res.json({
      ok:true,
      product
    });
  }

}

export default withApiSession(withHandler({
  methods:["GET","POST"],
  handler
})); 
// 여기에 핸들러는 유저만 호출할 수 있다.
//GET으로 받아야지 브라우저에서 확인할 수 있다.
//9.9 3분 36초부터 다시 시작