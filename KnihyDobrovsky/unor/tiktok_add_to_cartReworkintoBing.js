<script>
  (function() {
    try {

      var product = {{aac.products.firstItem}};
      var order = {{aac.order}};
      var currency = {{aac.page.currencyCode}};
      var pageType = {{aac.page.type}}||' ';
      var products = {{aac.products}} || [];
      var productsIds = {{aac.products.ids}}||[];

      if ({{Debug Mode}}) {
        console.log("BING TRACKING: track AddToCart", product);
      }

      var getProducts = function () {
				var pds = [];
				for (var i = 0; i < products.length; i++) {
					var currentProduct = products[i];
					pds.push({
						'id': productsIds[i], 
						'quantity': currentProduct.quantity,
						'price': currentProduct.fullPrice,
					});
				}
				return pds;
			};
      var bingPush = function(type){
        type = type || 'other';
        console.log("BING other",type);
        window.uetq.push('event','add_to_cart', {
          'ecomm_prodid' : productsIds[0], 
          {/* 'ecomm_pagetype': type, */}
          'ecomm_totalvalue': order.totalValue,
          'revenue_value': order.revenue,
          'currency':currency,
          'items': getProducts(),
        });
      };

      var bingPageTypes = ["home","searchresults","category","product","cart","purchase","other"];
      
      for (var type in bingPageTypes){

        if(pageType===bingPageTypes[type]){
          console.log("BING pushed",bingPageTypes[type]);
          bingPush(bingPageTypes[type]);    
          return;
        }
      }
      bingPush();
      

      

      {{aac.gtm}}.onHtmlSuccess({{HTML ID}});
    } catch (err) {
      ({{aac.func.trackError}})('tracking/js/aac.bing.add_to_cart', err);
      {{aac.gtm}}.onHtmlFailure({{HTML ID}});
    }
  })();
</script>