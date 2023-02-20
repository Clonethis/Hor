<script>
(function() {
  var event = {{Event}};
  var track = function(action) {
    console.log("TIKTOK initiateCHeckout inside track function ");
    ttq.track(action);
    if ({{Debug Mode}}) {
      console.log('TIKTOK Pixel initiateCheckout');
      console.log(' - ', pageType);
      console.log('Page URL variable: ',{{Page Path}});
      if (data) {
        console.log(' - ', data);
      }
    }
    
  }
  
  var facultyUrl = {{Page Path}}.split('/');
  var faculty = facultyUrl[facultyUrl.length-1];
  console.log("TIKTOK InitiateCheckout isInitialState:",facultyUrl ,typeof {{Page Path}},"Page path before faculty:", faculty);
  if (Number(faculty) === 4) {
    track('InitiateCheckout');
  }
  
})();
</script>