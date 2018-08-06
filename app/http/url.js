
import config from './index';

const COMPETITION_HOST= config.COMPETITION_HOST;

const getFullUrl = (url, host = COMPETITION_HOST)=>{
    return `${host}/${url}`;
};
// 顺逛快速获取用户信息接口
const GETMEMBER = 'v3/platform/web/member/getMember.json';


export default URL = {
    COMPETITION_HOST,
    GETMEMBER: getFullUrl(GETMEMBER, COMPETITION_HOST),
}
