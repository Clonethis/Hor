const { default: Head } = require("next/head");
import { useEffect } from 'react';
import TagManager from 'react-gtm-module'
 
export default function CustomHead() {
    const tagManagerArgs = {
        gtmId: 'GTM-KN54WNZ'
    }
    useEffect(()=>{
    TagManager.initialize(tagManagerArgs);
    console.log("GTM initialized");
},[]);

}