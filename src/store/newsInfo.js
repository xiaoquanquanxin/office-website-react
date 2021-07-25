//  选中的index
import { getSearchString } from '@utils/utils';

export const ACTIVE_INDEX = 'ACTIVE_INDEX';

//  新闻列表里的菜单类型数据
export const NEWS_CATEGORY_DATA = 'NEWS_CATEGORY_DATA';
//  map格式的以上数据
export const NEWS_CATEGORY_DATA_MAP = 'NEWS_CATEGORY_DATA_MAP';

/**
 * 设置激活index
 * @param {number} activeIndex
 * */
export function setTabBoxActiveIndex(activeIndex) {
    return { type: ACTIVE_INDEX, activeIndex };
}

/**
 * 设置新闻中心菜单
 * @param {Array} newsCategoryData
 * */
export function setNewsCategoryData(newsCategoryData) {
    return { type: NEWS_CATEGORY_DATA, newsCategoryData };
}

/**
 * 新闻中心菜单的map格式
 *
 * */
export function newsCategoryDataForMap(newsCategoryDataMap) {
    return { type: NEWS_CATEGORY_DATA_MAP, newsCategoryDataMap };
}

//  新闻的tab box
export function REDUCER_NEWS_TAB_BOX(state = {
    //  默认激活0
    activeIndex: Number(getSearchString('id')) || 0,
    //  默认没有数据
    newsCategoryData: null,
    //  默认map也没有
    newsCategoryDataMap: null,
}, action) {
    const { type, activeIndex, newsCategoryData, newsCategoryDataMap } = action;
    switch (type) {
        case ACTIVE_INDEX:
            return Object.assign({}, state, { activeIndex });
        case NEWS_CATEGORY_DATA:
            return Object.assign({}, state, { newsCategoryData });
        case NEWS_CATEGORY_DATA_MAP:
            return Object.assign({}, state, { newsCategoryDataMap });
        default:
            return state;
    }

}