import React from 'react';
import style from './index.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

export const OpenExplorer = ({
    openExplorerData,
    //  是浅色的底
    isLight,
    //  外边距
    margin
}) => {
    openExplorerData = openExplorerData || {};
    let marginClass;
    switch (margin) {
        case .2:
            marginClass = style.marginClassM2;
            break;
        default:
            break;
    }
    return (
        <div className={`${style.openExplorer} ${isLight ? style.isLight : ''}`}>
            <BasicTitleDesc data={openExplorerData} widthType={918} isLight={isLight} />
            <img src={openExplorerData.img || ''} className={`${style.img} ${marginClass}`} alt='' />
        </div>
    );
};