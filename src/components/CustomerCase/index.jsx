import React from 'react';
import style from './index.module.less';
import layout from '@css/layout.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';
//  高级别辅助驾驶-客户案例
export const CustomerCase = ({
    customerCaseData,
    bgc,
}) => {
    customerCaseData = customerCaseData || {};
    let list;
    if (customerCaseData.list) {
        list = customerCaseData.list.map((item, index) => {
            return (
                <CustomerCaseItem key={index} data={item} />
            );
        });
    }
    const styleObj = {};
    if (bgc) {
        styleObj.backgroundColor = bgc;
    }
    return (
        <div className={style.customerCase} style={styleObj}>
            <div className={style.customerCaseIn}>
                <BasicTitleDesc data={customerCaseData} isLight={true} />
                <ul className={style.list}>
                    {list}
                </ul>
            </div>
        </div>
    );
};

//  每一项
const CustomerCaseItem = ({ data }) => {
    return (
        <li className={style.item}>
            <div className={`${layout.imgCenter2} ${style.imgCenter2}`}>
                <img src={data.img} alt="" />
            </div>
            <div className={style.titleDescAuthor}>
                <p className={style.title} dangerouslySetInnerHTML={{ __html: data.title }} />
                <div className={style.desc} dangerouslySetInnerHTML={{ __html: data.desc }} />
                <div className={style.author} dangerouslySetInnerHTML={{ __html: data.title2 }} />
            </div>
        </li>
    );
};