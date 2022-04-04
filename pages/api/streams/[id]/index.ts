import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from '@libs/server/client';
import { UserList } from 'twilio/lib/rest/conversations/v1/user';


async function handler(req : NextApiRequest, res : NextApiResponse<ResponseType>) {
  const { query:{id}, session:{user} } = req;
  const streams = await client.stream.findUnique({
    where:{
      id:+id,
    },
    include:{
      user:{
        select:{
          name:true, 
          phone:true,
          avatar:true,
          email:true,
          id:true,
        }
      },
    },
  });

  const messages = await client.message.findMany({
    where:{
      streamId:+id,
    },
    include:{
      user:{
        select:{
          name:true,
          avatar:true,
        }
      }
    }
  })

  res.json({
    ok:true,
    streams,
    messages,
  });
}

export default withApiSession(withHandler({
  methods:["GET"],
  handler
})); 
// 여기에 핸들러는 유저만 호출할 수 있다.
//GET으로 받아야지 브라우저에서 확인할 수 있다.
//9.9 3분 36초부터 다시 시작