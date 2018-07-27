
/*
* 服务器接口
* */
const DEV = "DEV"; // 测试
const APP = "APP"; // 线上

let COMPETITION_HOST;
/*******------设置发布状态------**********/

const SET_ENV = 'DEV';

/*******------设置发布状态------**********/
if(SET_ENV !== DEV) {
  console.log = () => {};
}

if(SET_ENV === DEV){
    // COMPETITION_HOST= 'http://mobiletest.ehaier.com:38080';
    COMPETITION_HOST= '';
} else {
    COMPETITION_HOST= 'http://m.ehaier.com';
}

// 第三方链接
if(SET_ENV === DEV){
    
} else {
    
}


export default  {
    COMPETITION_HOST,
    // 第三方链接
};

// 获取生活服务模块的环境
export const getEnviroment = ()=>{
    return SET_ENV === DEV ? 0 : 1; // 正式环境返回 1 ，其他环境返回0
};