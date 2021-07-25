//  Reducers 指定了应用状态的变化如何响应 actions 并发送到 store 的，
import { combineReducers } from 'redux';

import { REDUCER_BROWSER_INFO } from './browserInfo';
import { REDUCER_NEWS_TAB_BOX } from '@store/newsInfo';
import { REDUCER_ABOUT_US_MAP } from '@store/aboutUs';
import { REDUCER_VIDEO } from '@store/video';
import { REDUCER_POP_FORM } from '@store/popForm';
import { REDUCER_FIXED_TAB_BOX } from '@store/fixedTabBox';
import { REDUCER_HEADER_DATA } from '@store/header';
import { REDUCER_BANNER_INFO } from '@store/banner';

const AppRedux = combineReducers({
    REDUCER_BROWSER_INFO,
    REDUCER_NEWS_TAB_BOX,
    REDUCER_ABOUT_US_MAP,
    REDUCER_VIDEO,
    REDUCER_POP_FORM,
    REDUCER_FIXED_TAB_BOX,
    REDUCER_HEADER_DATA,
    REDUCER_BANNER_INFO,
});
export default AppRedux;

