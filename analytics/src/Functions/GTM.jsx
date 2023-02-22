
export default function GTM() {
    const GA_TRACKING_ID = 'GTM-KN54WNZ';
    return(

    <>
        <script
    async
    src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
  />
  <script
    dangerouslySetInnerHTML={{
      __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_TRACKING_ID}', {
      page_path: window.location.pathname,
    });
  `,
    }}
  />
    </>
)
}