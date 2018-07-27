
import config from './index';

const COMPETITION_HOST= config.COMPETITION_HOST;

const getFullUrl = (url, host = COMPETITION_HOST)=>{
    return `${host}/${url}`;
};
// 顺逛快速获取用户信息接口
const GETMEMBER = 'v3/platform/web/member/getMember.json';
// 战队列表
const CLANLIST = 'competition/clan/getClans';
// 一键升级为微店主
const APPLYSTORE= 'v3/mstore/api/applyStore.json';
// 战队风采
const CLANINFO = 'competition/clan/getClanInfo';
// 评论
const GETCOMMENTS = 'competition/getComments';
const SUBMITCOMMENTS = 'competition/comment';
//  编辑战队信息
const UPLOADPICTURE = 'v3/h5/sg/upLoadCommentPicture.html';
const UPLOADCLANINFO = 'competition/clan/updateClan';
// 竞猜订单
const GUESSORDERLIST = 'competition/guess/selectMemberGuessPage';
const CLANVOTE = 'competition/vote';
//完成任务数
// const WORKNUM='competition/myTaskInfo';
//我的信息
// const MYDETAIL='competition/myContributingInfo';
//作品列表
const CAMLIST='competition/opus/getOpus';
//战队任务
const CAMTASK='competition/clan/getMyTask';
//队友列表
const MEMBERS='competition/clan/getMyClanMembers';

//提交话题评论
const INSERTSTORYCOMMENT= 'v5/sgcommunity/comment/insertStoryComment.ajax';
// 帖子点赞
// const SETCOMMEMTPRAISE= 'v5/sgcommunity/comment/setCommentPraise.ajax';
const SETCOMMEMTPRAISE='v5/sgcommunity/story/praiseStory.ajax';
// 冠军竞猜接口
const GETGUESSCLANS= 'competition/guess/getGuessClans';
const DOGUESS = 'competition/guess/doGuess';
const GETMYGOLD = 'competition/guess/getMyGold';
const GUESSRULE = 'competition/guessRuleDetail';
// 测试首页接口
const RULEURL='competition/ruleDetail';

const DETAILCONTENT='v5/sgcommunity/story/info.ajax';

const DETAILCOMMENT='v5/sgcommunity/comment/getStoryComment.ajax';


// 登录相关接口
const CAPTCHA = 'v3/platform/web/member/register/getImgCaptcha.html';
const VERTIFY = 'v3/platform/web/member/captchaForSmsLogin.json';
const LOGIN = 'v3/platform/web/member/smsLoginAndStore.json';
const DEVICE = 'v3/platform/web/token/getToken.json';

//排行榜
const RANKING = 'competition/getCompetitionRanking';


// 投票
const VOTE = 'competition/clan/getAllFields';

// 分享成功的回调
const SHARESUCCESSCALLBACK = 'competition/shareSucceedCallback';

export default URL = {
    COMPETITION_HOST,
    GETMEMBER: getFullUrl(GETMEMBER, COMPETITION_HOST),
    CLANLIST: getFullUrl(CLANLIST, COMPETITION_HOST),
    APPLYSTORE: getFullUrl(APPLYSTORE, COMPETITION_HOST),
    CLANINFO: getFullUrl(CLANINFO, COMPETITION_HOST),
    GETCOMMENTS: getFullUrl(GETCOMMENTS, COMPETITION_HOST),
    SUBMITCOMMENTS: getFullUrl(SUBMITCOMMENTS, COMPETITION_HOST),
    UPLOADPICTURE: getFullUrl(UPLOADPICTURE, COMPETITION_HOST),
    UPLOADCLANINFO: getFullUrl(UPLOADCLANINFO, COMPETITION_HOST),
    GUESSORDERLIST: getFullUrl(GUESSORDERLIST, COMPETITION_HOST),
    CLANVOTE: getFullUrl(CLANVOTE, COMPETITION_HOST),
    // WORKNUM:getFullUrl(WORKNUM, COMPETITION_HOST),
    // MYDETAIL:getFullUrl(MYDETAIL, COMPETITION_HOST),
    CAMLIST:getFullUrl(CAMLIST, COMPETITION_HOST),
    CAMTASK:getFullUrl(CAMTASK, COMPETITION_HOST),
    MEMBERS:getFullUrl(MEMBERS, COMPETITION_HOST),
    DETAILCONTENT:getFullUrl(DETAILCONTENT, COMPETITION_HOST),
    DETAILCOMMENT:getFullUrl(DETAILCOMMENT, COMPETITION_HOST),
    RULEURL: getFullUrl(RULEURL, COMPETITION_HOST),
    CAPTCHA: getFullUrl(CAPTCHA, COMPETITION_HOST),
    VERTIFY: getFullUrl(VERTIFY, COMPETITION_HOST),
    LOGIN: getFullUrl(LOGIN, COMPETITION_HOST),
    INSERTSTORYCOMMENT:getFullUrl(INSERTSTORYCOMMENT, COMPETITION_HOST),
    SETCOMMEMTPRAISE:getFullUrl(SETCOMMEMTPRAISE, COMPETITION_HOST),
    RANKING:getFullUrl(RANKING, COMPETITION_HOST),
    VOTE:getFullUrl(VOTE, COMPETITION_HOST),
    DEVICE:getFullUrl(DEVICE, COMPETITION_HOST),
    GETGUESSCLANS:getFullUrl(GETGUESSCLANS, COMPETITION_HOST),
    DOGUESS:getFullUrl(DOGUESS, COMPETITION_HOST),
    GETMYGOLD:getFullUrl(GETMYGOLD, COMPETITION_HOST),
    SHARESUCCESSCALLBACK:getFullUrl(SHARESUCCESSCALLBACK, COMPETITION_HOST),
    GUESSRULE:getFullUrl(GUESSRULE, COMPETITION_HOST),
}
