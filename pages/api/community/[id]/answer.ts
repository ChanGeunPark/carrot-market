import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from '@libs/server/client';


async function handler(req : NextApiRequest, res : NextApiResponse<ResponseType>) {
  const {query:{id} ,body: { anwer }, session: {user}}= req;

  const answers = await client.answer.create({
    data:{
      anwer,
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

  res.json({
    answers,
    ok:true,
  });
}

export default withApiSession(withHandler({
  methods:["POST"],
  handler
})); 
// 여기에 핸들러는 유저만 호출할 수 있다.
//GET으로 받아야지 브라우저에서 확인할 수 있다.