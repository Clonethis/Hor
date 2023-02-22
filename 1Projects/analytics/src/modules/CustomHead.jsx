const { default: Head } = require("next/head");
import { useEffect } from 'react';
import TagManager from 'react-gtm-module'
 
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
useEffect(()=>{
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KN54WNZ')
},[])
// <!-- End Google Tag Manager -->
}