import {withIronSessionApiRoute, withIronSessionSsr} from "iron-session/next";

const cookieOptions = {
  cookieName:"carrotsession",
  password: process.env.COOKIE_PASSWORD!,
}

export function withApiSession(fn:any){
  return withIronSessionApiRoute(fn, cookieOptions);
}//export default를 하지 않는 이유는 funtion을 두개 만들어야 할거 같다
//한개는 API route에서 session을 받아오기 위한 function이 될 것이다.
//

export function withSsrSession(handler:any){
  return withIronSessionSsr(handler, cookieOptions);
}