import React from 'react';
import { transformDateType } from '@utils/utils';
import style from './index.module.less';

//  右侧列表相关文章
export const RelativeArticle = ({
    relateList
}) => {
    if (!relateList || !relateList.length) {
        return '';
    }
    const relativeArticleList = relateList.map(item => {
        return (
            <RelativeArticleItem key={item.id} data={item} />
        );
    });
    return (
        <dl className={style.relativeListBox}>
            <dt className={style.relativeTitle}>相关文章</dt>
            {relativeArticleList}
        </dl>

    );
};
//  每一项
const RelativeArticleItem = ({ data }) => {
    return (
        <dd className={style.relativeItem}>
            <a href={`./news-detail.html?id=${data.id}`} className={style.relativeItemInner}>
                <div className={style.imgBox} style={{ background: `no-repeat center / cover url(${data.thumb || ''})` }}>
                    {/* <img src={data.thumb} className={style.img} alt=''/> */}
                </div>
                <div className={style.contentBox}>
                    <p className={style.title}>{data.title}</p>
                    <p className={style.date}>{transformDateType(data.publish_date)}</p>
                </div>
            </a>
        </dd>
    );
};