import React from 'react';
import style from './index.module.less';
import layout from '@css/layout.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

//  产品配置
export const ProductSetting = ({
    productSettingData
}) => {
    productSettingData = productSettingData || {};
    let content;
    if (productSettingData.content) {
        content = JSON.parse(productSettingData.content);
    }

    return (
        <div className={style.productSetting}>
            <div className={style.productSettingIn}>
                <BasicTitleDesc data={productSettingData} widthType={275} />
                <div className={style.imgDesc}>
                    <div className={`${style.imgCenter2} ${layout.imgCenter2}`}
                        style={{ backgroundImage: `url(${productSettingData.img || ''})` }}
                    />
                    <DescList content={content} />
                </div>
            </div>
        </div>
    );
};

//  表格
const DescList = ({ content }) => {
    if (!content) {
        return '';
    }
    const { data, labList } = content;
    const list = data.map((item, index) => {
        const tdList = labList.map((_item, _index) => {
            return (
                <td className={style.td} key={_index}>
                    <s className={item[_item.value] ? style.tick : style.hLine} />
                </td>
            );
        });
        return (
            <tr key={index}>
                <td className={`${style.firstTh} ${style.td}`}>
                    <span className={style.span} dangerouslySetInnerHTML={{ __html: item.name }} />
                </td>
                {tdList}
            </tr>
        );
    });

    const labListComponent = labList.map((item, index) => {
        return (
            <th className={style.td}
                key={index}
                dangerouslySetInnerHTML={{ __html: item.name }}
            />
        );
    });
    return (
        <div className={style.descList}>
            <table className={style.table}>
                <tbody>
                    <tr className={style.firstTr}>
                        <th className={`${style.firstTh} ${style.td}`} />
                        {labListComponent}
                    </tr>
                    <tr>
                        <td colSpan="4" className={style.noline}>
                            <div className="line" />
                        </td>
                    </tr>
                    {list}
                </tbody>
            </table>
        </div>
    );
};