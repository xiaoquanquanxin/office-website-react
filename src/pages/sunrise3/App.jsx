import React from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { clipData, commonRelativeWideFn, getBrowserInfo, setListJSONData } from '@utils/utils';
import { ScrollFixed } from '@components/scrollFixed';
import { FixedBarBox } from '@components/fixedBarBox';
import { BannerOnce } from '@components/bannerOnce';
import { FourBlocks } from '@components/fourBlocks';
import { Sunrise3BpuBox } from '@components/sunrise3/bpuBox';
import { SuperIsp } from '@components/sunrise3/superIsp';
import { VideoProcessing } from '@components/sunrise3/videoProcessing';
import { OpenExplorer } from '@components/sunrise3/openExplorer';
import { RichInterface } from '@components/sunrise3/richInterface';
import { GetMoreBox } from '@components/getMoreBox';
import { PopForm } from '@components/popForm';
// import { ApplyScene } from '@components/applyScene';
import { Toast } from '@components/toast';
import { requestGetClientCase, requestGetImgTitle, requestGetPageContent } from '@api/index';
import { NAV_CAT_ID, SUNRISE3 } from '@utils/constant';
import './index.less';
import { BlackPadding } from '@components/blackPadding';

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
                //  伯努利2.0 BPU
                sunrise3BpuBoxData: null,
                //  面向高画质 ISP
                superIspData: null,
                //  强大的视频处理能力
                videoProcessingData: null,
                //  地平线 “天工开物”
                openExplorerData: null,
                //  旭日3 系列——释放 “芯” 效能
                richInterfaceData: null,
                //  应用场景
                // applySceneData: null,
            };
            //  页面宽度监听
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);
        }

        componentDidMount() {
            Promise.all([
                //  获取页面文案接口
                requestGetPageContent(SUNRISE3.name)
                    .then(data => {
                        this.setState((state) => {
                            setListJSONData(data[0]);
                            if (data[0].content && data[0].content.length > 1) {
                                data[0].content.splice(1, 0, null);
                            }
                            setListJSONData(data[4]);
                            setListJSONData(data[1]);
                            if (data[1].content && data[1].content.length > 1) {
                                data[1].content.splice(1, 0, null);
                            }
                            return {
                                //  伯努利2.0 BPU
                                sunrise3BpuBoxData: Object.assign({}, state.sunrise3BpuBoxData, data[0]),
                                //  面向高画质 ISP
                                superIspData: Object.assign({}, state.superIspData, data[1]),
                                //  强大的视频处理能力
                                videoProcessingData: Object.assign({}, state.videoProcessingData, data[2]),
                                //  地平线 “天工开物”
                                openExplorerData: Object.assign({}, state.openExplorerData, data[3]),
                                //  旭日3 系列——释放 “芯” 效能
                                richInterfaceData: Object.assign({}, state.richInterfaceData, data[4]),
                                //  应用场景
                                // applySceneData: Object.assign([], state.applySceneData, data[5])
                            };
                        });
                    }),
                //  获取图片标题接口
                requestGetImgTitle(SUNRISE3.name)
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
                requestGetClientCase(SUNRISE3.type)
                // .then(data => {
                //     //  应用场景
                //     const applySceneList = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                //     const topList = applySceneList.splice(0, 4);
                //     const bottomList = applySceneList;
                //     this.setState((state) => {
                //         return {
                //             applySceneData: Object.assign([], state.applySceneData, { topList, bottomList })
                //         };
                //     });
                // })
            ])
                .then(() => {
                    const { setComponentDidMountFinish } = this.props;
                    //  父组件初始化完成
                    setComponentDidMountFinish(true);
                    //    console.log('setState结果是🍎', this.state);
                });
        }

        render() {
            const {
                cdrbData,
                sunrise3BpuBoxData,
                superIspData,
                videoProcessingData,
                openExplorerData,
                richInterfaceData,
                // applySceneData
            } = this.state;
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader onceHeader={{ isOnce: false }} />
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={FixedBarBox} />
                    <div id="m1" pc={60} />
                    <BannerOnce bannerType={10} />
                    <BlackPadding y={3} color={'#131313'} />
                    {/*四个一块的*/}
                    <FourBlocks data={cdrbData} />
                    <BlackPadding color={'#101010'} />
                    {/*伯努利2.0 BPU*/}
                    <Sunrise3BpuBox sunrise3BpuBoxData={sunrise3BpuBoxData} />
                    {/* <BlackPadding color={'#071112'}/> */}
                    {/*面向高画质 ISP*/}
                    <SuperIsp superIspData={superIspData} />
                    <BlackPadding color={'#2e2e31'} />
                    {/*强大的视频处理能力*/}
                    <VideoProcessing videoProcessingData={videoProcessingData} />
                    <BlackPadding color={'#19191e'} />
                    {/*地平线 “天工开物”*/}
                    <OpenExplorer openExplorerData={openExplorerData} isLight={false} />
                    <BlackPadding color={'#19191e'} />
                    {/*旭日3 系列——释放 “芯” 效能*/}
                    <div id="m2" pc={60} />
                    <RichInterface richInterfaceData={richInterfaceData} />
                    {/*应用场景，无文字，纯图片*/}
                    {/* <BlackPadding color={'#19191e'} /> */}
                    {/* <ApplyScene applySceneData={applySceneData} sceneType={0} /> */}
                    {/*更多*/}
                    <GetMoreBox />
                    {/*表单*/}
                    <PopForm />
                    {/*toast*/}
                    <Toast />
                    {/*脚部*/}
                    <BasicFooter />
                </div>
            );
        }
    }
);