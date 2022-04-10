import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from "swr";
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{fetcher: (url:string) => fetch(url).then(response => response.json())}}>
      {/*global configration*/}
      <div className='w-full max-w-lg mx-auto'>
        <Component {...pageProps} />
      </div>
      <Script src="" strategy='lazyOnload' onLoad={()=>{
        //옵션을 작성해주면 된다.
      }}/>
      {/*next.js에서 script를 넥트스script로 사용하는게 좋다.
        strategy 는 3옵션이 있다.
        beforeInteractive, afterInteractive, lazyOnload

        유저가 페이지하고 상호작용하기 전에 꼭 스크립트를 불러와야 한다면 beforeInteractive
        페이지를 먼저 다 불러온 다음 스크립트를 불러오고 싶다면 afterInteractive
        다른 모든 데이터나 소스들을 불러오고 나서야 스크립트를 불러오는 전략 lazyOnload

      */}

    </SWRConfig>
  )
}

export default MyApp
