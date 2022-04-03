import type { NextPage } from "next";
import Item from '@component/item';
import Layout from '@component/layout';
import ProductList from '@component/product-list';

const Loved: NextPage = () => {
  return (
    <Layout title="관심목록" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        <ProductList kind="favs"/>
      </div>
    </Layout>
  );
};

export default Loved;