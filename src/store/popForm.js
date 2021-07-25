//  是否打开form表单
export const POP_FORM_IS_OPEN = 'POP_FORM_IS_OPEN';

/**
 * 是否打开form表单
 * @param {boolean} popFormIsOpen
 * */
export function setPopFormOpenStatus(popFormIsOpen) {
    return { type: POP_FORM_IS_OPEN, popFormIsOpen };
}

//  是否打开toast
export const TOAST_STATUS = 'TOAST_STATUS';

/**
 * 成功或失败的弹框
 * @param {boolean} toastStatus
 * @param {boolean} isSuccess   成功了
 * **/
export function setToastStatus(toastStatus, isSuccess) {
    return { type: TOAST_STATUS, toastStatus, isSuccess };
}

//  form表单提交
export function REDUCER_POP_FORM(state = {
    //  刚开始是关闭的
    popFormIsOpen: false,
    //  表单是否打开
    toastStatus: false,
    //  是成功
    isSuccess: true,
}, action) {
    const { type, popFormIsOpen, toastStatus, isSuccess } = action;
    switch (type) {
        case POP_FORM_IS_OPEN:
            return Object.assign({}, state, { popFormIsOpen });
        case TOAST_STATUS:
            return Object.assign({}, state, { toastStatus, isSuccess });
        default:
            return state;
    }
}