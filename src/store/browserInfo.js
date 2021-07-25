import { BASIC_COMPARE_WIDTH } from '@utils/constant';
//  浏览器宽度够宽
export const IS_RELATIVE_WIDE = 'IS_RELATIVE_WIDE';

/**
 * 设置宽度
 * @param {boolean} isRelativeWide 是够宽
 * */
export function setRelativeWide(isRelativeWide) {
    return { type: IS_RELATIVE_WIDE, isRelativeWide };
}

//  浏览器滚动
export const BROWSER_SCROLL_INFO = 'BROWSER_SCROLL_INFO';

//  设置浏览器滚动信息
export function setBrowserScrollInfo(scrollLeft, scrollTop) {
    return { type: BROWSER_SCROLL_INFO, scrollLeft, scrollTop };
}

//  浏览器事件信息
export function REDUCER_BROWSER_INFO(state = {
    //  是否够宽    > 750
    isRelativeWide: window.innerWidth > BASIC_COMPARE_WIDTH,
    //  滚动左度
    scrollLeft: document.documentElement.scrollLeft || document.body.scrollLeft,
    //  滚动高度
    scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
}, action) {
    const { type, isRelativeWide, scrollLeft, scrollTop } = action;
    switch (type) {
        case IS_RELATIVE_WIDE:
            return Object.assign({}, state, { isRelativeWide });
        case BROWSER_SCROLL_INFO:
            return Object.assign({}, state, { scrollLeft, scrollTop });
        default:
            return state;
    }
}