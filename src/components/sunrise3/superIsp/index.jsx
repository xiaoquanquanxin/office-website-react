import React from 'react';
import style from './index.module.less';
import { RobotoCondensed, RobotoCondensedLine } from '@components/sunrise3/robotoCondensed';

export const SuperIsp = ({
    superIspData
}) => {
    superIspData = superIspData || {};
    let list;
    if (superIspData.content) {
        list = superIspData.content.map((item, index) => {
            if (index > 0 && index % 2) {
                return (
                    <RobotoCondensedLine key={index} />
                );
            }
            return (
                <RobotoCondensed data={item} key={index} />
            );
        });
    }
    return (
        <div className={style.superIsp}>
            <div className={style.superIspIn}>
                <img className={style.img} src={superIspData.img || ''} alt='' />
                <div className={style.descText}>
                    <p className={style.title} dangerouslySetInnerHTML={{ __html: superIspData.title }} />
                    <div className={style.desc} dangerouslySetInnerHTML={{ __html: superIspData.desc }} />
                    <ul className={style.sTitle}>
                        {list}
                    </ul>
                </div>
            </div>
        </div>
    );
};