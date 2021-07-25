//  fixedTabBox专用

//  barBoxAnchorList，右侧描述、参数
export const BAR_BOX_ANCHOR_LIST = 'BAR_BOX_ANCHOR_LIST ';

//  barBoxData，左侧title
export const BAR_BOX_DATA = 'BAR_BOX_DATA';

/**
 * 设置右侧文字
 * @param {Array} barBoxAnchorList
 * @return {Object}
 * */
export function setBarBoxAnchorList(barBoxAnchorList) {
    return { type: BAR_BOX_ANCHOR_LIST, barBoxAnchorList };
}

/**
 * 设置左侧title文字
 * @param {Array} barBoxData
 * @return {Object} subTitle、subDescription、id，导航相关
 * */
export function setBarBoxData(barBoxData) {
    return { type: BAR_BOX_DATA, barBoxData };
}

//  初始的barBoxAnchorList
export const originBarBoxAnchorList = [{
    anchor: '#m1', customOffsetTop: 0, name: '概述'
}, {
    anchor: '#m2', customOffsetTop: 0, name: '参数'
}];

//  固定定位
export function REDUCER_FIXED_TAB_BOX(state = {
    barBoxAnchorList: originBarBoxAnchorList,
    barBoxData: {},
}, action) {
    const { type, barBoxAnchorList, barBoxData } = action;
    switch (type) {
        case BAR_BOX_ANCHOR_LIST:
            return Object.assign([], state, { barBoxAnchorList });
        case BAR_BOX_DATA:
            if (state.barBoxData.id) {
                return state;
            }
            return Object.assign({}, state, { barBoxData });
        default:
            return state;
    }
}

//  e.g.
//  设置barBox的参数
//  const { setBarBoxAnchorList } = props;
//  setBarBoxAnchorList(['概述', '参数']);