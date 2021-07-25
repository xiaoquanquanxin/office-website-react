import React from 'react';
import style from './index.module.less';
import { DescList } from '@components/journey2/descList';

export const EdgeComputing = ({
    data,
}) => {
    if (!data) {
        return null;
    }
    if (data.content) {
        data.descList = JSON.parse(data.content);
        if (data.descList.length > 1) {
            data.descList.splice(1, 0, null);
        }
    }
    return (
        <div className={style.edgeComputing}>
            <div className={style.edgeComputingIn} style={{ backgroundImage: `url(${data.img || ''})` }}>
                <div className={style.wrap}>
                    <p className={style.title}>{data.title}</p>
                    <div className={style.desc} dangerouslySetInnerHTML={{ __html: data.desc }} />
                    <DescList data={data.descList} />
                </div>
            </div>
        </div>
    );
};