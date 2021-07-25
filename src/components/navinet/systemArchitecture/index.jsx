import React from 'react';
import style from './index.module.less';
// import { BasicTitleDesc } from '@components/basicTitleDesc';

//  系统架构
export const SystemArchitecture = ({
    systemArchitectureData
}) => {
    systemArchitectureData = systemArchitectureData || {};
    return (
        <div className={style.sysStructor}>
            <div className={style.sysStructorIn} >
                <img src={systemArchitectureData.img || ''} alt="" />
                <p className={style.title} dangerouslySetInnerHTML={{ __html: systemArchitectureData.title }}></p>
            </div>
        </div>
    );
};