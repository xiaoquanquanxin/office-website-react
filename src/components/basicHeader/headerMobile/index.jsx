import React from 'react';
import { logoClick, GetHeaderLogoMenuInformation } from '../common/headerCommon';
import { MenuMobile } from '@components/basicHeader/menuMobile';
import style from './index.module.less';
import layout from '@css/layout.module.less';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
//  移动端头部渲染
export const HeaderMobile = connect(
    mapStateToProps,
    mapDispatchToProps
)((
    ({
        //  菜单是否展开
        menuIsFold,
        //  是否为首页
        isHomePage,
        //  展开的一级菜单的index - 移动端
        primaryIndex,
        //  展开的二级菜单的index - 移动端
        secondaryIndex,
        //  一级菜单点击事件
        primaryMenuClick,
        //  次级菜单点击事件
        secondaryMenuClick,
        //  菜单展开点击事件
        menuFoldClick,
        //  浏览器滚动信息
        REDUCER_BROWSER_INFO,
    }) => {
        const { scrollTop } = REDUCER_BROWSER_INFO;
        //  如果需要永久展开菜单
        //  menuIsFold = false;
        //  渲染信息
        const headerRenderInfo = GetHeaderLogoMenuInformation(menuIsFold, scrollTop <= 0, isHomePage, false);
        return (
            <header className={style.basicHeader}>
                <div className={`${style.basicHeaderWrap} ${headerRenderInfo.isTopAndHome ? style.isTopAndHome : ''}`}
                    style={isHomePage ? { position: 'fixed' } : { position: 'relative' }}
                >
                    {/*logo*/}
                    <img className={`${style.basicHeaderLogo} ${layout.inlineBlock}`}
                        src={headerRenderInfo.imageLogoSrc}
                        onClick={() => (logoClick(isHomePage))}
                        alt="地平线头部logo" />
                    {/*菜单按钮*/}
                    <img className={style.basicHeaderMenu}
                        onClick={() => (menuFoldClick(menuIsFold))}
                        src={headerRenderInfo.imageMenuSrc}
                        alt="地平线菜单图标" />
                    {/*菜单*/}
                    <MenuMobile
                        menuIsFold={menuIsFold}
                        primaryIndex={primaryIndex}
                        secondaryIndex={secondaryIndex}
                        primaryMenuClick={primaryMenuClick}
                        secondaryMenuClick={secondaryMenuClick}
                    />
                </div>
            </header>
        );
    }
));




