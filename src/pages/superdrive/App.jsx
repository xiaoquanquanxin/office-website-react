import React from 'react';
import {BasicHeader} from '@components/basicHeader';
import {BasicFooter} from '@components/basicFooter';
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from '@store/reduxMap';
import {
    requestGetImgTitle,
    requestGetPageContent
} from '@api';
import {
    clipData,
    commonRelativeWideFn,
    getBrowserInfo,
} from '@utils/utils';
import {BannerManage} from '@components/bannerManage';
import {ScrollFixed} from '@components/scrollFixed';
import {FixedBarBox} from '@components/fixedBarBox';
import {SUPERDRIVE, NAV_CAT_ID} from '@utils/constant';
import {GetMoreBox} from '@components/getMoreBox';
import {PopForm} from '@components/popForm';
import {Toast} from '@components/toast';
import './index.less';
import {SolutionArchitecture} from "@components/superdrive/solutionArchitecture";
import {SuperDriveSystemArchitecture} from "@components/superdrive/superDriveSystemArchitecture";
import {ManMachineCoDriving} from "@components/superdrive/manMachineCoDriving";
import {SuperDriveSubBanner} from "@components/superdrive/superDriveSubBanner";


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                //  超级驾驶二级banner
                superDriveSubBannerData: null,
                //  方案架构
                solutionArchitectureData: null,
                //  系统架构
                superDriveSystemArchitectureData: null,
                //  Horizon Matrix 超级驾驶解决方案<br/>实现全场景自动驾驶 & 人机共驾
                manMachineCoDrivingData: null,
            };
            //  页面宽度监听
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);
            const {setBarBoxAnchorList} = props;
            setBarBoxAnchorList(['概述', '架构']);
        }

        componentDidMount() {
            //  SUPERDRIVE
            Promise.all([
                //  获取页面文案接口
                requestGetPageContent(SUPERDRIVE.name)
                    .then(data => {
                        this.setState((state) => {
                            return {
                                //  方案架构
                                solutionArchitectureData: Object.assign({}, state.solutionArchitectureData, data[0]),
                                //  系统架构
                                superDriveSystemArchitectureData: Object.assign({}, state.superDriveSystemArchitectureData, data[1]),
                                //  Horizon Matrix 超级驾驶解决方案<br/>实现全场景自动驾驶 & 人机共驾
                                manMachineCoDrivingData: Object.assign({}, state.manMachineCoDrivingData, data[2]),
                            };
                        });
                    }),
                //  获取图片标题接口
                requestGetImgTitle(SUPERDRIVE.name)
                    .then(data => {
                        //  超级驾驶二级banner
                        const superDriveSubBannerData = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        //  Horizon Matrix 超级驾驶解决方案<br/>实现全场景自动驾驶 & 人机共驾
                        const manMachineCoDrivingData = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        this.setState((state) => {
                            return {
                                //  Horizon Matrix 超级驾驶解决方案<br/>实现全场景自动驾驶 & 人机共驾
                                manMachineCoDrivingData: Object.assign({}, state.manMachineCoDrivingData, {list: manMachineCoDrivingData}),
                                //  超级驾驶二级banner
                                superDriveSubBannerData: Object.assign([], state.superDriveSubBannerData, superDriveSubBannerData),
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
                superDriveSubBannerData,
                solutionArchitectureData,
                superDriveSystemArchitectureData,
                manMachineCoDrivingData,
            } = this.state;
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader onceHeader={{isOnce: false}}/>
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={FixedBarBox}/>
                    <div id="m1" pc={60} mobile={80}/>
                    {/*轮播*/}
                    <BannerManage bannerType={23}/>
                    {/*超级驾驶二级banner*/}
                    <SuperDriveSubBanner superDriveSubBannerData={superDriveSubBannerData}/>
                    <div id="m2" pc={60}/>
                    {/*方案架构*/}
                    <SolutionArchitecture solutionArchitectureData={solutionArchitectureData}/>
                    {/*系统架构*/}
                    <SuperDriveSystemArchitecture superDriveSystemArchitectureData={superDriveSystemArchitectureData}/>
                    {/*Horizon Matrix 超级驾驶解决方案<br/>实现全场景自动驾驶 & 人机共驾*/}
                    <ManMachineCoDriving manMachineCoDrivingData={manMachineCoDrivingData}/>

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

