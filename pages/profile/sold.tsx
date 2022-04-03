import type { NextPage } from "next";
import Item from '@component/item';
import Layout from '@component/layout';
import useSWR from 'swr';
import ProductList from '@component/product-list';


const Sold: NextPage = () => {

  return (
    <Layout title="판매내역" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        <ProductList kind="sales"/>
      </div>
    </Layout>
  );
};

export default Sold;