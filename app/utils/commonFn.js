// js中获取URL中指定的查询字符串
const getUrlAttribute = (parameName) => {
    //location.search是从当前URL的?号开始的字符串，即查询字符串
    var query = (location.search.length > 0 ? location.search.substring(1) : null);
    
    if(null!=query)
    {
        var args = new Object( );
        var pairs = query.split("&"); 
        for(var i = 0; i < pairs.length; i++) 
        {
            var pos = pairs[i].indexOf("="); 
            if (pos == -1) 
                continue; 
            var argname = pairs[i].substring(0,pos); 
            var value = pairs[i].substring(pos+1); 
            value = decodeURIComponent(value); 
            args[argname] = value; 
        }
        //根据键名获取值
        return args[parameName]; 
    }
    return null;
}

// 平台
function isRnApp(){
	var u = window.navigator.userAgent;
    if( navigator.userAgent.indexOf('ShunGuangRN') > -1  ){ // rn app接入
        return true;
    }else{ // 
        return false;
    };
};
function isAndroid(){
    if( navigator.userAgent.indexOf('ShunGuangRN') > -1 && navigator.userAgent.indexOf('Android') > -1){ // rn android接入
        return true;
    }else{ // 
        return false;
    };
};
function isIos(){
    if( navigator.userAgent.indexOf('ShunGuangRN') > -1 && navigator.userAgent.indexOf('iPhone') > -1){ // rn ios接入
        return true;
    }else{ // 
        return false;
    };
};
function isWx() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    };
};
let commonFn = {};
export default commonFn = {
    getUrlAttribute,
    isRnApp,
    isIos,
    isAndroid,
    isWx
}