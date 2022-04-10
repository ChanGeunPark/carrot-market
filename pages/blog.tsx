import Layout from '@component/layout';

export default function Blog(){
  return <Layout title="Blog" seoTitle="Blog">
    <h1 className='font-semibold text-lg'>Latest Posts</h1>
  </Layout>
}

/**
  getStaticProp을 이용해 안에 넣어줄 내용을 
  폴더안에 있는 파일을 살펴서 그 파일 안에 있는 모든것들을 빌드할 거다.
  title을 추출하고 , 리스트를 빌드할거다.
  */