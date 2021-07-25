import React from 'react';
import style from './index.module.less';
import layout from '@css/layout.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

//  应用场景
export const MatrixApplyScene = ({
    applySceneData
}) => {
    applySceneData = applySceneData || {};
    let list;
    if (applySceneData.list) {
        list = applySceneData.list.map((item, index) => {
            return (
                <MASItem key={index} data={item} />
            );
        });
    }
    return (
        <div className={style.applyScene}>
            <BasicTitleDesc data={applySceneData}
                isLight={true}
                widthType={670}
                descriptionColor={'rgba(0,0,0,0.8)'}
            />
            <ul className={style.list}>
                {list}
            </ul>
        </div>
    );
};
//  每一项
const MASItem = ({
    data,
}) => {
    return (
        <li className={style.item}>
            <div className={`${style.imgCenter2} ${layout.imgCenter2}`}
                style={{ backgroundImage: `url(${data.img || ''})` }} />
            <div className={style.desc} dangerouslySetInnerHTML={{ __html: data.title }} />
        </li>
    );
};