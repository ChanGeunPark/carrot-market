import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from '@libs/server/client';



async function handler(req : NextApiRequest, res : NextApiResponse<ResponseType>) {

  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v2/direct_upload`,
      {
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CF_TOKEN}`,
        }
      }
    )
  ).json();

  console.log(response);



  res.json({
    ok:true,
    ...response.result,
  });

}

export default withApiSession(withHandler({
  methods:["GET"],
  handler
})); 
// 여기에 핸들러는 유저만 호출할 수 있다.
//GET으로 받아야지 브라우저에서 확인할 수 있다.
//9.9 3분 36초부터 다시 시작