import type { NextPage } from "next";
import FloatingButton from '@component/floating-button';
import Item from '@component/item';
import Layout from '@component/layout';
import useUser from '@libs/client/useUser';
import Head from 'next/head';
import useSWR, { SWRConfig } from 'swr';
import { Product } from '@prisma/client';
import Image from 'next/image';
import sucullentImage from "../public/cacti-1845159_1920.jpg";
import client from '@libs/server/client';


export interface ProductWithCount extends Product{
  _count:{
    favs:number;
  };
}

interface ProductsResponse { 
  ok : boolean;
  products: ProductWithCount[];
}

const Home: NextPage = () => {
  const {user,isLoading} = useUser();//로그인 했는지 확인
  const {data} = useSWR<ProductsResponse>("/api/products");
  /*
  useSWR을 상뇽할 때
  데이터가 어떤 모습일지 알려줄 수 있다
  */

  return (
    <Layout title="홈" hasTabBar>
      <Head><title>Home</title></Head>
      <div className="flex flex-col space-y-5 divide-y">
        {data?.products?.map((product) => (
          <Item
            id={product.id}
            images={product.image}
            key={product.id}
            title={product.name}
            price={product.price}
            comments={0}
            hearts={product._count?.favs || 0}
          />
        ))}
        <FloatingButton href="/products/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

const Page:NextPage<{products:ProductWithCount[]}> = ({products}) => {
  return <SWRConfig value={{
    fallback:{
      "/api/products": {
        ok:true,
        products
      }
    }//SWR캐시 안에 /api/products/ 키를 초기값으로 설정한다.  == 개시 초기값 설정
  }}>
    <Home />{/*home 을 랜더링한다. */}
  </SWRConfig>
}

export async function getServerSideProps(){
  console.log("SSR");
  const products = await client.product.findMany({})
  return {
    props:{
      products:JSON.parse(JSON.stringify(products)),
    },
  };
}//그냥 props에 products를 작성했을때 에러가 뜨는 이유는 next.js 가 prisma가 제공하는 날짜 포맷을 이해하지 못하기 때문이다.

//SSR과 SWR을 같이 사용하려면 SWR을 그대로 사용하되 fallback을 제공할 것아다.

/*
SWR은 다른화면으로 갔다가 돌아오면 데이터를 더이상 불러오지 않는다 그 이유는 
SWR은 캐쉬에 저장하기 때문이다 
처음에는 useSWR가 실행됐을 땐 캐시가 비어있다.
처음 실행되고 나서 다른 페이지로 갔다가 다시 홈 페이지로 돌아오면
캐시 안에 이미 데이터가 있기 때문에 로딩 상태가 안보인다는 것이다.

하지만 useSWR에 캐시 데이터를 미리 제공할 수 있으면 어떻게 될까
useSWR이 클라이언트단에서 api 경로에 요청을 보내기도 전에
캐시 데이터를 미리 제공한다는 뜻이다
캐시가 비어있는 상태가 아니라 이키 데이터가 있는 상태로 시작한다는 거다.
*/
export default Page;