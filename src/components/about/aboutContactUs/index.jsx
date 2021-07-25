import React from 'react';

import style from './index.module.less';

//  联系我们
export const AboutContactUs = ({
    contactInfo,
}) => {
    let list;
    if (contactInfo && contactInfo.length) {
        list = contactInfo.map(item => {
            return (
                <AboutContactUsItem data={item} key={item.id} />
            );
        });
    }
    return (
        <div className={style.contact}>
            <div className={style.contactInner}>
                <div className={style.title}>联系我们</div>
                <ul className={style.list}>
                    {list}
                </ul>
            </div>
        </div>
    );
};

//  每一项
const AboutContactUsItem = ({
    data
}) => {
    return (
        <li className={style.item}>
            <p className={style.name}>{data.title}</p>
            <div className={style.content}>{data.content}</div>
        </li>
    );
};
