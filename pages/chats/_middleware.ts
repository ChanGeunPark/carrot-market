import type { NextRequest, NextFetchEvent } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  //console.log("chat only middleware~")
}
//_middleware.ts 파일을 만들어주면 해당 폴더안에서의 미들웨어가 작동한다.
