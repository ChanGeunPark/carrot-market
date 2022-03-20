import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req : NextApiRequest, res : NextApiResponse<ResponseType>) {
//클라이언트 핸드러러엔 두개의 prop을 갖는데 한개는 데이터를 보내느것 한개는 데이터를 받는것이다.
//NextApiRequest를 ctrl 클릭했을때 옵션을 보여준다.

const { token } = req.body;
const foundToken = await client.token.findUnique({where:{
    payload:token,
  },
  //include:{user:true},
})
//여기서 받은 token을 payload로 가지는 Token을 찾는거다.
//inclued를 사용하려면 우리가 정의한 관계가 필요하다. prisma schima 에 token에 user랑 관계를 한것이 필요함
if (!exists) return res.status(404).end();
console.log(exists);
//이 토근을 가진 유저를 찾을거다. 만약 찾는다면 유저 정보를 req.session.user에 담을것이다.
req.session.user = {
  id: exists.userId
}//타임스크립트는 여기서끝난다는걸 모르기때문에 상단res 옆 return을 해줘야한다.
await req.session.save();
res.status(200).end();
}//유저가 어떤 내용을 가지는지 정의해줘야함

export default withApiSession(withHandler("POST", handler));
//ironsession은 설정을 해줘야한다. 우선 cookieName을 설정해줘야한다, 두번째는 password를 설정해주는건데 이건 쿠키를 암호화하는데 쓰일거다

//만약 누군가 이 password를 안다면 쿠키를 복호화해 가짜 쿠키를 보낼 수도 있다.


//nextjs는 export default를 안해주면 req, res를 받아오지 않는다.

//9.3 token logic