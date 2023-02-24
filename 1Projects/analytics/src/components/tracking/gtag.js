
export var tagManagerArgs = {
    gtmId:'GTM-KN54WNZ',
    dataLayer:{
        userId:'001',
        userProject:'trial'
    }
  }
  

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) =>
{
    console.log("GTag pageview");
    gtag('config', GA_TRACKING_ID, {
        page_path: url,
    })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) =>
{
    gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    })
}