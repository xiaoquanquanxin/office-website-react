import React from 'react';
import style from './index.module.less';
import layout from '@css/layout.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';

//  客户案例
export const NCustomerCase = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({
    nCustomerCaseData,
    setVideoOpenStatus
}) => {
    nCustomerCaseData = nCustomerCaseData || {};
    const { info } = nCustomerCaseData;
    return (
        <div className={style.customerCase}>
            <div className={style.customerCaseIn}>
                <div style={{ width: '100%' }}>
                    <BasicTitleDesc data={nCustomerCaseData} />
                </div>
                <div className={`${layout.imgCenter2} ${style.imgCenter2} ${info && info.video ? style.play : ''}`}
                    style={{ backgroundImage: `url(${(info && info.img) || ''})` }}
                    onClick={() => { setVideoOpenStatus(true, info && info.video); }}
                />
                <div className={style.nameDesc}>
                    <p className={style.name}
                        dangerouslySetInnerHTML={{ __html: info && info.title }} />
                    <div className={style.line} />
                    <div className={style.desc}
                        dangerouslySetInnerHTML={{ __html: info && info.desc }} />
                </div>
            </div>
        </div>
    );
});