// import CustomHead from '@/modules/CustomHead'
import CustomHead from '@/modules/CustomHead'
import { Html, Head,Main, NextScript } from 'next/document'



export default function Document() {


  return (
    <Html lang="en">
      <Head>
      {/* <meta http-equiv="X-UA-Compatible" content="IE=7" /> */}
      <CustomHead/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
