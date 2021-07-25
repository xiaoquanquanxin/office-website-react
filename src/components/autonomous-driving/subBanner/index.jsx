import React from 'react';
import style from './index.module.less';
import layout from '@css/layout.module.less';
//  二级banner
export const SubBanner = ({
    subBannerData
}) => {
    subBannerData = subBannerData || {};
    return (
        <div className={style.sbanner}>
            <div className={style.sbannerIn}>
                <div className={`${layout.imgCenter2} ${style.imgCenter2}`}
                    style={{ backgroundImage: `url(${subBannerData.img || ''})` }}
                />
                <div className={style.titleDesc}>
                    <p className={style.title} dangerouslySetInnerHTML={{ __html: subBannerData.title }} />
                    <div className={style.desc} dangerouslySetInnerHTML={{ __html: subBannerData.desc }} />
                </div>
            </div>
        </div>
    );
};

