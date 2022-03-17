import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from '@libs/server/client';


declare module "iron-session" {
  interface IronSessionData{
    user? : {
      id: number
    }
  }
}

async function handler(req : NextApiRequest, res : NextApiResponse<ResponseType>) {

console.log(req.session.user);
const profile = await client.user.findUnique({
    where: {
        id: req.session.user?.id
    }
})
res.json({
  ok:true,
  profile,
});
}

export default withApiSession(withHandler("GET", handler));
//GET으로 받아야지 브라우저에서 확인할 수 있다.
//9.9 3분 36초부터 다시 시작