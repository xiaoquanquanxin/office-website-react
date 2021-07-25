import React from 'react';
import style from './index.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

//  开放工具链
export const ChainBox = ({
    chainBoxData
}) => {
    chainBoxData = chainBoxData || {};
    return (
        <div className={style.chainBox}>
            <BasicTitleDesc data={chainBoxData} widthType={600} />
            <img src={chainBoxData.img} className={style.img} alt='' />
        </div>
    );
};