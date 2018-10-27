//tealium universal tag - utag.18 ut4.0.201710030417, Copyright 2017 Tealium.com Inc. All Rights Reserved.
var _smtr=_smtr||[];try{(function(id,loader,u){try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};u.ev={'view':1,'link':1};u.qsp_delim="&";u.kvp_delim="=";u.loaded=false;u.hostname="d1n00d49gkbray.cloudfront.net";u.acct="macys";u.pagetype="none";u.base_url="//"+u.hostname+"/"+u.acct+"/"+u.acct+".js";u.product_vars={"productId":1,"masterId":1,"sku":1,"brand":1,"qty":1,"price":1};u.map={};u.extend=[];u.send=function(a,b,c,d,e,f){if(u.ev[a]||typeof u.ev.all!="undefined"){c={};c.pageType=u.pagetype;for(d in utag.loader.GV(u.map)){if(typeof b[d]!=="undefined"&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){if(e[f].toLowerCase()=="pagetype"){e[f]="pageType"};if(e[f]=="sp"){e[f]="searchPhrase"};if(u.product_vars[e[f]]){u[e[f]]=b[d];}else{c[e[f]]=b[d];}}}}
var _cprod=b._cprod?b._cprod.slice(0):[];var _cprodname=b._cprodname?b._cprodname.slice(0):[];var _csku=b._csku?b._csku.slice(0):[];var _cbrand=b._cbrand?b._cbrand.slice(0):[];var _cquan=b._cquan?b._cquan.slice(0):[];var _cprice=b._cprice?b._cprice.slice(0):[];var _ccat2=b._ccat2?b._ccat2.slice(0):[];var _ccat=b._ccat?b._ccat.slice(0):[];if(b._corder){c.pageType="purchase";}
var i=[];var t=0;if(c.pageType=="purchase"||c.pageType=="cart"||c.pageType=="addToCart"){if(typeof u.productId=="undefined"){u.productId=_cprod;}
if(typeof u.masterId=="undefined"){u.masterId=_cprodname;}
if(typeof u.sku=="undefined"){u.sku=_csku;}
if(typeof u.brand=="undefined"){u.brand=_cbrand;}
if(typeof u.qty=="undefined"){u.qty=_cquan;}
if(typeof u.price=="undefined"){u.price=_cprice;}
for(d=0;d<u.productId.length;d++){try{if(u.productId[d]!=""){i.push({productId:u.productId[d],masterId:u.masterId[d],sku:u.sku[d],brand:u.brand[d],qty:u.qty[d],price:u.price[d]});t+=parseFloat(u.price[d])*parseInt(u.qty[d]);}}catch(e){}}}else{for(d=0;d<u.product_vars.length;d++){if(u[u.product_vars[d]]instanceof Array){u[u.product_vars[d]]=u[u.product_vars[d]]+"";}}}
if(c.pageType=="product"||c.pageType=="onProdReview"){c.productId=(u.productId?u.productId:_cprod+'');c.masterId=(u.masterId?u.masterId:_cprodname+'');c.sku=(u.sku?u.sku:_csku+'');c.brand=(u.brand?u.brand:_cbrand+'');}else if(c.pageType=="category"){if(!c.catId){c.catId=_ccat2+'';}
if(!c.catName){c.catName=_ccat+'';}
c.brand=(u.brand?u.brand:_cbrand+'');}else if(c.pageType=="cart"){if(!c.cartItems){c.cartItems=i;}
if(!c.cartTotal){c.cartTotal=t;}
if(!c.cartId){c.cartId=((b._ccustid)?b._ccustid:b["cp.utag_main_ses_id"]);}}else if(c.pageType=="purchase"){var o={};o.orderItems=c.orderItems||i;o.total=c.total||b._csubtotal;o.orderId=c.orderId||b._corder;o.tax=c.tax||b._ctax;o.shipping=c.shipping||b._cship;o.city=c.city||b._ccity;o.state=c.state||b._cstate;o.country=c.country||b._ccountry;c.orders=[];c.orders.push(o);}else if(c.pageType=="addToCart"){if(!c.cartItems){c.cartItems=i;}
if(!c.cartTotal){c.cartTotal=t;}
if(!c.cartId){c.cartId=((b._ccustid)?b._ccustid:b["cp.utag_main_ses_id"]);}}else if(c.pageType=="onCheckout"){if(!c.value){c.value="Page";}}else if(c.pageType=="onEmail"){if(!c.email){c.email=b._ccustid;}
if(!c.type){c.type="transact";}}else if(c.pageType=="ship"||c.pageType=="onShip"){if(!c.value){c.value=b._cship;}}else if(c.pageType=="onPromo"){if(!c.code){c.code=b._cpromo;}
if(!c.id){c.id=c.code;}}
if(c.pageType.indexOf("on")==0||c.pageType.indexOf("addToCart")==0){u.smtr_event=c.pageType;delete c.pageType;}
_smtr.push([(u.smtr_event?u.smtr_event:"pageView"),c]);d='tealium_tag_13056';if(!document.getElementById(d)){c=document.createElement('script');c.type='text/javascript';c.async=true;c.id=d;c.src=u.base_url;f=document.getElementsByTagName('script')[0];f.parentNode.insertBefore(c,f)}}};try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}})('18','macys.main');}catch(e){}
