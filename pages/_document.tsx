import Document, { Head, Html, Main, NextScript } from 'next/document';



class CustomDocunment extends Document{
  render(): JSX.Element {
    return <Html lang='ko'>
      <Head>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript/>{/**여기 적은 컴포넌트 모두 앱이 제대로 작동하기 위해서 필수로 필요한 컴포넌트 들이다. */}
      </body>
    </Html>
  }
}
export default CustomDocunment;