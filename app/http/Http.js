import { Toast } from 'antd-mobile';
import config from './index';

const showLoading = (doLoading) => {
    doLoading ? Toast.loading('加载中...') : Toast.hide();
};

let loading = false;

function fetchWithOutOfTime(url, reqSetting, overtime = 25000) {
    let fetchPromise = new Promise((resolve, reject) => {
        resolve(fetch(url, reqSetting));
    });

    let timeoutPromise = new Promise(function(resolve, reject){
        let tovertime = overtime ? overtime: 25000;
        setTimeout(()=>{
            // console.log(`----------------后端服务请求超时--${overtime}------------------`);
            resolve({code: 408, msg: "后端服务请求超时!"});
        }, tovertime)
    });
    return Promise.race([fetchPromise, timeoutPromise]);
}
function fetchPWithOutOfTime(url, reqSetting, overtime = 25000) {
    let fetchPromise = new Promise((resolve, reject) => {
        resolve(fetch(url, reqSetting));
    });
    let timeoutPromise = new Promise(function(resolve, reject){
        let tovertime = overtime ? overtime : 25000;
        setTimeout(()=>{
            // console.log(`----------------后端服务请求超时--${overtime}------------------`);
            resolve({code: 408, msg: "后端服务请求超时!"});
        }, tovertime)
    });
    return Promise.race([fetchPromise, timeoutPromise]);
}

/********** 基础请求 ************/
// fetch 请求
export async function fetchService(url, settings, overtime, hiddenLoading = true) {
    loading = true;
    setTimeout(() => {
        if (loading) {
            !hiddenLoading && showLoading(false);
            !hiddenLoading && showLoading(true);
        }
    }, 300);


    //  Bearer46ec8101-f7f5-4e36-a55c-0e52e5780812392#6AQ+53w+q+a9AeLKgxqTS+zU4Z4bE4ldNxBX3/fcmmWN6EWhyMglqquoVOofqDBC
    // （18525369183/Aa123456）

    //  Bearer3d886c8f-e3de-4aba-9130-c93622b66375338#LPgS5R4DAs5urvBWVXlXHuyXUChOCD+BUxyLxe1Y81nRmJT3Z45dQP6Qh0rELh1i 
    // （15542649596/Aa123456）

    // 第一个账号是非二十强战队队员账号。

    // 第二个是二十强战队中其中一个队的队长的账号
    // const userToken = await global.getItem('userToken'); 
    // const userToken = 'Bearer3d886c8f-e3de-4aba-9130-c93622b66375338#LPgS5R4DAs5urvBWVXlXHuyXUChOCD+BUxyLxe1Y81nRmJT3Z45dQP6Qh0rELh1i'
    // localStorage.setItem('sg_login_token_secret','Bearer5675bcdb-512e-4d55-b207-2eac701e441c220#IouQAgVp+zStVR8SWVdSbG26mvT6+U/1gr6K/zQ+HhCzElBqmojTbZj9B+98RHi1');

    const userToken = localStorage.getItem('race-token') || localStorage.getItem('sg_login_token_secret');
    const reqSetting = {
        ...settings,
        headers: {
            Accept: 'application/json',
            ...settings.headers,
            agent: 'Mozilla/5.0-AppleWebKit/537.36-Chrome/67.0.3396.99-Safari/537.36',
            TokenAuthorization: userToken,
        },
    };
    const resp = await fetchWithOutOfTime(url, reqSetting, overtime);
    loading = false;
    !hiddenLoading && showLoading(false);
    if(resp.code && resp.code == 408){
        const error = new Error(`${url} 请求超时!`);
        error.code = 408;
        error.text = "后端服务请求超时!";
        // Toast.fail("后端服务请求超时!", 1);
        throw error;
    }else{
        if (!resp.ok) {
            const error = new Error(`${url} is not OK!`);
            error.code = resp.status;
            error.text = resp.statusText;
            // Toast.fail('数据请求失败',2);
            throw error;
        }
        // console.log(`${url} response status:${resp.status}`)
        return resp;
    }
}
// fetch 跨域请求
export async function fetchJsonP(url, settings, overtime, hiddenLoading) {
    loading = true;
    setTimeout(() => {
        if (loading) {
            !hiddenLoading && showLoading(false);
            !hiddenLoading && showLoading(true);
        }
    }, 300);
    const userToken = await global.getItem('userToken');
    const reqSetting = {
        ...settings,
        headers: {
            Accept: 'application/json',
            ...settings.headers,
            TokenAuthorization: userToken
        },
    };
    const resp = await fetchPWithOutOfTime(url, reqSetting, overtime);
    loading = false;
    !hiddenLoading && showLoading(false);
    if(resp.code && resp.code == 408){
        const error = new Error(`${url} 请求超时!`);
        error.code = 408;
        error.text = "后端服务请求超时!";
        // Toast.fail("后端服务请求超时!", 1);
        throw error;
    }else {
        if (!resp.ok) {
            const error = new Error(`${url} is not OK!`);
            error.code = resp.status;
            error.text = resp.statusText;
            // Toast.fail('数据请求失败',2);
            throw error;
        }
        return JSON.parse(resp._bodyText.substring(5, resp._bodyText.length - 1));
    }
}
/********** 基础请求 ************/

