<script>
(function(){
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