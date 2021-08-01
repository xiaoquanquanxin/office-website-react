//  车辆生态

//  点击支持场景的data
export const SUPPORT_SCENARIO_ACTIVE_DATA = 'SUPPORT_SCENARIO_ACTIVE_DATA';

//  点击开发流程的data
export const DEVELOPMENT_PROCESS_DATA = 'DEVELOPMENT_PROCESS_DATA';

/**
 * 设置激活index
 * @param {number} supportScenarioActiveData
 * @return {Object}
 * */
export function setSupportScenarioActiveData(supportScenarioActiveData){
    return { type: SUPPORT_SCENARIO_ACTIVE_DATA, supportScenarioActiveData };
}

/**
 * 设置激活index
 * @param {number} activeDevelopmentProcessData
 * @return {Object}
 * */
export function setDevelopmentProcessData(activeDevelopmentProcessData){
    return { type: DEVELOPMENT_PROCESS_DATA, activeDevelopmentProcessData };
}

//  浏览器事件信息
export function REDUCER_DESIGN_IN(state = {
    supportScenarioActiveData: null,
    activeDevelopmentProcessData: null,
}, action){
    const { type, supportScenarioActiveData, activeDevelopmentProcessData } = action;
    switch (type) {
        case SUPPORT_SCENARIO_ACTIVE_DATA:
            return Object.assign({}, state, { supportScenarioActiveData });
        case DEVELOPMENT_PROCESS_DATA:
            return Object.assign({}, state, { activeDevelopmentProcessData });
        default:
            return state;
    }
}