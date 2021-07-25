//  头部信息
//  请求的导航数据
export const NAV_LIST_DATA = 'NAV_LIST_DATA';

//  设置请求的导航数据
export const setNavListData = (navListData) => {
    return { type: NAV_LIST_DATA, navListData };
};

export function REDUCER_HEADER_DATA(state = {
    //  刚开始没数据
    navListData: null,
}, action) {
    const { type, navListData } = action;
    switch (type) {
        case NAV_LIST_DATA:
            return Object.assign([], state, { navListData });
        default:
            return state;
    }
}