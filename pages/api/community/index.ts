import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from '@libs/server/client';
import { UserList } from 'twilio/lib/rest/conversations/v1/user';


async function handler(req : NextApiRequest, res : NextApiResponse<ResponseType>) {
  const {body: { question }, session: {user}}= req;

  const community = await client.post.create({
    data:{
      question,
      user: {
        connect:{
          id:user?.id
        }
      }
    }
  })


  res.json({
    community,
    ok:true,
  });
}

export default withApiSession(withHandler({
  methods:["POST"],
  handler
})); 
// 여기에 핸들러는 유저만 호출할 수 있다.
//GET으로 받아야지 브라우저에서 확인할 수 있다.