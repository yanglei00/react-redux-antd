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
export const INIT_FETCH = 'COMPETITION/EDITCLAN/INIT_FETCH';

// 更新战队头像
export const UPLOADCLANAVATAR_FETCH = 'COMPETITION/EDITCLAN/UPLOADCLANAVATAR_FETCH';
export const UPLOADCLANAVATAR_FETCH_SUCCESS = 'COMPETITION/EDITCLAN/UPLOADCLANAVATAR_FETCH_SUCCESS';

// 安卓更新战队头像
export const ANDROIDUPLOADCLANAVATAR_FETCH = 'COMPETITION/EDITCLAN/ANDROIDUPLOADCLANAVATAR_FETCH_FETCH';
export const ANDROIDUPLOADCLANAVATAR_FETCH_SUCCESS = 'COMPETITION/EDITCLAN/ANDROIDUPLOADCLANAVATAR_FETCH_SUCCESS';

// 保存战队信息
export const SUBMITCLANINFO_FETCH = 'COMPETITION/EDITCLAN/SUBMITCLANINFO_FETCH';
export const SUBMITCLANINFO_FETCH_SUCCESS = 'COMPETITION/EDITCLAN/SUBMITCLANINFO_FETCH_SUCCESS';
