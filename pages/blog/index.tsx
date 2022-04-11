import Layout from '@component/layout';
import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import { NextPage } from 'next';
import Link from 'next/link';
import { deflate } from 'zlib';

interface Post{
  title:string;
  date:string;
  category:string;
  slug:string;
}

const Blog:NextPage<{posts:Post[]}> = ({posts}) =>{
  return <Layout title="Blog" seoTitle="Blog">
    <h1 className='font-semibold text-lg text-center my-5'>Latest Posts</h1>
    <ul>
      {posts?.map((post,index) => (

      <Link href={`/blog/${post.slug}`}>
        <a>
          <div key={index} className="mb-5">
            <span className='text-lg text-red-500'>{post.title}</span>
            <div><span>{post.date} / {post.category}</span></div>
          </div>
        </a>
      </Link>
      ))}
    </ul>
  </Layout>
}

export async function getStaticProps(){
  const blogPosts = readdirSync('./posts').map(file => {
    const content = readFileSync(`./posts/${file}`,"utf-8");
    const [slug,_] = file.split(".");//첫번째는 slug를 가져오고 다른건 무시하도록 할거다.
    return {...matter(content).data , slug:slug};
  });

  return {
    props:{
      posts:blogPosts
    }
  }
}//한번만 실행된다. 데이터가 바뀔때마다 바뀌지 않는다.

export default Blog;
/**
  getStaticProp을 이용해 안에 넣어줄 내용을 
  폴더안에 있는 파일을 살펴서 그 파일 안에 있는 모든것들을 빌드할 거다.
  title을 추출하고 , 리스트를 빌드할거다.
  */