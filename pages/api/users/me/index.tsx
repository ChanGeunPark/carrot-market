import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from '@libs/server/client';



async function handler(req : NextApiRequest, res : NextApiResponse<ResponseType>) {

  console.log(req.body);

if(req.method === "POST"){
  const {session:{user}, body:{email, phone, name, avartarId}} = req;

  const currentUser = await client.user.findUnique ({
    where:{
      id: user?.id,
    }
  })

  if(name){
    await client.user.update({
      where:{
        id:user?.id,
      },
      data:{
        name,
      }
    })
  }

  if(email && email !== currentUser?.email){
    const alreadyExists = Boolean(await client.user.findUnique({
      where:{
        email,
      },
      select:{
        id:true,
      }
    }));
    if(alreadyExists){
      return res.json({
        ok:false,
        error:"Email already taken.",
      });
    }
    await client.user.update({
      where:{
        id: user?.id,
      },
      data:{
        email,
      },
    });
    res.json({ok:true});
  }

  if(phone && phone !== currentUser?.phone){
    const alreadyExists = Boolean(await client.user.findUnique({
      where:{
        phone,
      },
      select:{
        id:true,
      }
    }));
    if(alreadyExists){
      return res.json({
        ok:false,
        error:"Phone already taken",
      })
    }

    await client.user.update({
      where:{
        id:user?.id,
      },
      data:{
        phone
      }
    });
    res.json({ok:true});

  }
  if(avartarId){
    await client.user.update({
      where:{
        id:user?.id,
      },
      data:{
        avatar:avartarId,
      }
    })
  }
  res.json({ok:true})

}

if(req.method === "GET"){
  const profile = await client.user.findUnique({
      where: { id: req.session.user?.id }
  })
  res.json({
    ok:true,
    profile,
  });
  }
}

export default withApiSession(withHandler({
  methods:["GET","POST"],
  handler
})); 
// 여기에 핸들러는 유저만 호출할 수 있다.
//GET으로 받아야지 브라우저에서 확인할 수 있다.
//9.9 3분 36초부터 다시 시작