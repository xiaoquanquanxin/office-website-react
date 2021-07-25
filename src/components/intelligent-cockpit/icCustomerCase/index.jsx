import React from 'react';
import style from './index.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

//  智能座舱-客户案例
export const IcCustomerCase = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
        };
        this.mouseOver.bind(this);
    }

    mouseOver(activeIndex) {
        this.setState(() => {
            return {
                activeIndex,
            };
        });
    }

    render() {
        const customerCaseData = this.props.customerCaseData || {};
        const { activeIndex } = this.state;
        let itemBoxList;
        let labelList;
        //  主数据
        //  customerCaseData
        //  小logo
        //  customerCaseData.descList
        if (customerCaseData.list && customerCaseData.descList) {
            itemBoxList = customerCaseData.list.map((item, index) => {
                return (
                    <ICCItem key={index}
                        data={item}
                        isActive={activeIndex === index}
                        descListItem={index === 0 ? customerCaseData.descList : null}
                    />
                );
            });
            labelList = customerCaseData.list.map((item, index) => {
                return (
                    <dd key={index}
                        className={`${style.dd} ${activeIndex === index ? style.active : ''}`}
                        onMouseOver={() => { this.mouseOver(index); }}
                        dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                );
            });
        }
        //  console.log(customerCaseData);
        return (
            <div className={style.customerCase}>
                <div className={style.customerCaseIn}>
                    <BasicTitleDesc data={customerCaseData} isLight={true} />
                    <dl className={style.dl}>
                        {labelList}
                    </dl>
                    <div className={style.itemBox}>
                        {itemBoxList}
                    </div>
                    <div className={style.itemBox2}>
                        <div className={style.itemBoxs}>
                            {itemBoxList}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const ICCItem = ({
    //  基础数据
    data,
    //  激活的index
    isActive,
    //  详细数据下方的
    descListItem
}) => {
    let descList;
    if (descListItem && descListItem.length) {
        const len = descListItem.length;
        descList = descListItem.map((item, index) => {
            return (
                <DescItem key={index} data={item}
                    lastOddOrEven={!!(index === (len - 1) && (len % 2)) || ((index === (len - 1) || index === (len - 2)) && !(len % 2))}
                />
            );
        });
    }
    return (
        <div className={`${style.iccItem} ${isActive ? style.active : ''}`}>
            {/* style={isActive ? { display: 'block', } : {}} */}
            <div className={style.desc} dangerouslySetInnerHTML={{ __html: data.desc }} />
            <img className={style.img} src={data.img} alt='' />
            <ul className={style.descList}>
                {descList}
            </ul>
        </div>
    );
};

const DescItem = ({ data, lastOddOrEven }) => {
    return (
        <li className={`${style.descItem} ${lastOddOrEven ? style.lastOddOrEven : ''}`}>
            <img className={style.descImg} src={data.img} alt='' />
            <p className={style.name} dangerouslySetInnerHTML={{ __html: data.title }} />
            <div className={style.sdesc} dangerouslySetInnerHTML={{ __html: data.desc }} />
        </li>
    );
};