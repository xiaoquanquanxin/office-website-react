import React from 'react';
import style from './index.module.less';
import layout from '@css/layout.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

//  产品亮点
export const ProductHighlights = ({
    phData
}) => {
    phData = phData || {};
    const { phList, highLightsImgs } = phData;
    let phListComponent;
    let hLIComponent;
    if (phList) {
        phListComponent = phList.map((item, index) => {
            return (
                <PhItem key={index} data={item} />
            );
        });
        hLIComponent = highLightsImgs.map((item, index) => {
            return (
                <HIItem key={index} data={item} />
            );
        });
    }
    return (
        <div>
            <div className={style.prodHighLights}>
                <div className={style.prodHighLightsIn}>
                    <BasicTitleDesc data={{ title: '产品亮点' }} isLight={true} />
                    <ul className={style.phList}>
                        {phListComponent}
                    </ul>
                </div>
            </div>
            <div className={style.highLightsImgs}>
                {hLIComponent}
            </div>
        </div>
    );
};

const PhItem = ({ data }) => {
    return (
        <li className={style.phItem}>
            <img src={data.img} className={style.phItemImg} alt='' />
            <div className={style.nameDesc}>
                <div className={style.name} dangerouslySetInnerHTML={{ __html: data.title }} />
                <div className={style.desc} dangerouslySetInnerHTML={{ __html: data.desc }} />
            </div>
        </li>
    );
};
const HIItem = ({ data }) => {
    return (
        <div className={`${layout.imgCenter2} ${style.imgCenter2}`}
            style={{ backgroundImage: `url(${data.img || ''})` }}
        >
            <div className={style.titleDesc}>
                <p className={style.title} dangerouslySetInnerHTML={{ __html: data.title }} />
                <div className={style.desc} dangerouslySetInnerHTML={{ __html: data.desc }} />
            </div>
        </div>
    );
};