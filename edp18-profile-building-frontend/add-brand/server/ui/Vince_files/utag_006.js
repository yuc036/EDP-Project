//tealium universal tag - utag.sync ut4.0.201807111732, Copyright 2018 Tealium.com Inc. All Rights Reserved.
(function(){var host=location.hostname||'',path=location.pathname||'',isAuthUrl=/^auth\./.test(host),isMobile=typeof ENV_CONFIG!=='undefined'&&ENV_CONFIG.tealium_consumer_platform==="mobileweb",isProd=/macys\.com/.test(host),isQA15=/qa15codemacys/.test(host),isQA20=/qa20codemacys/.test(host),responsive_urls=['^/chkout/','^/myaccount/home','^/account/preferences'],responsive_regex=new RegExp(responsive_urls.join('|')),isResponsive=responsive_regex.test(path),bvoice_urls=['^/shop/product/','^/shop/registry/wedding/product/','^/shop/wedding-registry/product/','^/chkout/'],bvoice_regex=new RegExp(bvoice_urls.join('|')),isBVoicePage=bvoice_regex.test(path),bcove_urls=['^/campaign/','^/m/','^/shop/(?!product/)'],bcove_regex=new RegExp(bcove_urls.join('|')),isBCovePage=bcove_regex.test(path);function loadScript(url){if(url){var h=document.getElementsByTagName('head')[0],s=document.createElement('script');s.type='text/javascript';s.src=url;s.async=false;h.appendChild(s);}}
function loadAdobeTT(){function loadDesktop(){window.targetPageParams=function(){function a(a){var b,c,d,e=document.cookie.split(";");for(b=0;b<e.length;b++)if(c=e[b].substr(0,e[b].indexOf("=")),d=e[b].substr(e[b].indexOf("=")+1),c=c.replace(/^\s+|\s+$/g,""),c==a)return unescape(d)}function b(){return"1"==a("SignedIn")}var c=[];a("macys_online_uid")&&b()&&c.push("mbox3rdPartyId="+a("macys_online_uid")),a("macys_online_uid")&&b()&&c.push("profile.uid="+a("macys_online_uid")),b()?c.push("profile.visitorType=registered"):c.push("profile.visitorType=guest"),a("shippingCountry")&&c.push("shippingCountry="+a("shippingCountry")),a("SignedIn")&&"1"==a("SignedIn")?c.push("signedIn=true"):c.push("signedIn=false");var d=document.URL,e=(d||"").match("[?&]id=([^&]+)");return e&&e.length?(id=e[1],c.push("user.categoryId="+id)):(e=(d||"").match("[?&]CategoryID=([^&]+)"),e&&e.length&&(id=e[1],c.push("user.categoryId="+id))),c.join("&")};loadScript('https://assets.macysassets.com/javascript/VisitorAPI.js');loadScript('https://assets.macysassets.com/javascript/at_9_3.js');}
if(!isAuthUrl&&!isQA15&&!isQA20&&!isMobile){loadDesktop();}
else if(!isAuthUrl&&isResponsive){loadDesktop();}}
function loadBrightCove(){loadScript('//sadmin.brightcove.com/js/BrightcoveExperiences.js');loadScript('//sadmin.brightcove.com/js/APIModules_all.js');}
loadAdobeTT();isBCovePage&&loadBrightCove();})();