/********** 直接使用的请求 ************/
// 普通 GET 请求
export async function GET(url, query, settings, overtime, hiddenLoading, hiddenErrorMsg) {
    let tmp = url;
    if(query){
        tmp = (url.indexOf('?') === -1) ? url + '?' : url + '&';
        for (const [key, value] of Object.entries(query)) {
            tmp = tmp + key + '=' + value + '&';
        }
        tmp = tmp.substring(0, tmp.length - 1);
    }
    // console.log(`\n\n==========HTTP-GET-START==========\nURL:${tmp}`);
    const resp = await fetchService(tmp, {
        ...settings,
        method: 'GET',
    }, overtime, hiddenLoading);
    const result = await resp.json();
    // console.log(`\n\n==========HTTP-GET-END==========\nURL:${tmp}`);
    // console.log(result);
    if(url.indexOf('sg/game/winnerList.json') === -1 && result.code == 120){
        dvaStore.dispatch({type: 'ADModel/show120'});
    }else{
        if (result.success === false && !hiddenErrorMsg && result.message != '用户未登录') {
            result.message ? Toast.fail(result.message, 2) : console.log('服务器错误');
        }
        return result;
    }
}
// GET 跨域请求
export async function GET_P(url, query, setting, overtime, hiddenLoading, hiddenErrorMsg) {
    let tmp = url;
    if(query){
        tmp = (url.indexOf('?') === -1) ? url + '?' : url + '&';
        for (const [key, value] of Object.entries(query)) {
            tmp = tmp + key + '=' + value + '&';
        }
        tmp = tmp.substring(0, tmp.length - 1);
    }
    const resp = await fetchJsonP(tmp, {
        ...settings,
        method: 'GET',
    }, overtime, hiddenLoading);
    // console.log(`\n\n==========HTTP-GET_P==========\nURL:${tmp}\nBACK:${JSON.stringify(resp)}`);
    // console.log('\n\n');
    if (resp.success === false && !hiddenErrorMsg) {
        resp.message ? Toast.fail(resp.message, 2) : console.log('服务器错误');
    }
    return resp;
}
// POST 通过 multipart/form-data 提交    
export async function POST_APP_FORM(url, body, query, settings = {headers: {}}, overtime, hiddenLoading)
{
    let tmp = url;
    if(query){
        tmp = (url.indexOf('?') === -1) ? url + '?' : url + '&';
        for (const [key, value] of Object.entries(query)) {
            tmp = tmp + key + '=' + value + '&';
        }
        tmp = tmp.substring(0, tmp.length - 1);
    }
    const formData = new FormData();
    for (const key in body) {
        if (body.hasOwnProperty(key)) {
            formData.append(key, body[key]);
        }
    }
    console.log(`==========HTTP-POST_BODY-START==========\nURL:${tmp}\nBODY:${JSON.stringify(body)}`);
    const resp = await fetchService(tmp, {
        ...settings,
        method: 'POST',
        body: formData,
    }, overtime, hiddenLoading);
    const result = await resp.json();
    console.log(`==========HTTP-POST_BODY-END==========\nURL:${tmp}\nBODY:${JSON.stringify(body)}`);
    console.log(result);
    if(url.indexOf('sg/game/winnerList.json') === -1 && result.code == 120){
        dvaStore.dispatch({type: 'ADModel/show120'});
    }else {
        if (!result.success) {
            result.message ? Toast.fail(result.message, 2) : console.log('服务器错误');
        }
        return result;
    }
}
// POST 通过 multipart/form-data 提交
export async function POST_FORM(url, body, query, settings = {headers: { 'Content-Type': 'multipart/form-data' }}, overtime, hiddenLoading)
{
    let tmp = url;
    if(query){
        tmp = (url.indexOf('?') === -1) ? url + '?' : url + '&';
        for (const [key, value] of Object.entries(query)) {
            tmp = tmp + key + '=' + value + '&';
        }
        tmp = tmp.substring(0, tmp.length - 1);
    }
    console.log(`==========HTTP-POST_BODY-START==========\nURL:${tmp}\nBODY:${JSON.stringify(body)}`);
    const resp = await fetchService(tmp, {
        ...settings,
        method: 'POST',
    }, overtime, hiddenLoading);
    const result = await resp.json();
    console.log(`==========HTTP-POST_BODY-END==========\nURL:${tmp}\nBODY:${JSON.stringify(body)}`);
    console.log(result);
    if(url.indexOf('sg/game/winnerList.json') === -1 && result.code == 120){
        dvaStore.dispatch({type: 'ADModel/show120'});
    }else {
        if (!result.success) {
            result.message ? Toast.fail(result.message, 2) : console.log('服务器错误');
        }
        return result;
    }
}
// POST 通过 application/json 提交
export async function POST_JSON(url, body, query, settings = {headers: { 'Content-Type': 'application/json' }}, overtime, hiddenLoading)
{
    let tmp = url;
    if(query){
        tmp = (url.indexOf('?') === -1) ? url + '?' : url + '&';
        for (const [key, value] of Object.entries(query)) {
            tmp = tmp + key + '=' + value + '&';
        }
        tmp = tmp.substring(0, tmp.length - 1);
    }
    console.log(`==========HTTP-POST_JSON-START==========\nURL:${tmp}\nBODY:${JSON.stringify(body)}`);
    const resp = await fetchService(url, {
        ...settings,
        method: 'POST',
        body: (typeof body == 'object' ? JSON.stringify(body): body),
    }, overtime, hiddenLoading);
    // console.log(resp);
    const result = await resp.json();
    console.log(`==========HTTP-POST_JSON-END==========\nURL:${tmp}\nBODY:${JSON.stringify(body)}`);
    console.log(result);
    console.log('\n\n');
    if(url.indexOf('sg/game/winnerList.json') === -1 && result.code == 120){
        dvaStore.dispatch({type: 'ADModel/show120'});
    }else {
        if (!result.success && result.errorCode != '520' && result.message != '用户未登录') {
            result.message ? Toast.fail(result.message, 2) : console.log('服务器错误');
        }
        return result;
    }
}

/********** 直接使用的请求 ************/