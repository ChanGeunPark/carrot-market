import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from '@libs/server/client';
import { UserList } from 'twilio/lib/rest/conversations/v1/user';



async function handler(req : NextApiRequest, res : NextApiResponse<ResponseType>) {
  const {query:{id}, session:{user}} = req;

  const alreadyExists = await client.fav.findFirst({
    where:{
      productId: +id.toString(),
      userId: user?.id,
    }
  })

  if(alreadyExists){
    //상품이 존재하면 delete
    await client.fav.delete({
      where:{
        id: alreadyExists.id,
      }
    })
  }else{
    // 상품이 없으면 create
    await client.fav.create({
      data:{
        user:{
          connect:{
            id: user?.id,
          },
        },
        product:{
          connect:{
            id: +id,
          },
        },
      },
    })
  }



  res.json({
    ok:true,
  })



}

export default withApiSession(withHandler({
  methods:["POST"],
  handler
})); 
// 여기에 핸들러는 유저만 호출할 수 있다.
//GET으로 받아야지 브라우저에서 확인할 수 있다.
//9.9 3분 36초부터 다시 시작