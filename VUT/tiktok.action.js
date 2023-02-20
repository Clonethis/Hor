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

})();
</script>