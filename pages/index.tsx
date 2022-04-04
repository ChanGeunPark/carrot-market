import type { NextPage } from "next";
import FloatingButton from '@component/floating-button';
import Item from '@component/item';
import Layout from '@component/layout';
import useUser from '@libs/client/useUser';
import Head from 'next/head';
import useSWR from 'swr';
import { Product } from '@prisma/client';

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
            key={product.id}
            title={product.name}
            price={product.price}
            comments={0}
            hearts={product._count.favs}
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

export default Home;