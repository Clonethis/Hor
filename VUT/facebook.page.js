<script>
(function(){
  var track = function(pageType, data) {
    window.fbq('track', pageType, data);
    if ({{Debug Mode}}) {
      console.log('Facebook Pixel', {{faculty.facebook.id}});
      console.log(' - ', pageType);
      if (data) {
        console.log(' - ', data);
      }
    }
  }

  
  // track pageview
  window.fbq('init', {{faculty.facebook.id}});
  track('PageView');
  
  
  // track page specific data
  var page = {{aac.page}},
      productIds = {{aac.products.shortcuts}};
  var pageType = page.type || '',
      products = {
        content_ids: productIds,
        content_type: 'product',
        value: 1.00,
        currency: 'USD'
      };

  if (pageType.indexOf('detail') > -1 && productIds.length > 0) {
    track('ViewContent', products);
    
  } else if (pageType === 'checkout' && page.checkout && page.checkout.step === 2) {
    track('InitiateCheckout');
  
  } else if (pageType === 'checkout' && page.checkout && page.checkout.step > 2) {
    track('Krok'+(page.checkout.step-2), products);

  } else if (pageType.indexOf('purchase') > -1) {
    track('Purchase', products);
  }
  
  if ({{aac.user.isVut}}) {
    track('inhouse');
  }

})();
</script>