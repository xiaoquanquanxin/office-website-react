import React from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { clipData, commonRelativeWideFn, getBrowserInfo } from '@utils/utils';
import { FixedBarBox } from '@components/fixedBarBox';
import { ScrollFixed } from '@components/scrollFixed';
import { BannerOnce } from '@components/bannerOnce';
// import { BannerManage } from '@components/bannerManage';
import { FourBlocks } from '@components/fourBlocks';
import { BaseParam } from '@components/journey2/baseParam';
import { GetMoreBox } from '@components/getMoreBox';
import { PopForm } from '@components/popForm';
import { Toast } from '@components/toast';
import { JOURNEY3, NAV_CAT_ID } from '@utils/constant';
import { requestGetClientCase, requestGetImgTitle, requestGetPageContent } from '@api/index';
import { OpenExplorer } from '@components/sunrise3/openExplorer';
import { UltraLowPower } from '@components/journey3/ultraLowPower';
import { ApplyScene } from '@components/applyScene';
import './index.less';
import { BlackPadding } from '@components/blackPadding';

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
                ultraLowPowerData5: null,

                //  征程3 DVB JSON
                baseParamData: { list: [] },
                //  “天工开物” AI 开发平台
                openExplorerData: null,
                //  应用场景
                applySceneData: null,
            };
        }

        componentDidMount() {
            Promise.all([
                //  获取页面文案接口
                requestGetPageContent(JOURNEY3.name)
                    .then(data => {
                        this.setState((state) => {
                            if (data[5].content) {
                                const _data = JSON.parse(data[5].content);
                                Object.assign(data[5], _data);
                            }
                            return {
                                //  超低功耗
                                ultraLowPowerData1: Object.assign({}, state.ultraLowPowerData1, data[0]),
                                ultraLowPowerData2: Object.assign({}, state.ultraLowPowerData1, data[1]),
                                ultraLowPowerData3: Object.assign({}, state.ultraLowPowerData1, data[2]),
                                ultraLowPowerData4: Object.assign({}, state.ultraLowPowerData1, data[3]),
                                ultraLowPowerData5: Object.assign({}, state.ultraLowPowerData1, data[4]),
                                //  征程3 DVB data[5]
                                baseParamData: Object.assign({}, state.baseParamData, data[5]),
                                //  “天工开物” AI 开发平台
                                openExplorerData: Object.assign({}, state.openExplorerData, data[6]),
                                //  应用场景
                                applySceneData: Object.assign({}, state.applySceneData, data[7])
                            };
                        });
                    }),
                //  获取图片标题接口
                requestGetImgTitle(JOURNEY3.name)
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
                requestGetClientCase(JOURNEY3.type)
                    .then(data => {
                        //  应用场景
                        const applySceneList = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        const topList = applySceneList.splice(0, 4);
                        const bottomList = applySceneList;
                        this.setState((state) => {
                            return {
                                applySceneData: Object.assign([], state.applySceneData, { topList, bottomList })
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
            const {
                cdrbData,
                ultraLowPowerData1,
                ultraLowPowerData2,
                ultraLowPowerData3,
                ultraLowPowerData4,
                ultraLowPowerData5,
                baseParamData,
                openExplorerData,
                applySceneData,
            } = this.state;
            //            const mbileY = window.innerWidth / 750 * 20;
            //            console.log(mbileY);
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader onceHeader={{ isOnce: false }} />
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={FixedBarBox} />
                    {/*<FixedBarBox/>*/}
                    <div id="m1" pc={60} />
                    {/*banner轮播*/}
                    <BannerOnce bannerType={21} />
                    <BlackPadding y={3} color={'#131313'} />
                    {/*四个一块*/}
                    <FourBlocks data={cdrbData} />
                    <BlackPadding color={'#101010'} />
                    {/*超低功耗*/}
                    <UltraLowPower ultraLowPowerData={ultraLowPowerData1} />
                    <BlackPadding color={'#171717'} zIndex={-1} />
                    <UltraLowPower ultraLowPowerData={ultraLowPowerData2} contentIsRight={true} />
                    <BlackPadding color={'#171717'} zIndex={-1} />
                    <UltraLowPower ultraLowPowerData={ultraLowPowerData3} />
                    <BlackPadding color={'#171717'} zIndex={-1} />
                    <UltraLowPower ultraLowPowerData={ultraLowPowerData4} contentIsRight={true} />
                    <BlackPadding color={'#171717'} zIndex={-1} />
                    <UltraLowPower ultraLowPowerData={ultraLowPowerData5} />
                    {/*规格参数*/}
                    <div id="m2" pc={36} />
                    <BlackPadding color={'#19191c'} />
                    {/*征程3 DVB*/}
                    <BaseParam baseParamData={baseParamData} customWidth={18} />
                    {/*/!*地平线 “天工开物”*!/*/}
                    <OpenExplorer openExplorerData={openExplorerData} isLight={false} />
                    {/*应用场景，无文字，纯图片*/}
                    <ApplyScene applySceneData={applySceneData} sceneType={0}
                        bgc='linear-gradient(180deg, #1D1D21 0%, #18181B 100%)' />
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