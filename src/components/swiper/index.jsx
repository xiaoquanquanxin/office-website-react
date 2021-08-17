import React, {createRef} from 'react';
import {mapDispatchToProps, mapStateToProps} from '@store/reduxMap';
import {connect} from 'react-redux';
import Swiper from 'swiper';
import {resizeListener} from '@utils/eventListener';
import {FRAME_DELAY} from '@utils/constant';
import {IndexBannerSliderItem} from '@components/bannerManage/indexBanner';
import {AboutBannerSliderItem} from '@components/bannerManage/aboutBanner';
import {AdvertisementSlickItem} from '@components/bannerManage/advertisementBanner';
import {ProjectBannerSliderItem} from '@components/bannerManage/projectBanner';
import {ProductSlickItem} from '@components/bannerManage/productBanner';
import {MatrixSliderItem} from '@components/bannerManage/matrixBanner';
import {SolutionBannerSliderItem} from "@components/bannerManage/solutionBanner";
import 'swiper/dist/css/swiper.css';
import './index.less';

export const CustomSwiper = connect(
    mapStateToProps,
    mapDispatchToProps,
)(class extends React.Component {
    //  分页器组件元素
    paginRefs;
    //  swiper实例
    mySwiper;
    //  swiper组件元素
    swiperRef;
    //  定时器
    timer;

    /**
     * props：
     * swiperData:数据
     * basicDelay:默认滚动时间，这是为数据如果没有second字段准备的
     * sliderItemType:子组件类型
     * autoHeight:自动高度
     * */
    constructor(props) {
        super(props);
        this.swiperRef = createRef();
        this.paginRefs = [];
        this.mySwiper = null;
        //  定时器
        this.timer = null;
        this.state = {
            //  -1:未开始，0:开始初始化，1:初始化完成
            status: -1,
            //  真实下标
            realIndex: 0,
        };
    }

    //  初始化
    componentDidMount() {
        this.setState(() => ({
            status: 0
        }));
    }

    //  更新props数据
    componentDidUpdate(prevProps, a, b) {
        const {swiperData, REDUCER_BROWSER_INFO} = this.props;
        //  如果数据一样
        if (swiperData === prevProps.swiperData) {
            return;
        }
        //  如果没有数据
        if (swiperData.length === 0) {
            return;
        }
        //  console.log(REDUCER_BROWSER_INFO.isRelativeWide !== prevProps.REDUCER_BROWSER_INFO.isRelativeWide);
        //  console.log(REDUCER_BROWSER_INFO.isRelativeWide !== prevProps.REDUCER_BROWSER_INFO.isRelativeWide);
        if (REDUCER_BROWSER_INFO.isRelativeWide !== prevProps.REDUCER_BROWSER_INFO.isRelativeWide) {
            this.initMySwiper();
        }
        if (this.mySwiper === null) {
            this.initMySwiper();
        }
        resizeListener(() => {
            this.transform();
        });
        this.setState(() => ({
            status: 1,
        }), () => {
            this.transform();
        });
    }

    //  初始化swiper，构造函数销毁、点的数组的长度、定时器重置
    initMySwiper() {
        const {swiperData, autoHeight} = this.props;
        if (this.mySwiper) {
            this.mySwiper.destroy();
            this.paginRefs.length = 0;
            clearTimeout(this.timer);
            this.timer = null;
        }
        if (swiperData.length < 2) {
            return;
        }
        this.mySwiper = new Swiper(this.swiperRef.current, {
            autoplay: {
                delay: 100000000,
            },
            //  ✨自动高度
            autoHeight: autoHeight,
            loop: true,
            on: {
                slideChangeTransitionStart: () => {
                    this.transform();
                },
            }
        });
        //  创建多个paginer分页器所用的ref
        for (let i = 0; i < swiperData.length; i++) {
            this.paginRefs.push(createRef());
        }
    }

    //  分页计时器变换
    transform() {
        const {status} = this.state;
        if (status !== 1) {
            return;
        }
        if (this.paginRefs.length === 0) {
            return;
        }
        const {swiperData, basicDelay} = this.props;
        const {realIndex} = this.mySwiper;

        //  激活的i元素
        const activeElement = this.paginRefs[realIndex].current;
        //  必须有激活元素，否则是一个轮播图    todo 重要
        if (activeElement === null) {
            return;
        }

        if (this.timer) {
            clearTimeout(this.timer);
        }
        //  延迟时间
        const second = swiperData[realIndex].second || basicDelay;
        //  console.log('延迟时间：s', second);
        //  console.log('真实下标', realIndex);
        //  延迟次数
        const fullTime = second * 1000 / FRAME_DELAY;

        //  最开始的i的宽度所需执行次数
        let i = (fullTime * 12.5 / 100) | 0;
        const fn = () => {
            this.timer = setTimeout(() => {
                if (i >= fullTime) {
                    clearTimeout(this.timer);
                    this.timer = null;
                    //  播放下一个
                    this.mySwiper.slideNext();
                    return;
                }
                //  console.log('定时器');
                //  i的宽度 = 执行次数 / 总需执行次数
                this.setActiveClassName(activeElement, i / fullTime);
                i++;
                fn();
            }, FRAME_DELAY * 1);
        };
        fn();
        //  console.log('swiper的transform执行执行');
        this.paginRefs.forEach(item => {
            this.removeActiveClassName(item.current);
        });
        this.setActiveClassName(activeElement, i / fullTime);
    }

    //  激活类型的class
    setActiveClassName(activeElement, width) {
        if (!activeElement) {
            return;
        }
        activeElement.classList.add('active-pagination');
        activeElement.querySelector('i').style.width = `${width * 100}%`;
    }

    removeActiveClassName(activeElement) {
        if (!activeElement) {
            return;
        }
        activeElement.classList.remove('active-pagination');
        activeElement.querySelector('i').style.width = '0';
    }

    render() {
        const {swiperData, sliderItemType} = this.props;
        let SliderItem = null;
        switch (sliderItemType) {
            case 1: //  首页banner
                SliderItem = IndexBannerSliderItem;
                break;
            case 2: //  首页的赋能客户
                SliderItem = AdvertisementSlickItem;
                break;
            case 3: //  新闻中心、关于我们
                SliderItem = AboutBannerSliderItem;
                break;
            case 4: //  核心技术、天工开物、自动驾驶
                SliderItem = ProjectBannerSliderItem;
                break;
            case 5: //  征程、旭日2、旭日3
                SliderItem = ProductSlickItem;
                break;
            case 6: //  matrix
                SliderItem = MatrixSliderItem;
                break;
            case 7: //  解决方案下的全部
                SliderItem = SolutionBannerSliderItem;
                break;
            default:
                throw new Error('错误的类型，没有这种类sliderItem');
        }
        return (
            <div className={`swiper-container`} ref={this.swiperRef}>
                <div className="swiper-wrapper">
                    {(
                        swiperData
                        && swiperData.length
                        && swiperData.map(
                            (item, index) => {
                                return (
                                    <div key={item.id || index} className="swiper-slide">
                                        <SliderItem data={item}/>
                                    </div>
                                );
                            })
                    ) || ''}
                </div>
                {swiperData && swiperData.length > 1 &&
                <div className={`swiper-pagination-custom`}>
                    {
                        swiperData.map(
                            (item, index) => {
                                return (
                                    <span key={item.id || index} ref={this.paginRefs[index]}><i/></span>
                                );
                            })
                    }
                </div>
                }
            </div>
        );
    }
});
