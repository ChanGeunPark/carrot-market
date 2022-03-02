import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import withHandler from "@libs/server/withHandler"
import { prisma } from '@prisma/client';

async function handler(req:NextApiRequest, res:NextApiResponse){
//클라이언트 핸드러러엔 두개의 prop을 갖는데 한개는 데이터를 보내느것 한개는 데이터를 받는것이다.
//NextApiRequest를 ctrl 클릭했을때 옵션을 보여준다.

const {phone, email} = req.body;
const payload = phone? {phone: +phone} : {email};
/*

const user = await client.user.upsert({
  where:{
    ...payload,
  },//여기서 정보를 가지고있지 않으면  -->
  create:{
    name:"Anonymous",
    ...payload,
  },
  update:{},
});

아래 코드에서 token을 만들면서 같이 생성
*/

const token = await client.token.create({
  data:{
    payload:'12345',//payload는 유니크여서 중복되면 에러가 뜸
    user:{
      connectOrCreate:{
        where:{
          ...payload,
        },//여기서 정보를 가지고있지 않으면  -->
        create:{
          name:"Anonymous",
          ...payload,
        },
      }
    }
  }
})
//우선 user를 upsert하고 token을 생성한 다음에 upsert 했던 user와 연결해줄거다
//connect는 새로운 토큰을 이미 존재하는 유저와 연결해준다.
//create는 새로운 token을 만들면서 새로운 user도 만든다.
/*
connectOrCreate를 사용해서 유저를 찾도록 만들 수 있다. 
만약 찾는다면 토큰과 connect를 시켜줄거고 찾지 못한다면 생성해줄것이다.

*/



console.log(token);
//객체안에서 if else를 사용할수 있는 es6문법     ...(phone && {phone: +phone})   phone가 있으면 return{}

/*
//---------------------------방법 1------------------------------
//upsert는 뭔가 만들 때 사용하지 않음. 생성하거나 수정할때 사요함
if(phone){
  user = await client.user.upsert({
    where:{
      phone:+phone,
    },//여기서 정보를 가지고있지 않으면  -->
    create:{
      name:"Anonymous",
      phone:+phone,
    },
    update:{},
  });
}

if(email){
  user = await client.user.upsert({
    where:{
      email,
    },//여기서 정보를 가지고있지 않으면  -->
    create:{
      name:"Anonymous",
      email,
    },
    update:{},
  });
}
//---------------------------------------------------------
*/

//---------------------------방법 2------------------------------
/*
if(email){
  user = await client.user.findUnique({
    where:{//찾다
      email,
    }
  })
}
if(user){
  console.log("fount it");
}
if(!user){
  console.log("유저를 확인하지 못했습니다. 유저를 만들겠습니다");
  user = await client.user.create({
    data:{
      name:"Anonymous",
      email,
    },
  });
  console.log(user);
}

if(phone){
  user = await client.user.findUnique({
    where:{//찾다
      phone: +phone
    }
  })
}//phone가 숫자로 들어가서 작동이 안됨 문자열로 바꿔줘야함 ->  +phone
if(user){
  console.log("fount it");
}
if(!user){
  console.log("유저를 확인하지 못했습니다. 유저를 만들겠습니다");
  user = await client.user.create({
    data:{
      name:"Anonymous",
      phone: +phone
    },
  });
  console.log(user);
}

//--------------------------------------------------------
*/



  // if(req.method !== "POST"){
  //   res.status(401).end();
  // }

  res.status(200).end();
  //req.body를 console.log 하고 있고 status 200 을 보내고 있다.
}

/*
인증
----> phone # ----> User?
----> Token---User #123123123(랜덤번호)
----> #123123123 ---> sms ---> phone # (Twilio)
----> #123123123 ----> Token? ----> user ----> Log the user In


*/
export default withHandler("POST", handler);//nextjs는 export default를 안해주면 req, res를 받아오지 않는다.

//9.3 token logic