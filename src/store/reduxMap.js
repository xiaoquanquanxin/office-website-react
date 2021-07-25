import { setBrowserScrollInfo, setRelativeWide } from '@store/browserInfo';
import { setTabBoxActiveIndex, setNewsCategoryData, newsCategoryDataForMap } from '@store/newsInfo';
import { setAboutUsMapOpenIndex, setAboutUsMapActiveAreaId, setComponentDidMountFinish } from '@store/aboutUs';
import { setVideoOpenStatus } from '@store/video';
import { setPopFormOpenStatus, setToastStatus } from '@store/popForm';
import { originBarBoxAnchorList, setBarBoxAnchorList, setBarBoxData } from '@store/fixedTabBox';
import { setNavListData } from '@store/header';
import { setProjectBanner } from '@store/banner';

//  指定如何把当前 Redux store state 映射到展示组件的 props 中
//  ✅读取state到props
export const mapStateToProps = ({
    //  浏览器信息
    REDUCER_BROWSER_INFO,
    //  新闻页面
    REDUCER_NEWS_TAB_BOX,
    //  关于我的，主要是地图
    REDUCER_ABOUT_US_MAP,
    //  视频播放器
    REDUCER_VIDEO,
    //  form表单
    REDUCER_POP_FORM,
    //  固定定位的导航
    REDUCER_FIXED_TAB_BOX,
    //  头部数据
    REDUCER_HEADER_DATA,
    //  banner样式
    REDUCER_BANNER_INFO,
}) => {
    return {
        REDUCER_BROWSER_INFO,
        REDUCER_NEWS_TAB_BOX,
        REDUCER_ABOUT_US_MAP,
        REDUCER_VIDEO,
        REDUCER_POP_FORM,
        REDUCER_FIXED_TAB_BOX,
        REDUCER_HEADER_DATA,
        REDUCER_BANNER_INFO
    };
};

//  触发
//  除了读取 state，容器组件还能分发 action。
//  类似的方式，可以定义 mapDispatchToProps() 方法接收 dispatch() 方法并返回期望注入到展示组件的 props 中的回调方法
//  ✅通过dispatch触发action到原始的state
export const mapDispatchToProps = (dispatch) => {
    return {
        //  设置浏览器宽度是否>750
        setRelativeWideFn: (bool) => {
            dispatch(setRelativeWide(bool));
        },
        //  设置浏览器信息
        setBrowserScrollInfoFn: (info) => {
            const { scrollLeft, scrollTop } = info;
            dispatch(setBrowserScrollInfo(scrollLeft, scrollTop));
        },
        //  设置关于我们页面的 activeIndex，选中的哪一个
        setTabBoxActiveIndex: (activeIndex) => {
            dispatch(setTabBoxActiveIndex(activeIndex));
        },
        //  设置新闻菜单数据
        setNewsCategoryData: (newsCategoryData) => {
            dispatch(setNewsCategoryData(newsCategoryData));
            const mapData = {};
            newsCategoryData.forEach(item => {
                mapData[item.id] = item;
            });
            dispatch(newsCategoryDataForMap(mapData));
        },

        //  关于我的，地图相关
        setAboutUsMapOpenIndex: (openIndex) => {
            dispatch(setAboutUsMapOpenIndex(openIndex));
        },
        //  同上
        setAboutUsMapActiveAreaId: (activeAreaId, activeAreaName) => {
            dispatch(setAboutUsMapActiveAreaId(activeAreaId, activeAreaName));
        },
        //  组件初始化完成
        setComponentDidMountFinish: (componentDidMountFinish) => {
            dispatch(setComponentDidMountFinish(componentDidMountFinish));
        },
        //  是否打开播放器
        setVideoOpenStatus: (videoIsOpen, videoSrc) => {
            videoSrc = videoSrc || '';
            dispatch(setVideoOpenStatus(videoIsOpen, videoSrc));
            setTimeout(() => {
                const mainVideo = document.querySelector('#mainVideo');
                if (mainVideo) {
                    mainVideo.play();
                }
            }, 1000);
        },
        //  是否打开form表单
        setPopFormOpenStatus: (popFormIsOpen) => {
            dispatch(setPopFormOpenStatus(popFormIsOpen));
        },
        //  是否打开toast
        setToastStatus: (toastStatus, isSuccess) => {
            //  如果是打开，那么3s后关闭
            if (toastStatus) {
                setTimeout(() => {
                    dispatch(setToastStatus(!toastStatus, isSuccess));
                }, 3000);
            }
            dispatch(setToastStatus(toastStatus, isSuccess));
        },
        //  设置fixedBarBox相关
        setBarBoxAnchorList: (barBoxAnchorList) => {
            const list = Object.assign([], originBarBoxAnchorList);
            list.forEach((item, index) => {
                item.name = barBoxAnchorList[index];
            });
            dispatch(setBarBoxAnchorList(list));
        },
        setBarBoxData: (barBoxData) => {
            dispatch(setBarBoxData(barBoxData));
        },
        //  设置头部数据
        setNavListData: (navListData) => {
            dispatch(setNavListData(navListData));
        },
        //  设置产品banner信息
        setProjectBanner: (projectBannerStyle) => {
            dispatch(setProjectBanner(projectBannerStyle));
        }
    };
};

