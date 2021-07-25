import React from 'react';
import style from './index.module.less';
import getMoreImgSrc from '@media/getMoreBox/bg-contact.png';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
//  联系我们，获取更多
export const GetMoreBox = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({
    setPopFormOpenStatus,
    //  是灰色背景色
    isGrey,
}) => {
    return (
        <div className={`${style.getMoreBox} ${isGrey ? style.isGrey : ''}`}>
            <img className={style.getMoreImg} src={getMoreImgSrc} alt='' />
            <div className={style.getMoreIn}>
                <div className={style.getMoreTitle}>联系我们获取更多产品信息</div>
                <div className={style.inquireBtn} onClick={() => { setPopFormOpenStatus(true); }}>合作咨询</div>
            </div>
        </div>
    );
});