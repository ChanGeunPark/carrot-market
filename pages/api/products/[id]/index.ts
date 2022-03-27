import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from '@libs/server/client';
import { UserList } from 'twilio/lib/rest/conversations/v1/user';


async function handler(req : NextApiRequest, res : NextApiResponse<ResponseType>) {
  const { query:{id}, session:{user} } = req;
  const product = await client.product.findUnique({
      where:{
        id:+id,
      },
      include:{
        user:{
          select:{
            id:true,
            name:true,
            avatar:true,
          }
        },
      }
  });

  const terms = product?.name.split(" ").map(word => ({
    name:{
      contains:word,
    }
  }));// product의 name을 ' ' 단위로 나눴다. 검색할때 단어로 찾을 수 있도록 하기위해서 나눠줬다.


  const relatedProducts = await client.product.findMany({
    where:{
      OR:terms,
      AND:{
        id:{
          not:+id,
        }
      }
    }
  });

  const isLiked = Boolean(
    await client.fav.findFirst({
      where:{
        productId:product?.id,
        userId: user?.id,
      },
      select:{
        id:true,
      }
    })
  );

  res.json({
    ok:true,
    product,
    relatedProducts,
    isLiked,
  });
}

export default withApiSession(withHandler({
  methods:["GET"],
  handler
})); 
// 여기에 핸들러는 유저만 호출할 수 있다.
//GET으로 받아야지 브라우저에서 확인할 수 있다.
//9.9 3분 36초부터 다시 시작