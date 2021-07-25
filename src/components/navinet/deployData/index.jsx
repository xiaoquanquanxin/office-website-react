import React from 'react';
import style from './index.module.less';

export const Deploy = ({
    deployData
}) => {
    deployData = deployData || {};
    return (
        <div className={style.deploy}>
            <div className={style.deployIn}
                style={{ backgroundImage: `url(${deployData.img || ''})` }}
            >
                <div className={style.cont}>
                    <p className={style.title} dangerouslySetInnerHTML={{ __html: deployData.title }} />
                    <div className={style.desc} dangerouslySetInnerHTML={{ __html: deployData.desc }} />
                </div>
            </div>
        </div>
    );
};