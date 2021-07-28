import React from 'react';
import {BasicHeader} from '@components/basicHeader';
import {BasicFooter} from '@components/basicFooter';
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from '@store/reduxMap';
import {clipData, commonRelativeWideFn, getBrowserInfo} from '@utils/utils';
import {FixedBarBox} from '@components/fixedBarBox';
import {ScrollFixed} from '@components/scrollFixed';
import {BannerOnce} from '@components/bannerOnce';
import {FourBlocks} from '@components/fourBlocks';
import {GetMoreBox} from '@components/getMoreBox';
import {PopForm} from '@components/popForm';
import {Toast} from '@components/toast';
import {JOURNEY5, NAV_CAT_ID} from '@utils/constant';
import {requestGetImgTitle, requestGetPageContent} from '@api/index';
import {OpenExplorer} from '@components/sunrise3/openExplorer';
import {UltraLowPower} from '@components/journey3/ultraLowPower';
import './index.less';
import {BlackPadding} from '@components/blackPadding';
import {PerformanceIndex} from "@components/journey5/performanceIndex";
import {JourneyFPS} from "@components/journey5/journeyFPS";

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends React.Component {
        constructor(props) {
            super(props);
            //  页面宽度监听
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);

            this.state = {
                //  四个一块的
                cdrbData: null,
                //  超低功耗
                ultraLowPowerData1: null,
                ultraLowPowerData2: null,
                ultraLowPowerData3: null,
                ultraLowPowerData4: null,

                //  征程  5芯片架构
                openExplorerData: null,

                //  性能指标
                performanceIndexData: null,

                //  征程  5 (6391 FPS)
                JourneyFPSData: null,
            };
        }

        componentDidMount() {
            Promise.all([
                //  获取页面文案接口
                requestGetPageContent(JOURNEY5.name)
                    .then(data => {
                        if (data[5] && data[5].content) {
                            data[5].content = JSON.parse(data[5].content);
                            const {content} = data[5];
                            //  移动端数据结构
                            data[5].mobileList = content;
                            //  pc端数据结构
                            const pcList = [];
                            for (let i = 0; i < content.length; i += 2) {
                                const pcItem = [];
                                pcItem.push(content[i])
                                pcItem.push(content[i + 1]);
                                pcList.push(pcItem);
                            }
                            data[5].pcList = pcList;
                        }
                        this.setState((state) => {
                            return {
                                //  超低功耗
                                ultraLowPowerData1: Object.assign({}, state.ultraLowPowerData1, data[0]),
                                ultraLowPowerData2: Object.assign({}, state.ultraLowPowerData1, data[1]),
                                ultraLowPowerData3: Object.assign({}, state.ultraLowPowerData1, data[2]),
                                ultraLowPowerData4: Object.assign({}, state.ultraLowPowerData1, data[3]),
                                //  征程  5芯片架构
                                openExplorerData: Object.assign({}, state.openExplorerData, data[4]),
                                //  性能指标
                                performanceIndexData: Object.assign({}, state.performanceIndexData, data[5]),
                                //  征程  5 (6391 FPS)
                                JourneyFPSData: Object.assign({}, state.openExplorerData, data[6]),
                            };
                        });
                    }),
                //  获取图片标题接口
                requestGetImgTitle(JOURNEY5.name)
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
                ultraLowPowerData1,
                ultraLowPowerData2,
                ultraLowPowerData3,
                ultraLowPowerData4,
                openExplorerData,
                performanceIndexData,
                JourneyFPSData,
            } = this.state;
            //            const mbileY = window.innerWidth / 750 * 20;
            //            console.log(mbileY);
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader onceHeader={{isOnce: false}}/>
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={FixedBarBox}/>
                    {/*<FixedBarBox/>*/}
                    <div id="m1" pc={60}/>
                    {/*banner轮播*/}
                    <BannerOnce bannerType={24}/>
                    <BlackPadding y={3} color={'#131313'}/>
                    {/*四个一块*/}
                    <FourBlocks data={cdrbData}/>
                    <BlackPadding color={'#101010'}/>
                    {/*超低功耗*/}
                    <UltraLowPower ultraLowPowerData={ultraLowPowerData1}
                                   position={{left: '0px',}}/>
                    <BlackPadding color={'#171717'} zIndex={-1}/>
                    <UltraLowPower ultraLowPowerData={ultraLowPowerData2} contentIsRight={true}
                                   position={{left: '725px',}}/>
                    <BlackPadding color={'#171717'} zIndex={-1}/>
                    <UltraLowPower ultraLowPowerData={ultraLowPowerData3}
                                   position={{left: '0px',}}/>
                    <BlackPadding color={'#171717'} zIndex={-1}/>
                    <UltraLowPower ultraLowPowerData={ultraLowPowerData4} contentIsRight={true}
                                   position={{left: '600px',}}/>
                    {/*征程  5芯片架构*/}
                    <OpenExplorer openExplorerData={openExplorerData} isLight={false}/>
                    <div id="m2" pc={70} mobile={100}/>
                    {/*性能指标*/}
                    <PerformanceIndex performanceIndexData={performanceIndexData}/>
                    {/*征程  5 (6391 FPS)*/}
                    <JourneyFPS JourneyFPSData={JourneyFPSData}/>
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