<script>
  (function aac_bing_page(w,d,t,r,u) {
  try {
    var f,n,i;
    w[u]=w[u]||[],f=function(){
    var o={ti:"199002299"};
    o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")
    },n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function()
    {var s=this.readyState;
    s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)
    },i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)
  
    var pageType = {{aac.page.type}};
    var currency = {{aac.page.currencyCode}};
    var page = {{aac.page}};
    var order = {{aac.model.order}};
    var cart = {{aac.cart}};

    console.log("pageType:",pageType);
  console.log("pageType",pageType,"Currency",currency,"Page:",page,"Oreder:",order,"Cart:",cart);
    switch(pageType){
      case 'home':      
      case 'homepage':
        window.uetq.push('event', '', {
          'ecomm_pagetype': 'home'
        }
        );
        break;
      case 'detail':
        window.uetq.push('event', '', {
          //change to custom product id
          'ecomm_prodid' : page.context.products[0],
          'ecomm_pagetype': 'product',
          'ecomm_product': page.context.products
        }
        );
        break;
        case 'category':
            window.uetq.push('event', '', {
            'ecomm_category': page.category.id, 
            'ecomm_prodid': page.context.products,
            'ecomm_pagetype': 'category'
            }
            );
            break;
        case 'checkout':
            if(cart.products != []){
            window.uetq.push('event', '', { 
            'ecomm_pagetype': 'cart',
            'ecomm_totalvalue': order.totalValue,
            'revenue_value': order.revenue,
            'currency': currency,
            'items': cart.products,
            }
            );}
            break;
   

      }
      
      
      {{aac.gtm}}.onHtmlSuccess({{HTML ID}});
    } catch (err) {
      ({{aac.func.trackError}})('tracking/js/aac.bing.page', err);
      {{aac.gtm}}.onHtmlFailure({{HTML ID}});
    }
  })(window,document,"script","//bat.bing.com/bat.js","uetq");
  </script>