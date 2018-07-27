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


// 更新战队头像
export const UPLOADCLANIMAGES_FETCH = 'COMPETITION/EDITCLAN/UPLOADCLANIMAGES_FETCH';
export const UPLOADCLANIMAGES_FETCH_SUCCESS = 'COMPETITION/EDITCLAN/UPLOADCLANIMAGES_FETCH_SUCCESS';