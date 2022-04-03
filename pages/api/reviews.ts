import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from '@libs/server/client';



async function handler(req : NextApiRequest, res : NextApiResponse<ResponseType>) {

const {session:{user}} = req;

const reviews = await client.review.findMany({
  where:{
    createdForId: user?.id,
  },
  include:{createdBy:{select:{id:true, name:true, avatar:true}}}
})



res.json({
  ok:true,
  reviews,
});
}

export default withApiSession(withHandler({
  methods:["GET"],
  handler
})); 
// 여기에 핸들러는 유저만 호출할 수 있다.
//GET으로 받아야지 브라우저에서 확인할 수 있다.
//9.9 3분 36초부터 다시 시작