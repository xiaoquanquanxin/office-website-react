import React from 'react';
import style from './index.module.less';
import layout from '@css/layout.module.less';
import { connect } from 'react-redux';
import { mapStateToProps } from '@store/reduxMap';
import { CustomSwiper } from '@components/swiper';
import { preventDefaultFn } from '@utils/eventListener';
import './index.less';

//  合作伙伴
export const AdvertisementBanner = connect(
    mapStateToProps,
)((
    {
        //  数据
        data,
        //  标题
        title,
        //  浏览器数据
        REDUCER_BROWSER_INFO,
        //  样式类型
        styleType,
    }) => {
    const { isRelativeWide } = REDUCER_BROWSER_INFO;
    const swiperData = [];
    let portion = isRelativeWide ? 15 : 8;
    let index = 0;
    while (data && portion * (index) < data.length) {
        swiperData.push(data.slice(portion * index, portion * (1 + index)));
        index++;
    }
    let styleSheet;
    switch (styleType) {
        case 1:
            //  首页的
            styleSheet = style.index;
            break;
        case 2:
            //  天工开物
            styleSheet = style.open;
            break;
        case 3:
            //  普通合作伙伴
            styleSheet = style.partner;
            break;
        case 4:
            //  关于我们
            styleSheet = style.about;
            break;
        default:
            throw new Error(`错误的类型${styleType}`);
    }
    return (
        <div className={`${style.container} ${styleSheet}`} id='AdvertisementBanner'>
            <p className={style.title}>{title}</p>
            <CustomSwiper
                swiperData={swiperData}
                sliderItemType={2}
                basicDelay={5}
                autoHeight={false}
            />
        </div>
    );
}
);

//  swiper的每一项，本身是一个list
export const AdvertisementSlickItem = ({
    data
}) => {
    if (!data || data.length === 0) {
        return '';
    }
    const list = data.map(item => {
        return (
            <li className={style.swiperItem} key={item.id} title={item.name}>
                <img src={item.img} alt={item.name} onDragStart={(e) => { preventDefaultFn(e); }} />
            </li>
        );
    });
    return (
        <ul className={`${style.customerList} ${layout.clearfix}`}>
            {list}
        </ul>
    );
};

