import { PrismaClient } from '@prisma/client';

declare global{
  var client: PrismaClient | undefined;
}

const client = global.client || new PrismaClient();
if(process.env.NODE_ENV === "development") global.client = client;

/*
이 파일을 처음 실행하면 global.client에 아무것도 들어있지 않을것이다.
그러면 새 PrismaClient를 만드는 것이다.
그렇게 처음 파일이 실행될 때
우리가 만든 client를 global.client에 저장할 것이다.
그 다음부터는 이 파일이 생행이 될때 
global.client가 이미 만들어져 있겠지 그래서 global.client에 들어갈거다.
*/

export default client;


