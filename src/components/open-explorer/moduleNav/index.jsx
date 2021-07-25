import React from 'react';
import style from './index.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

//  功能模块
export const ModuleNav = ({
    moduleNavData,
}) => {
    moduleNavData = moduleNavData || {};
    let list;
    if (moduleNavData.list) {
        list = moduleNavData.list.map((item, index) => {
            return (
                <ModuleNavItem key={index} data={item} />
            );
        });
    }
    return (
        <div className={style.moduleNav}>
            <div className={style.moduleNavIn}>
                <BasicTitleDesc data={moduleNavData} isLight={true} />
                <ul className={style.list}>
                    {list}
                </ul>
            </div>
        </div>
    );
};

//  每一项
const ModuleNavItem = ({
    data,
}) => {
    return (
        <li className={style.item}>
            <div className={style.imgBox}>
                <img src={data.img} alt='' className={style.img} />
            </div>
            <p className={style.title} dangerouslySetInnerHTML={{ __html: data.title }} />
            <div className={style.desc} dangerouslySetInnerHTML={{ __html: data.desc }} />
        </li>
    );
};