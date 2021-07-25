import React from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { BannerSwiper } from '@components/bannerManage/indexBanner';
import { requestIndex } from '@api/index';
import { getBrowserInfo, navSortByRank } from '@utils/utils';
import { commonRelativeWideFn } from '@utils/utils';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { MainInfo } from '@components/index/mainInfo';
import { AdvertisementBanner } from '@components/bannerManage/advertisementBanner';
import { BlackPadding } from '@components/blackPadding';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                //  swiper
                swiperData: null,
                //  车规级 AI 芯片
                firstInfo: null,
                //  新一代底层计算平台
                secondInfo: null,
                //  智能客户
                customList: null,
            };
            // console.log(this.props.setBrowserScrollInfoFn)
            //  页面宽度监听
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);
        }

        //  钩子
        componentDidMount() {
            //  发请求，取页面数据
            requestIndex()
                .then(v => {
                    navSortByRank(v.top_banner, 'rank');
                    navSortByRank(v.middle_banner, 'rank');
                    navSortByRank(v.bottom_banner, 'rank');
                    navSortByRank(v.client, 'rank');

                    //  客户轮播
                    this.setState(() => ({
                        //  banner数据
                        swiperData: v.top_banner,
                        //  第二块
                        firstInfo: v.middle_banner && v.middle_banner[0],
                        //  第三块
                        secondInfo: v.bottom_banner && v.bottom_banner[0],
                        //  客户轮播
                        customList: v.client,
                        //  customList: v.client.concat(v.client),
                        //  customList: v.client.slice(0,12)
                    }));
                });
        }

        render() {
            const {
                swiperData,
                firstInfo,
                secondInfo,
                customList,
            } = this.state;
            return (
                <div className="App">
                    <BasicHeader onceHeader={{ isOnce: true }} />
                    {/*banner轮播*/}
                    <BannerSwiper swiperData={swiperData} />
                    {/*基本信息*/}
                    <BlackPadding color={'rgb(4 18 39)'} zIndex={1} spread={1} />
                    <MainInfo info={firstInfo} textPosition='right' />
                    <MainInfo info={secondInfo} textPosition='left' />
                    {/* <BlackPadding y={2} color={'rgb(4, 18, 39)'}/> */}
                    {/*赋能客户*/}
                    <AdvertisementBanner
                        data={customList}
                        title='赋能客户'
                        styleType={1}
                    />
                    {/*脚部*/}
                    <BasicFooter />
                </div>
            );
        }
    }
);

//  异步加载组件
//import asyncComponent from '@components/asyncComponentLoader/asyncComponentLoader';
//const BasicBanner = asyncComponent(() => import('@components/basicBanner'));

