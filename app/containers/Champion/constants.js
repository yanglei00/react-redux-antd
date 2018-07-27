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

 // 梦层展示与否
export const SHOW_MASK = 'COMPETITION/CHAMPION/SHOW_MASK';
export const CLOSE_MASK = 'COMPETITION/CHAMPION/CLOSE_MASK';

 // 获取金币
 export const GETMYGOLD_FETCH = 'COMPETITION/CHAMPION/GETMYGOLD_FETCH';
 export const GETMYGOLD_FETCH_SUCCESS = 'COMPETITION/CHAMPION/GETMYGOLD_FETCH_SUCCESS';

// 竞猜投注
export const DOGUESS_FETCH = 'COMPETITION/CHAMPION/DOGUESS_FETCH';
export const DOGUESS_FETCH_SUCCESS = 'COMPETITION/CHAMPION/DOGUESS_FETCH_SUCCESS';
