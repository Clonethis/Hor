import '@/styles/globals.css'
// import { useEffect } from 'react'
// import { tagManagerArgs } from '@/components/tracking/gtag'
// import TagManager from 'react-gtm-module'



export default function App({ Component, pageProps }) {
  // useEffect(()=>{
  //   console.log(tagManagerArgs);
  //   TagManager.initialize(tagManagerArgs);
  // },[])
  return <Component {...pageProps} />
}
