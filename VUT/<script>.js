<script>
(function() {
  var event = {{Event}};
  var track = function(pageType, data) {

    if(pageType && !data){
      window.ttq('InitiateCheckout')
    }
    //window.fbq('track', pageType, data);
    
  }
  
  if ({{Debug Mode}}) {
      console.log('TIKTOK Pixel initiateCheckout');
      console.log(' - ', pageType);
//      console.log('Page url variable: ',{{aac.page.cleanUrl}});
  //    console.log('Page FACULTY variable: ',{{aac.page.faculty}});
      console.log('Page URL variable: ',{{Page URL}});
      if (data) {
        console.log(' - ', data);
      }
    }
  if (event === 'action.add.products') {
    track('AddToCart');
  }
//*
/* Tiktok initialCheckout
/*/
var event = {{Event}};
  var track = function(action,data) {
    ttq.track(action);
    if ({{Debug Mode}}) {
      console.log('TIKTOK Pixel initiateCheckout');
      console.log('Page URL variable: ',{{Page Path}});
      if (data) {
        console.log(' - ', data);
      }
    }
    
  }
  


  var page = {{aac.page}};
  if({{Debug Mode}}){
    console.log("TIKTOK checkout",page);
  }
  
  if ( page.stepName === 'vybrat-obor' && page.step === 2) {
    track('InitiateCheckout');
  }
/*/
/*purchase
/*
/*/
var track = function(action,pageType, data) {
    ttq.track(action, pageType, data);
    if ({{Debug Mode}}) {
      console.log('TIKTOK Pixel', {{faculty.facebook.id}});
      {/* console.log(' - ', pageType); */}
      if (data) {
        console.log(' - ', data);
      }
    }
  }

  // track page specific data
  var page = {{aac.page}},
      productId = {{aac.products.shortcuts}};

  var pageType = page.type || '',
      product = {
      content_id: productId,
      content_type: 'product',
      value: 1.00,
      currency: 'EUR'
    };

 
    if({{Debug Mode}}){
        console.log('TIKTOK completePayment run but didn\'t purchased; pageType: ',pageType);
    }
  if (pageType.indexOf('purchase') > -1 && {{}}) {
    track('CompletePayment', product);
  }
  


})();
</script>

