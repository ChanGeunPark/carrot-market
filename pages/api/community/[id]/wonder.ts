import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from '@libs/server/client';


async function handler(req : NextApiRequest, res : NextApiResponse<ResponseType>) {
  const {query:{id} , session: {user}}= req;


  const alreadyExists = await client.wondering.findFirst({
    where:{
      userId: user?.id,
      postId:+id,
    },
    select:{
      id:true,
    }
  });

  if(alreadyExists){//존재하면 지우고 아닐땐 넣어라
    await client.wondering.delete({
      where:{
        id:alreadyExists.id,
      }
    });
  }else{
    await client.wondering.create({
      data:{
        user: {
          connect:{
            id:user?.id,
          },
        },
        post:{
          connect:{
            id:+id,
          },
        },
      }
    })
  }


  res.json({
    ok:true,
  });
}

export default withApiSession(withHandler({
  methods:["POST"],
  handler
})); 
// 여기에 핸들러는 유저만 호출할 수 있다.
//GET으로 받아야지 브라우저에서 확인할 수 있다.