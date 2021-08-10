import React from 'react';
import style from './index.module.less';
import layout from '@css/layout.module.less';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import webfontloader from "webfontloader";

//  每一项
const MenuListItem = ({
    //  是激活状态
    isActive,
    //  文字
    content,
    //  链接
    href,
    //  打开方式
    target,
    //  子元素，子路由
    subList,
}) => {
    return (
        <li
            className={`${isActive ? style.activeColor : ''} ${style.menuListItem}`}
            onClick={() => sessionStorage.setItem('menu-click', '1')}
        >
            <a href={href} target={target}>{content}</a>
            {subList ? <NavLevel2 subList={subList} /> : ''}
        </li>
    );
};

//  二级目录
const NavLevel2 = ({
    subList
}) => {
    const list = subList.map((item) => {
        return (
            <dd
                key={item.id} className={item.isActive ? style.navLevel2Active : ''}
                onClick={() => sessionStorage.setItem('menu-click', '1')}
            >
                <a href={item.url} target={item.target}>{item.name}</a>
                {item.son ? <NavLevel3 lowestList={item.son} /> : ''}
            </dd>
        );
    });
    return (
        <dl className={style.navLevel2}>
            {list}
        </dl>
    );
};

//  三级目录
const NavLevel3 = ({
    lowestList
}) => {
    const list = lowestList.map((item) => {
        return (
            <dd
                key={item.id} className={item.isActive ? style.navLevel3Active : ''}
                onClick={() => sessionStorage.setItem('menu-click', '1')}
            >
                <a href={item.url} target={item.target} dangerouslySetInnerHTML={{__html: item.name}} />
            </dd>
        );
    });
    return (
        <dl className={style.navLevel3}>
            {list}
        </dl>
    );
};

//  主菜单
export const MenuPC = connect(
    mapStateToProps,
    mapDispatchToProps
)(
    ({
        //  激活了哪一个路由 index2
        isTopAndHome,
        REDUCER_HEADER_DATA,
    }) => {
        const { navListData } = REDUCER_HEADER_DATA;
        if (!navListData || !navListData.length) {
            return '';
        }
        //  字体异步加载
        webfontloader.load({
            custom: {
                families: ['PingFang SC Medium'],
                urls: ['/font.css']
            },
            timeout: 10000000
        });
        const list = navListData.map((item) => {
            return (
                <MenuListItem
                    isActive={item.isActive}
                    key={item.id}
                    content={item.name}
                    href={item.url}
                    target={item.is_out ? '_blank' : '_self'}
                    subList={item.son}
                />
            );
        });
        return (
            <ul className={`${style.menuPC} ${layout.clearfix} ${isTopAndHome ? style.isTopAndHome : ''}`}>
                {list}
            </ul>
        );
    }
);