import React from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import style from './index.module.less';
import layout from '@css/layout.module.less';

export const Toast = connect(
    mapStateToProps,
    mapDispatchToProps
)(({
    REDUCER_POP_FORM,
}) => {
    const { toastStatus, isSuccess } = REDUCER_POP_FORM;
    //  console.log('toastStatus', toastStatus);
    return (
        <div className={`${style.toastWrap} ${layout.mask} ${toastStatus ? layout.flex : layout.none}`}>
            <div className={`${style.toast} ${toastStatus ? style.isAnimation : ''}`}>
                {isSuccess ? '提交成功！' : '提交失败，请稍后重试'}
            </div>
        </div>
    );
});