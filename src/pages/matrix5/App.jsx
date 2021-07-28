import React from 'react';
import {BasicHeader} from '@components/basicHeader';
import {BasicFooter} from '@components/basicFooter';
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from '@store/reduxMap';
import {requestGetImgTitle, requestGetPageContent} from '@api/index';
import {clipData, commonRelativeWideFn, getBrowserInfo} from '@utils/utils';
import {ScrollFixed} from '@components/scrollFixed';
import {FixedBarBox} from '@components/fixedBarBox';
import {BannerOnce} from '@components/bannerOnce';
import {GetMoreBox} from '@components/getMoreBox';
import {PopForm} from '@components/popForm';
import {MATRIX5, NAV_CAT_ID} from '@utils/constant';
import './index.less';
import {Toast} from '@components/toast';
import {PlatformFeatures} from "@components/matrix5/platformFeatures";
import {PlatformForCooperation} from "@components/matrix5/platformForCooperation";
import {AcceleratorCardCooperation} from "@components/matrix5/acceleratorCardCooperation";

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                //  Matrix 5自动驾驶计算平台特点
                platformFeaturesData: null,
                //  Matrix 5 ACP-自动驾驶计算平台合作
                platformForCooperationData: null,
                //  Matrix 5 PAC-加速卡合作
                acceleratorCardCooperationData: null,
            };
            //  页面宽度监听
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);
        }

        componentDidMount() {
            Promise.all([
                //  获取页面文案接口
                requestGetPageContent(MATRIX5.name)
                    .then(data => {
                        console.log(data);
                        //  Matrix 5自动驾驶计算平台特点
                        // platformFeaturesData: null,
                        this.setState((state) => {
                            return {
                                //  Matrix 5自动驾驶计算平台特点
                                platformFeaturesData: Object.assign({}, state.platformFeaturesData, data[0]),
                                //  Matrix 5 ACP-自动驾驶计算平台合作
                                platformForCooperationData: Object.assign({}, state.platformForCooperationData, data[1]),
                                //  Matrix 5 PAC-加速卡合作
                                acceleratorCardCooperationData: Object.assign({}, state.acceleratorCardCooperationData, data[2]),
                             };
                        });
                    }),
                //  获取图片标题接口
                requestGetImgTitle(MATRIX5.name)
                    .then(data => {
                        //  Matrix 5自动驾驶计算平台特点
                        const platformFeaturesData = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        //  Matrix 5 ACP-自动驾驶计算平台合作
                        const platformForCooperationData = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        //  Matrix 5 PAC-加速卡合作
                        const acceleratorCardCooperationData = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        console.log(data)
                        this.setState((state) => {
                            return {
                                //  荣获多项国际大奖
                                platformFeaturesData: Object.assign({}, state.platformFeaturesData, {list: platformFeaturesData}),
                                platformForCooperationData: Object.assign({}, state.platformForCooperationData, {list: platformForCooperationData}),
                                acceleratorCardCooperationData: Object.assign({}, state.acceleratorCardCooperationData, {list: acceleratorCardCooperationData}),
                            };
                        });
                    })
            ])
                .then(() => {
                    const {setComponentDidMountFinish} = this.props;
                    //  父组件初始化完成
                    setComponentDidMountFinish(true);
                });

            //            //  获取客户案例接口
            //            requestGetClientCase(119)
            //                .then(v => {
            //                    const { data } = v;
            //                    console.log('获取客户案例接口');
            //                });
        }

        render() {
            const {
                platformFeaturesData,
                platformForCooperationData,
                acceleratorCardCooperationData,
            } = this.state;
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader onceHeader={{isOnce: false}}/>
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={FixedBarBox}/>
                    <div id="m1" pc={60}/>
                    {/*banner轮播*/}
                    <BannerOnce bannerType={25}/>
                    <div id="m2" pc={60}/>
                    {/*Matrix 5自动驾驶计算平台特点.md*/}
                    <PlatformFeatures platformFeaturesData={platformFeaturesData}/>
                    {/*Matrix 5 ACP-自动驾驶计算平台合作.md*/}
                    <PlatformForCooperation platformForCooperationData={platformForCooperationData}/>
                    {/*Matrix 5 PAC-加速卡合作*/}
                    <AcceleratorCardCooperation acceleratorCardCooperationData={acceleratorCardCooperationData}/>

                    {/*更多*/}
                    <GetMoreBox/>
                    {/*表单*/}
                    <PopForm/>
                    {/*toast*/}
                    <Toast/>
                    {/*脚部*/}
                    <BasicFooter/>
                </div>
            );
        }
    }
);

