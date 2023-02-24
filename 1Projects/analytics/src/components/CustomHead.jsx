const { default: Head } = require("next/head");
import Script from "next/script";
import Document from '@/pages/_document';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module'
import * as gtag from "./tracking/gtag";
 
export default function CustomHead() {
    // implementing gtm: https://www.npmjs.com/package/react-gtm-module
//     const tagManagerArgs = {
//         gtmId: 'GTM-KN54WNZ'
//     }
//     useEffect(()=>{
//     TagManager.initialize(tagManagerArgs);
//     console.log("GTM initialized");
// },[]);
// <!-- Google Tag Manager -->

//     useEffect(()=>{
//     (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
// new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
// j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
// 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
// })(window,document,'script','dataLayer','GTM-KN54WNZ')

// },[])
// <!-- End Google Tag Manager -->

        
return(
<>
    <Script
        strategy="afterInteractive"
        
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
    />
    <Script
        
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
            });
          `,
        }}

    />
</>
);
}