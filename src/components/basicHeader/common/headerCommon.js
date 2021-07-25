export const logoClick = (isHomePage) => {
    if (isHomePage) {
        return false;
    }
    window.location.href = '/index.html';
};

//  获取导航头部logo、菜单按钮信息
/**
 * @param{boolean}  menuIsFold      是收起的
 * @param{boolean}  isTop           是顶部
 * @param{boolean}  isHomePage      是首页
 * @param{boolean}  isOverHeader    鼠标浮于上方
 * */
export const GetHeaderLogoMenuInformation = (menuIsFold, isTop, isHomePage, isOverHeader) => {
    //  渲染信息
    const headerRenderInfo = {
        //  logo的src
        imageLogoSrc: null,
        //  菜单 三 的src
        imageMenuSrc: null,
        //  是滚动到顶部，并且是首页，使用的class。true:透明的,false:白色的底
        isTopAndHome: false
    };

    //  如果折叠
    if (menuIsFold) {
        //  白色收起的菜单
        headerRenderInfo.imageMenuSrc = require('@media/basicHeader/menu-white.png');
    } else {
        //  黑色展开的菜单
        headerRenderInfo.imageMenuSrc = require('@media/basicHeader/icon-close.png');
        //  如果展开， 那么样式一定是白色背景并且，菜单是文字黑色的
        isTop = false;
    }
    //  如果鼠标浮于上方，那么样式一定是白色背景并且，菜单是文字黑色的
    if (isOverHeader) {
        isTop = false;
    }
    //  如果滚动到顶部，并且是首页
    if (isTop && isHomePage) {
        //  白色logo
        headerRenderInfo.imageLogoSrc = require('@media/basicHeader/logo-white.png');
        headerRenderInfo.isTopAndHome = true;
    } else {
        //  蓝色logo
        headerRenderInfo.imageLogoSrc = require('@media/basicHeader/logo-blue.png');
        //  如果没有滚到顶部，但是导航展开，菜单应该是黑色的
        if (menuIsFold) {
            //  黑色展开菜单
            headerRenderInfo.imageMenuSrc = require('@media/basicHeader/menu-black.png');
        }
    }
    return headerRenderInfo;
};
