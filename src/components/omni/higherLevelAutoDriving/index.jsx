import React from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import style from './index.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

//  Horizon Omni 赋能更高级别自动驾驶
export const HigherLevelAutoDriving = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({
        higherLevelAutoDrivingData,
    }) => {
        const data = { title: 'Horizon Omni 赋能更高级别自动驾驶' };
        console.log(higherLevelAutoDrivingData);
        return (
            <div id='higherLevelAutoDriving' className={style.higherLevelAutoDriving}>
                <BasicTitleDesc data={data} isLight={true}/>
                <div className={style.content}>
                    <div className={style.centerImg}/>
                </div>
            </div>
        );
    },
);