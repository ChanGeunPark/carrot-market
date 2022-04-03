import type { NextPage } from "next";
import Item from '@component/item';
import Layout from '@component/layout';
import ProductList from '@component/product-list';

const Bought: NextPage = () => {
  return (
    <Layout title="구매내역" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
      <ProductList kind="purchases"/>
      </div>
    </Layout>
  );
};

export default Bought;