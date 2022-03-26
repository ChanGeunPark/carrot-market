import type { NextPage } from "next";
import Button from '@component/button';
import Layout from '@component/layout';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Product, User } from '@prisma/client';
import Link from 'next/link';

interface ProductWithUwer extends Product{
  user:User;
}

interface ItemDetailResponse{
  ok:boolean;
  product:ProductWithUwer;
  relatedProducts:Product[];
}

const ItemDetail: NextPage = () => {

  const router = useRouter();
  const {data} = useSWR<ItemDetailResponse>(router.query.id ? `/api/products/${router.query.id}` : null);
  //router.query.id 가 있으면 api를 보내겠다.



  return (
    <Layout canGoBack>
      <div className="px-4  py-4">
        <div className="mb-8">
          <div className="h-96 bg-slate-300" />
          <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-medium text-gray-700">{data?.product?.user?.name}</p>
              <Link href={`/users/profiles/${data?.product?.user?.id}`}>
                <a className="text-xs font-medium text-gray-500">
                  View profile &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">{data?.product?.name}</h1>
            <span className="text-2xl block mt-3 text-gray-900">${data?.product?.price}</span>
            <p className=" my-6 text-gray-700">
              {data?.product?.description}
            </p>
            <div className="flex items-center justify-between space-x-2">
              <Button large text="Talk to seller" />
              <button className="p-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                <svg
                  className="h-6 w-6 "
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
          <div className=" mt-6 grid grid-cols-2 gap-4">
            {data?.relatedProducts.map((products) => (
              <Link href={`/products/${products.id}`} key={products.id}>
                <a>
                  <div className="h-56 w-full mb-4 bg-slate-300" />
                  <h3 className="text-gray-700 -mb-1">{products.name}</h3>
                  <span className="text-sm font-medium text-gray-900">${products.price}</span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;