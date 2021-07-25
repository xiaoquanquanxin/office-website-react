import React from 'react';
import style from './index.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

//  赋能模式
export const EnablingMode = ({
    enablingModeData
}) => {
    enablingModeData = enablingModeData || {};
    let list;
    if (enablingModeData.content) {
        list = enablingModeData.content.map((item, index) => {
            return (
                <ListItem data={item} key={index} />
            );
        });
    }
    return (
        <div className={style.enablingMode}>
            <BasicTitleDesc data={enablingModeData} isLight={true} />
            <div className={style.enablingModeIn} >
                <img src={enablingModeData.img} alt="" />
                <ul className={style.list}>{list}</ul>
            </div>
        </div>
    );
};

const ListItem = ({ data }) => {
    return (
        <li className={style.item}>
            <p className={style.name} dangerouslySetInnerHTML={{ __html: data.title }} />
            <div className={style.desc} dangerouslySetInnerHTML={{ __html: data.desc }} />
        </li>
    );
};
