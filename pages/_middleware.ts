import type { NextRequest, NextFetchEvent } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req:NextRequest, ev:NextFetchEvent){
  //console.log(req.ua);//어떤 브라우저를 사용하고있는지, 버전, cpu
  if(req.ua?.isBot){
    return new Response("봇을 사용하지 맙시다. 사람이어야 해요", {status:403});
  }

  if(!req.url.includes("/api")){
  /*
    enter에서 유거가 폼을 제출하게 되면
    /api/users/enter/에 요청을 보내게 되고
    이 요청도 /enter로 redirect 한다는 것이다.
    왜냐하면 유저가 로그인을 시도할 때
    유저는 아직 쿠키가 없을것이다.
    그래서 /api가 포함하지 않았을때 실생되도록 해준다.
  */

    if(!req.url.includes("/enter") && !req.cookies.carrotsession){//redirect가 많이 반복되면서 에러가 뜸. /enter를 지정해줘야한다.
      return NextResponse.redirect("/enter");
    };
  }
  //console.log(req.url); //url을 보여준다.
  //console.log(req.geo);//유저의 위치 정보를 알아낼 수 있다. 하지만 로컬호스트라서 제대로 작동하지 않을것이다.

  //return NextResponse.json({ok:true});//항상 response할때는 return 을 작성해줘야한다.
  
}