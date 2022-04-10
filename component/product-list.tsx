import { Sale } from '@prisma/client';
import { ProductWithCount } from 'pages';
import useSWR from 'swr';
import Item from './item';

interface ProductListProps{
  kind: "favs" | "sales" | "purchases";
}

interface Record {
  id:number;
  product: ProductWithCount;
}

interface SalesResponse{
  [key:string]:Record[];
}


export default function ProductList({kind}:ProductListProps){
  const {data} = useSWR<SalesResponse>(`/api/users/me/${kind}`);
  console.log(data);
  
  return data ? 
  <>
    {
      data[kind]?.map((sales) => (
        <Item
          images={sales?.product.image}
          id={sales?.product.id}
          key={sales?.id}
          title={sales.product.name}
          price={sales.product.price}
          comments={1}
          hearts={sales.product._count.favs}
        />
    ))}
  </> : null;
  //배열을 return 하면 타입스크립트가 에러가 난다  한 element만 return 해줘야 한다.
}