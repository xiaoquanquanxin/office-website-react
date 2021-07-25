import React from 'react';
import style from './index.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

//  边缘计算赋能 AIoT
export const AiotBox = ({
    aiotBoxData
}) => {
    aiotBoxData = aiotBoxData || {};
    return (
        <div className={style.aiotBox}>
            <BasicTitleDesc data={aiotBoxData} widthType={710} />
            <div className={style.earchDec} style={{ backgroundImage: `url(${aiotBoxData.img || ''})` }} />
        </div>
    );
};