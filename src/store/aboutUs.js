//  关于我们，主要是地图事件

//  展开的市的index
export const OPEN_INDEX = 'OPEN_INDEX';

/**
 * 设置激活index
 * @param {number} openIndex
 * @return {Object}
 * */
export function setAboutUsMapOpenIndex(openIndex) {
    return { type: OPEN_INDEX, openIndex };
}

//  点击的区的id
export const ACTIVE_AREA_ID = 'ACTIVE_AREA_ID';

/**
 * 设置点击的区的激活id
 * @param {number} activeAreaId
 * @param {string} activeAreaName
 * @return {Object}
 * */
export function setAboutUsMapActiveAreaId(activeAreaId, activeAreaName) {
    return { type: ACTIVE_AREA_ID, activeAreaId, activeAreaName };
}

//  组件初始化完成 - 父级
export const COMPONENT_DID_MOUNT_FINISH = 'COMPONENT_DID_MOUNT_FINISH';

export function setComponentDidMountFinish(componentDidMountFinish) {
    return { type: COMPONENT_DID_MOUNT_FINISH, componentDidMountFinish };
}

//  关于我的 地图
export function REDUCER_ABOUT_US_MAP(state = {
    openIndex: 0,
    //  默认激活openIndex为零的第一个的id
    activeAreaId: null,
    activeAreaName: null,
    //  组件初始化
    componentDidMountFinish: false,
}, action) {
    const { type, openIndex, activeAreaId, activeAreaName, componentDidMountFinish } = action;
    switch (type) {
        case OPEN_INDEX:
            return Object.assign({}, state, { openIndex });
        case ACTIVE_AREA_ID:
            return Object.assign({}, state, { activeAreaId, activeAreaName });
        case COMPONENT_DID_MOUNT_FINISH:
            return Object.assign({}, state, { componentDidMountFinish });
        default:
            return state;
    }
}
