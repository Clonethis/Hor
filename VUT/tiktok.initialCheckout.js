<script>
(function() {
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
  
})();
</script>