import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Button from "@component/button";
import Layout from "@component/layout";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import { Product, User } from "@prisma/client";
import Link from "next/link";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/utils";
import useUser from "@libs/client/useUser";
import Image from "next/image";
import client from "@libs/server/client";

interface ProductWithUwer extends Product {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUwer;
  relatedProducts: Product[];
  isLiked: boolean;
}

const ItemDetail: NextPage<ItemDetailResponse> = ({
  product,
  relatedProducts,
  isLiked,
}) => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );
  //router.query.id 가 있으면 api를 보내겠다.
  const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`);
  const onFavClick = () => {
    if (!data) return;
    boundMutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    toggleFav({}); //body가 비어있는 post 요정이 될것이다. 데이터는 api에서 설정을 해줘서 따로 보낼 필요가 없다.
    //mutate 첫번째 인자는 뭐든지 넣을수 있고 뭘 넣든간에 그게 새로운 데이터가 되는거다.
    /*
      mutate함수는 2개의 인자를 받는데 하하는
      캐시에 있는 데이터 대신 사용할 새로운 데이터고,
      다른하나는 ture 또는 false이다

      true는 api를 한번더 검증하게 만든다.
    ...data.는 이전 캐시의 데이터를 가져오게한다.
    */
    //mutate("/api/users/me",(prev:any)=>({ok:!prev.ok}) ,false)
    //mutate를 다른곳에서도 마음껏 바꿀수 있다.
  };

  //remote 이미지를 불러오려면(다른서버) naxt.js에 Image는 어디 서버에서 가져오는지 물어볼거다
  // next.config 에서 설정을 해줘야한다.

  return (
    <Layout canGoBack>
      <div className="px-4  py-4">
        <div className="mb-8">
          <div className="relative w-full pb-80">
            <Image
              layout="fill"
              src={`https://imagedelivery.net/anvL-_ABM0Z5KQo2YmJX4g/${product.image}/public`}
              className="h-96 bg-slate-300 object-cover"
            />
          </div>
          <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
            {user?.avatar ? (
              <Image
                width={48}
                height={48}
                src={`https://imagedelivery.net/anvL-_ABM0Z5KQo2YmJX4g/${user?.avatar}/avatar`}
                className="w-12 h-12 rounded-full bg-slate-300"
                alt="avatar"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-slate-300" />
            )}
            <div>
              <p className="text-sm font-medium text-gray-700">
                {product?.user?.name}
              </p>
              <Link href={`/users/profiles/${product?.user?.id}`}>
                <a className="text-xs font-medium text-gray-500">
                  View profile &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {product?.name}
            </h1>
            <span className="text-2xl block mt-3 text-gray-900">
              ${product?.price}
            </span>
            <p className=" my-6 text-gray-700">{product?.description}</p>
            <div className="flex items-center justify-between space-x-2">
              <Button large text="Talk to seller" />
              <button
                onClick={onFavClick}
                className={cls(
                  "transition-all p-3 rounded-md flex items-center justify-center",
                  isLiked
                    ? "text-red-400 border-2 border-red-400 hover:bg-red-500 hover:text-white"
                    : "text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                )}
              >
                {isLiked ? (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
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
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
          <div className=" mt-6 grid grid-cols-2 gap-4">
            {relatedProducts.map((products) => (
              <Link href={`/products/${products.id}`} key={products.id}>
                <a>
                  <div className="h-56 w-full mb-4 bg-slate-300" />
                  <h3 className="text-gray-700 -mb-1">{products.name}</h3>
                  <span className="text-sm font-medium text-gray-900">
                    ${products.price}
                  </span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  if (!ctx?.params?.id) {
    return {
      props: {},
    };
  }

  const product = await client.product.findUnique({
    where: {
      id: +ctx?.params.id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  const terms = product?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  })); // product의 name을 ' ' 단위로 나눴다. 검색할때 단어로 찾을 수 있도록 하기위해서 나눠줬다.

  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: +ctx?.params.id,
        },
      },
    },
  });

  const isLiked = false;

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      relatedProducts: JSON.parse(JSON.stringify(relatedProducts)),
      isLiked,
    },
  };
};

export default ItemDetail;
