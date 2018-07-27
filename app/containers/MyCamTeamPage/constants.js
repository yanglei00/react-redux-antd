/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
// 战队信息
export const INIT_FETCH = 'COMPETITION/MYCAM/INIT_FETCH';
export const INIT_FETCH_SUCCESS = 'COMPETITION/MYCAM/INIT_FETCH_SUCCESS';

// 获取评论
export const WORKNUM_FETCH = 'COMPETITION/MYCAM/WORKNUM_FETCH';
export const WORKNUM_FETCH_SUCCESS = 'COMPETITION/MYCAM/WORKNUM_FETCH_SUCCESS';

// 提交评论
export const SUBMITCOMMENTS_FETCH = 'COMPETITION/MYCAM/SUBMITCOMMENTS_FETCH';
export const SUBMITCOMMENTS_FETCH_SUCCESS = 'COMPETITION/MYCAM/SUBMITCOMMENTS_FETCH_SUCCESS';


