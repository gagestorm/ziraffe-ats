function ajax(e,t,o,r){debug&&console.log("A "+e+" AJAX request to "+o+" with data:"),debug&&console.log(t),$.ajax({type:e,url:o,data:t,success:function(e){r(e)}})}var debug=!1;console.log("main.js has been loaded.");var BASE=function(e){function t(){var e=!0;do{var t="gCStest="+Math.floor(1e8*Math.random());if(document.cookie=e?t+";expires=Tue, 01-Jan-2030 00:00:00 GMT":t,-1!==document.cookie.indexOf(t))return document.cookie=t+";expires=Sat, 01-Jan-2000 00:00:00 GMT",e}while(!(e=!e));return!1}function o(){return{expires:"",path:""}}var r=!1,n=!1;return Storage?(debug&&console.log("Supports Html5"),r=!0):(debug&&console.log("Doesnot support html5"),r=!1,n=t()),e.data=function(e,t,a){var i;if(r){if("undefined"!=typeof t)return sessionStorage.setItem(e,t),!0;i=sessionStorage.getItem(e)}else if(n){if("undefined"!=typeof t){a||(a=o());var s;if("undefined"!=typeof a.expires&&"number"==typeof a.expires){var u=new Date;u.setDate(u.getDate()+a.expires),s=u.toUTCString()}var l=e+"="+t;return l+=a.expires?";expires="+s:"",l+=a.path?";path="+a.path:"",document.cookie=l,!0}for(var d=document.cookie.split(";"),i=e?void 0:{},f=0,c=d.length;c>f;f++){var m=d[f].split("="),p=m[0].trim(),t=m[1].trim();if(e&&p===e){i=t;break}}}else alert("Your browser seems to be pretty old. Try new and visit us.");return i},e.remove=function(e,t){return r?null!==sessionStorage.getItem(e)?(sessionStorage.removeItem(e),!0):(debug&&console.log("No such key in local storage"),!1):void(n?(t||(t=o()),document.cookie=e+"=; expires=Thu, 01 Jan 1970 00:00:01 GMT;;path="+t.path):alert("Your browser seems to be pretty old. Try new and visit us."))},e.millisecondsToStr=function(e){function t(e){return e>1?"s":""}var o=Math.floor(e/1e3),r=Math.floor(o/31536e3);if(r)return r+" year"+t(r);var n=Math.floor((o%=31536e3)/86400);if(n)return n+" day ago"+t(n);var a=Math.floor((o%=86400)/3600);if(a)return a+" hour ago"+t(a);var i=Math.floor((o%=3600)/60);if(i)return i+" minute ago"+t(i);var s=o%60;return s?s+" second ago"+t(s):"less than a second"},e.serialToObject=function(e){for(var t,o=e.split("&"),r={},n=o.length,a=0;n>a;++a)t=o[a].split("="),2==t.length&&(r[t[0]]=t[1]);return r},e}(BASE||{});

$(document).ready(function(){
    
    $('.error-form').hide();
    $("#form-data").submit(function(e){
        e.preventDefault();
        var t = $("#form-data").serialize(), o = $(".error-form");
        var r = BASE.serialToObject(t);
        
        if( r.name != "" && r.company != "" && r.size != "" && r.email != "" && r.country != "" && r.location !="" && r.previous!="" ){
            o.hide()
            ajax("POST",t,$(this).attr("action"),function(response){
                $('.btn-success').html("Sending...");
                if(response.success){
                    $("#registration").modal('hide');
                    $(".super-success").show().html("Great! You will hear from ziraffe soon.");   
                    document.body.scrollTop = 0;
                }else
                    o.show().html("Somethign went wrong. Try Again.");
                
            });
        }else{
            console.log("Some error");
            o.show().html("All fields are required");
        }
    
    });
});