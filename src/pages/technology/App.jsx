import React from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { requestGetImgTitle, requestGetPageContent } from '@api/index';
import { clipData, commonRelativeWideFn, getBrowserInfo } from '@utils/utils';
import { BannerManage } from '@components/bannerManage';
import { TechnologyVideo } from '@components/technology/technologyVideo';
import { VideoWrap } from '@components/video';
import { Bpu } from '@components/technology/bpu';
import { TechnologyPerformance } from '@components/technology/performance';
import { MAPS } from '@components/technology/MAPS';
import { XinPeriod } from '@components/technology/xinPeriod';
import { NAV_CAT_ID, TECHNOLOGY } from '@utils/constant';
import { BlackPadding } from '@components/blackPadding';
import './index.less';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                //  为实际场景而生的 BPU 架构
                bpuData: null,
                //  AI 芯片真实性能远超对手
                performanceData: null,
                //  关于 MAPS 评估方式
                mapsData: null,
                //  持续攀登 引领 AI “芯” 时代
                xinPeriodData: null,
            };
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);
        }

        componentDidMount() {
            Promise.all([
                //  获取页面文案接口
                requestGetPageContent(TECHNOLOGY.name)
                    .then(data => {
                        this.setState((state) => {
                            return {
                                //  为实际场景而生的 BPU 架构
                                bpuData: Object.assign({}, state.bpuData, data[0]),
                                //  AI 芯片真实性能远超对手
                                performanceData: Object.assign({}, state.bpuData, data[1]),
                                //  关于 MAPS 评估方式
                                mapsData: Object.assign({}, state.mapsData, data[2]),
                                //  持续攀登 引领 AI “芯” 时代
                                xinPeriodData: Object.assign({}, state.xinPeriodData, data[3])
                            };
                        });
                    }),
                //  获取图片标题接口
                requestGetImgTitle(TECHNOLOGY.name)
                    .then(data => {
                        //  为实际场景而生的 BPU 架构
                        const bpuDataList = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        //  持续攀登 引领 AI “芯” 时代
                        const xinPeriodDataList = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        this.setState((state) => {
                            return {
                                //  为实际场景而生的 BPU 架构
                                bpuData: Object.assign({}, state.bpuData, { list: bpuDataList }),
                                //  持续攀登 引领 AI “芯” 时代
                                xinPeriodData: Object.assign({}, state.xinPeriodData, { list: xinPeriodDataList })
                            };
                        });
                    })
            ])
                .then(() => {
                    const { setComponentDidMountFinish } = this.props;
                    //  父组件初始化完成
                    setComponentDidMountFinish(true);
                    //    console.log('setState结果是🍎', this.state);
                });
        }

        render() {
            const { bpuData, performanceData, mapsData, xinPeriodData } = this.state;
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader onceHeader={{ isOnce: true }} />
                    <BannerManage bannerType={6} />
                    {/*为实际场景而生的 BPU 架构*/}
                    <Bpu bpuData={bpuData} />
                    {/* <BlackPadding color={'#655'}/> */}
                    {/*AI 芯片真实性能远超对手*/}
                    <TechnologyPerformance performanceData={performanceData} mapsData={mapsData} />
                    {/* <BlackPadding color={'#f00'}/> */}
                    {/*关于 MAPS 评估方式*/}
                    <MAPS mapsData={mapsData} />
                    <BlackPadding color={'#000'} />
                    {/*持续攀登 引领 AI “芯” 时代*/}
                    <XinPeriod xinPeriodData={xinPeriodData} />
                    {/*视频*/}
                    <TechnologyVideo videoType={7} />
                    {/*视频本身*/}
                    <VideoWrap />
                    {/*脚部*/}
                    <BasicFooter />
                </div>
            );
        }
    }
);