/*

documentation to ttq events:
https://ads.tiktok.com/help/article/standard-events-parameters?lang=en#

 */

<script>
(function() {
    var event = {{Event}}||{};
    var page = {{aac.page}} ||{},
        productId = {{aac.products.shortcuts}};

    var pageType = page.type || '',
        product = {
        content_id: productId,
        content_type: 'product',
        value: 1.00,
        currency: 'EUR'
    };
    if({{Debug Mode}}){
      console.group('TIKTOK');
    }
    var track = function(action,pageType, data) {
        window.ttq.track(action, pageType, data);
        if ({{Debug Mode}}) {
            
            console.log(' Pixel track:  - ', action);
            if (data) {
                console.log(' - ', data);
            }
            
        }

    console.log('TIKTOK Pixel page track',{{faculty.tiktok.id}});

 
  if (event === 'action.add.products') {
    console.log("TIKTOK event 1");
    track('AddToCart');
  }
  if(page.checkout){

    if ( page.checkout.stepName === 'vybrat-obor' && page.checkout.step === 2) {
      console.log("TIKTOK event 2");
      track('InitiateCheckout');
    }
  }
  if (pageType.indexOf('purchase') > -1 && {{aac.page.faculty}}==='FSI') {
    console.log("TIKTOK event 3");
    track('CompletePayment', product);
  }
  
  if({{Debug Mode}}){
    console.groupEnd('TIKTOK');
  }

})();
</script>

