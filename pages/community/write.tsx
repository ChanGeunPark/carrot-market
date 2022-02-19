import type { NextPage } from "next";
import Button from '../../component/button';
import Layout from '../../component/layout';
import TextArea from '../../component/textarea';

const Write: NextPage = () => {
  return (
    <form className="px-4 py-10">
      <TextArea required placeholder="Ask a question!"/>
      <Button text='Submit'/>
    </form>
  );
};

export default Write;