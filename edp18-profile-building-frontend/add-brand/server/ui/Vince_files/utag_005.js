//tealium universal tag - utag.496 ut4.0.201807060107, Copyright 2018 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader){var u={};utag.o[loader].sender[id]=u;if(utag===undefined){utag={};}if(utag.ut===undefined){utag.ut={};}if(utag.ut.loader===undefined){u.loader=function(o){var a,b,c,l;a=document;if(o.type==="iframe"){b=a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");b.setAttribute("src",o.src);}else if(o.type==="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";b.src=o.src;}if(o.id){b.id=o.id;}if(typeof o.cb==="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb();},false);}else{b.onreadystatechange=function(){if(this.readyState==="complete"||this.readyState==="loaded"){this.onreadystatechange=null;o.cb();}};}}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l==="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}};}else{u.loader=utag.ut.loader;}
u.ev={'view':1,'link':1};u.initialized=false;u.map={"spongecell_page_type":"pg","spongecell_event_name":"event_name","unified_category":"c","product_id":"p","order_id":"order_id"};u.extend=[function(a,b,c,d,e,f,g){d=b['page_type'];if(typeof d=='undefined')return;c=[{'home page':'home'},{'product':'product'},{'shopping bag':'cart'},{'browse':'category'},{'splash':'category'},{'checkout':'checkout'},{'search results':'search'},{'product quickview':'product'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){if(d==f){b['spongecell_page_type']=c[e][f];m=true};};if(m)break};},function(a,b){try{if((typeof b['event_name']!='undefined'&&b['event_name'].toString().toLowerCase()=='add_to_bag'.toLowerCase())){b['spongecell_event_name']='cart_add';b['spongecell_page_type']='product';b['unified_category']=b['t_category_id']}}catch(e){utag.DB(e)}},function(a,b){try{if((typeof b['page_type']!='undefined'&&b['page_type']!=''&&b['page_type'].toString().toLowerCase()=='checkout'.toLowerCase())){b['spongecell_page_type']='checkout'}}catch(e){utag.DB(e)}},function(a,b){try{if(1){if(typeof b.event_name!="undefined"&&b.event_name=="experiment"&&b.tealium_event=="link"){return false;}}}catch(e){utag.DB(e)}},function(a,b){try{if((typeof b['page_type']!='undefined'&&b['page_type'].toString().toLowerCase()=='splash'.toLowerCase())||(typeof b['page_type']!='undefined'&&b['page_type'].toString().toLowerCase()=='browse'.toLowerCase())){b['unified_category']=b['category_id']}}catch(e){utag.DB(e)}},function(a,b){try{if((typeof b['page_type']!='undefined'&&b['page_type'].toString().toLowerCase()=='product'.toLowerCase())||(typeof b['page_type']!='undefined'&&b['page_type'].toString().toLowerCase()=='product quickview'.toLowerCase())){b['unified_category']=b['t_category_id']}}catch(e){utag.DB(e)}},function(a,b){try{if(1){if(typeof b.event_name!="undefined"&&b.event_name=="product select sku"&&b.tealium_event=="link"){return false;}}}catch(e){utag.DB(e)}},function(a,b){try{if((typeof b['page_type']!='undefined'&&b['page_type'].toString().toLowerCase()=='search results'.toLowerCase())){b['product_id']=b['top_6_products']}}catch(e){utag.DB(e)}},function(a,b){try{if((typeof b['event_name']!='undefined'&&b['event_name'].toString().toLowerCase()=='add_to_bag'.toLowerCase())){b['unified_category']=b['t_category_id']}}catch(e){utag.DB(e)}}];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){var c,d,e,f,i;u.data={"pg":"","p":"","c":"","pz":"","z":"","pzz":"","event_name":"","base_url":"//rt.spongecell.com/v1/r/11194","kvp_delim":"=","qsp_delim":"&"
};for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.data[e[f]]=b[d];}}}
c=[];u.data.order_id=u.data.order_id||b._corder||"";u.data.p=u.data.p||b._cprod||[];u.data.c=u.data.c||b._ccat||[];if(a==="view"){if(u.data.order_id){u.data.z="complete";c.push("z"+u.data.kvp_delim+u.data.z);for(var i=0;i<u.data.p.length;i++){c.push("pzz"+u.data.kvp_delim+u.data.p[i]);}}
else if(u.data.pg==="home"){c.push("pg"+u.data.kvp_delim+u.data.pg);}
else if(u.data.pg==="category"){c.push("pg"+u.data.kvp_delim+u.data.pg);c.push("c"+u.data.kvp_delim+u.data.c);}
else if(u.data.pg==="product"){c.push("pg"+u.data.kvp_delim+u.data.pg);c.push("c"+u.data.kvp_delim+u.data.c);for(var i=0;i<u.data.p.length;i++){c.push("p"+u.data.kvp_delim+u.data.p[i]);}}
else if(u.data.pg==="search"){c.push("pg"+u.data.kvp_delim+u.data.pg);c.push("c"+u.data.kvp_delim+u.data.c);for(var i=0;i<u.data.p.length;i++){c.push("p"+u.data.kvp_delim+u.data.p[i]);}}
else if(u.data.pg==="cart"){u.data.z="view";c.push("z"+u.data.kvp_delim+u.data.z);c.push("pg"+u.data.kvp_delim+u.data.pg);for(var i=0;i<u.data.p.length;i++){c.push("pz"+u.data.kvp_delim+u.data.p[i]);}}
else if(u.data.pg==="checkout"){c.push("pg"+u.data.kvp_delim+"cart");for(var i=0;i<u.data.p.length;i++){c.push("pz"+u.data.kvp_delim+u.data.p[i]);}}}else if(u.data.event_name==="cart_add"){c.push("pg"+u.data.kvp_delim+u.data.pg);for(var i=0;i<u.data.p.length;i++){c.push("pz"+u.data.kvp_delim+u.data.p[i]);}
if(u.data.c){c.push("c"+u.data.kvp_delim+u.data.c);}}
u.data.base_url+="?";u.loader({"type":"img","src":u.data.base_url+c.join(u.data.qsp_delim)});}};utag.o[loader].loader.LOAD(id);})("496","macys.main");}catch(error){utag.DB(error);}