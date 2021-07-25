import React from 'react';
import style from './index.module.less';

export const AboutUsBasic = ({
    aboutUsInfo
}) => {
    return (
        <div className={style.aboutUsBanner}>
            <div className={style.aboutUs} dangerouslySetInnerHTML={{ __html: aboutUsInfo && aboutUsInfo.desc }} />
            <div className={style.aboutUsImgWrap}>
                <img className={style.img} src={aboutUsInfo && aboutUsInfo.img} alt='' />
                <div className={style.text} dangerouslySetInnerHTML={{ __html: aboutUsInfo && aboutUsInfo.content }} />
                {/* <div className={style.text}>
                    <p className={style.horizonName}>
                        <span>地平线 ( Horizon Robotics )</span>
                        致力于成为边缘人工智能芯片的全球领导者，
                    </p>
                </div> */}
            </div>
        </div>
    );
};