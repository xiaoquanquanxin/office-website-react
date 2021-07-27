import React from 'react';
import {BasicHeader} from '@components/basicHeader';
import {BasicFooter} from '@components/basicFooter';
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from '@store/reduxMap';
import {
    requestGetClientCase,
    requestGetImgTitle,
    requestGetPageContent
} from '@api';
import {
    clipData,
    commonRelativeWideFn,
    getBrowserInfo,
    setListJSONData
} from '@utils/utils';
import {BannerManage} from '@components/bannerManage';
import {ScrollFixed} from '@components/scrollFixed';
import {FixedBarBox} from '@components/fixedBarBox';
import {OMNI, NAV_CAT_ID} from '@utils/constant';
import {CustomerCase} from '@components/CustomerCase';
import {FourBlocks} from '@components/fourBlocks';
import {JourneyAlgorithm} from '@components/adas/journeyAlgorithm';
import {VideoWrap} from '@components/video';
import {GetMoreBox} from '@components/getMoreBox';
import {PopForm} from '@components/popForm';
import {Toast} from '@components/toast';
import './index.less';
import {HigherLevelAutoDriving} from '@components/omni/higherLevelAutoDriving';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                //  四个一块的
                cdrbData: null,
                //  车路协同路侧视觉感知算法
                jAData: null,
                //  客户案例
                customerCaseData: null,

                //  Horizon Omni 赋能更高级别自动驾驶
                higherLevelAutoDrivingData: null,
            };
            //  页面宽度监听
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);
            const {setBarBoxAnchorList} = props;
            setBarBoxAnchorList(['概述', '客户案例']);
        }

        componentDidMount() {
            //  OMNI
            Promise.all([
                //  获取页面文案接口
                requestGetPageContent(OMNI.name)
                    .then(data => {
                        setListJSONData(data[0]);
                        setListJSONData(data[1]);
                        console.log(data[2])
                        this.setState((state) => {
                            return {
                                //  车路协同路侧视觉感知算法
                                jAData: Object.assign({}, state.jAData, data[0]),
                                //  Horizon Omni 赋能更高级别自动驾驶
                                higherLevelAutoDrivingData: Object.assign({}, data[1]),
                                //  客户案例
                                customerCaseData: Object.assign({}, state.customerCaseData, data[2]),
                            };
                        });
                    }),
                //  获取图片标题接口
                requestGetImgTitle(OMNI.name)
                    .then(data => {
                        //  四个一块的
                        const cdrbData = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        this.setState((state) => {
                            return {
                                //  四个一块的
                                cdrbData: Object.assign([], state.cdrbData, cdrbData),
                            };
                        });

                    }),
                //  客户案例
                requestGetClientCase(OMNI.type)
                    .then(data => {
                        this.setState((state) => {
                            return {
                                customerCaseData: Object.assign({}, state.customerCaseData, {list: data})
                            };
                        });

                    }),
            ])
                .then(() => {
                    const {setComponentDidMountFinish} = this.props;
                    //  父组件初始化完成
                    setComponentDidMountFinish(true);
                    //    console.log('setState结果是🍎', this.state);
                });
        }

        render() {
            const {
                cdrbData,
                customerCaseData,
                jAData,
                higherLevelAutoDrivingData,
            } = this.state;
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader onceHeader={{isOnce: false}}/>
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={FixedBarBox}/>
                    <div id="m1" pc={60} mobile={80}/>
                    {/*轮播*/}
                    {/*todo 发请求的id*/}
                    <BannerManage bannerType={13}/>
                    {/*四个一块*/}
                    <FourBlocks data={cdrbData} isLight={true}/>
                    {/*车路协同路侧视觉感知算法*/}
                    <JourneyAlgorithm jAData={jAData}/>
                    {/*Horizon Omni 赋能更高级别自动驾驶*/}
                    <HigherLevelAutoDriving higherLevelAutoDrivingData={higherLevelAutoDrivingData}/>
                    <div id="m2" pc={60}/>
                    {/*客户案例*/}
                    <CustomerCase customerCaseData={customerCaseData}/>
                    {/*视频本身*/}
                    <VideoWrap/>
                    {/*更多*/}
                    <GetMoreBox isGrey={true}/>
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

