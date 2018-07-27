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

// 战队列表
export const INIT_FETCH = 'COMPETITION/CLANLIST/INIT_FETCH';
export const INIT_FETCH_SUCCESS = 'COMPETITION/CLANLIST/INIT_FETCH_SUCCESS';

// 投票
export const VOTE_FETCH = 'COMPETITION/CLANLIST/VOTE_FETCH';
export const VOTE_FETCH_SUCCESS = 'COMPETITION/CLANLIST/VOTE_FETCH_SUCCESS';


// 一键升级微店主
export const APPLYSTORE_FETCH = 'COMPETITION/CLANLIST/APPLYSTORE_FETCH';
export const APPLYSTORE_FETCH_SUCCESS = 'COMPETITION/CLANLIST/APPLYSTORE_FETCH_SUCCESS';