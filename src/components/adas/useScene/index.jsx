import React from 'react';
import style from './index.module.less';
import layout from '@css/layout.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

export const UseScene = ({
    useSceneData
}) => {
    useSceneData = useSceneData || {};
    let list;
    if (useSceneData.list) {
        list = useSceneData.list.map((item, index) => {
            return (
                <UseSceneItem key={index} data={item} />
            );
        });
    }
    return (
        <div className={style.useScene}>
            <div className={style.useSceneIn}>
                <BasicTitleDesc data={useSceneData} isLight={true} />
                <ul className={style.list}>
                    {list}
                </ul>
            </div>
        </div>
    );
};
//  每一项
const UseSceneItem = ({ data }) => {
    return (
        <li className={style.item}>
            <div className={`${layout.imgCenter2} ${style.imgCenter2}`}
                style={{ backgroundImage: `url(${data.img || ''})` }} />
            <p className={style.name} dangerouslySetInnerHTML={{ __html: data.title }} />
            <div className={style.desc} dangerouslySetInnerHTML={{ __html: data.desc }} />
        </li>
    );
};