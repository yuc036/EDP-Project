(function() {
try {
    (function() {
    var mid = document.createElement('script'); mid.type = 'text/javascript'; mid.async = true;
    mid.src = '//mathid.mathtag.com/d/i.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(mid, s);
})();

(window.MathIDInits = window.MathIDInits || []).push(function() {
    MathID.getData({mt_id:'',ccid:'',cuid:'',mm_uuid:'d9e75b43-d15e-4400-a450-d569dabbbe65',src:'mt2'}).then(function(data) {
        var p = document.createElement('script');
        p.src = '//pixel.mathtag.com/event/js?mt_pp=1&mt_adid=208161&no_log&mathid_data=' + encodeURIComponent(data);
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(p, s);
    });
});
}
catch(ex)
{
   document.createElement("img").src="//pixel.mathtag.com/error/img?error_domain=wrap_js&what="+encodeURIComponent(ex.message);
}
})();
