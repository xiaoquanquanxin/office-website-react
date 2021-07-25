import React from 'react';
import style from './index.module.less';
//  箭头
import arrowsSrc from '@media/basicHeader/icon-arrow-black.png';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
//  每一项
const MenuListItem = ({
    //  数据
    data,
    //  索引
    index,
    //  是否由事件激活
    isEventActive,
    //  展开的二级菜单的index - 移动端
    secondaryIndex,
    //  一级菜单点击事件
    primaryMenuClick,
    //  次级菜单点击事件
    secondaryMenuClick,
}) => {
    let arrowsElements = null;
    let subListElements = null;
    //  有二级列表
    if (data.son) {
        arrowsElements = <img src={arrowsSrc} alt="箭头"
            className={`${style.arrows} ${isEventActive ? style.upsideDown : ''}`}
            onClick={() => (primaryMenuClick(index))} />;
        if (isEventActive) {
            subListElements = <NavLevel2
                subList={data.son}
                secondaryMenuClick={secondaryMenuClick}
                secondaryIndex={secondaryIndex}
            />;
        }
    }
    return (
        <li className={`${(isEventActive || data.isActive) ? style.activeColor : ''} ${style.menuListItem}`}>
            <a href={data.url}
                target={data.is_out ? '_blank' : '_self'}
                onClick={() => (primaryMenuClick(index))}
            >{data.name}</a>
            {arrowsElements}
            {subListElements}
        </li>
    );
};

//  二级菜单
const NavLevel2 = ({
    //  展开的二级菜单的index - 移动端
    secondaryIndex,
    //  数据
    subList,
    //  次级菜单点击事件
    secondaryMenuClick,
}) => {
    const list = subList.map((item, index) => {
        let arrowsElements = null;
        let subListElements = null;
        //  是事件激活
        const isEventActive = secondaryIndex === index;
        if (item.son) {
            arrowsElements = <img src={arrowsSrc} alt="箭头"
                className={`${style.arrows} ${isEventActive ? style.upsideDown : ''}`}
                onClick={() => (secondaryMenuClick(index))} />;
            if (isEventActive) {
                subListElements = <NavLevel3 lowestList={item.son} />;
            }
        }
        if (item.isActive) {
            //  console.log('激活的二级', item);
        }
        return (
            <dd key={item.id} className={(item.isActive || isEventActive) ? style.navLevel2Active : ''}>
                <a href={item.url}
                    target={item.target}
                    onClick={() => (secondaryMenuClick(index))}>{item.name}</a>
                {arrowsElements}
                {subListElements}
            </dd>
        );
    });
    return (
        <dl className={style.navLevel2}>
            {list}
        </dl>
    );
};

//  三级菜单
const NavLevel3 = ({
    lowestList
}) => {
    const list = lowestList.map((item) => {
        return (
            <dd key={item.id} className={item.isActive ? style.navLevel3Active : ''}>
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
export const MenuMobile = connect(
    mapStateToProps,
    mapDispatchToProps
)(
    ({
        //  是折叠
        menuIsFold,
        //  展开的一级菜单的index - 移动端
        primaryIndex,
        //  展开的二级菜单的index - 移动端
        secondaryIndex,
        //  一级菜单点击事件
        primaryMenuClick,
        //  次级菜单点击事件
        secondaryMenuClick,
        REDUCER_HEADER_DATA,
    }) => {
        const { navListData } = REDUCER_HEADER_DATA;
        if (!navListData || !navListData.length) {
            return '';
        }
        const list = navListData.map((item, index) => (
            <MenuListItem
                key={item.id}
                data={item}
                index={index}
                isEventActive={primaryIndex === index}
                secondaryIndex={secondaryIndex}
                primaryMenuClick={primaryMenuClick}
                secondaryMenuClick={secondaryMenuClick}
            />
        ));

        return (
            //  如果窄屏展开，或者宽屏
            <ul className={`${style.menuMobile} ${!menuIsFold ? style.menuListShow : ''}`}>
                {list}
            </ul>
        );
    }
);

