import React from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { requestGetImgTitle, requestGetPageContent } from '@api/index';
import { clipData, commonRelativeWideFn, getBrowserInfo, navSortByRank } from '@utils/utils';
import { ScrollFixed } from '@components/scrollFixed';
import { FixedBarBox } from '@components/fixedBarBox';
import { BannerOnce } from '@components/bannerOnce';
// import { BannerManage } from '@components/bannerManage';
import { AwardsBox } from '@components/matrix/awardsBox';
import { FourBlocks } from '@components/fourBlocks';
import { MatrixPerception } from '@components/matrix/matrixPerception';
import { ToolSuite } from '@components/matrix/toolSuite';
import { ChainBox } from '@components/matrix/chainBox';
import { HardwareSpecification } from '@components/matrix/hardwareSpecification';
import { GetMoreBox } from '@components/getMoreBox';
import { PopForm } from '@components/popForm';
import { MatrixApplyScene } from '@components/matrix/matrixApplyScene';
import { MATRIX, NAV_CAT_ID } from '@utils/constant';
import './index.less';
import { Toast } from '@components/toast';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                //  荣获多项国际大奖
                awardsBoxData: null,
                //  四个一块的
                cdrbData: null,
                //  高性能图像感知能力
                perceptionData: null,
                //  开发工具套件
                toolSuiteData: null,
                //  开放工具链
                chainBoxData: null,
                //  硬件关键规格
                hsData: null,
                //  应用场景
                applySceneData: null,
            };
            //  页面宽度监听
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);
        }

        componentDidMount() {
            Promise.all([
                //  获取页面文案接口
                requestGetPageContent(MATRIX.name)
                    .then(data => {
                        this.setState((state) => {
                            return {
                                //  荣获多项国际大奖
                                awardsBoxData: Object.assign({}, state.awardsBoxData, data[0]),
                                //  高性能图像感知能力
                                perceptionData: Object.assign({}, state.perceptionData, data[1]),
                                //  开发工具套件
                                toolSuiteData: Object.assign({}, state.toolSuiteData, data[2]),
                                //  开放工具链
                                chainBoxData: Object.assign({}, state.chainBoxData, data[3]),
                                //  硬件关键规格
                                hsData: Object.assign({}, state.hsData, data[4]),
                                //  应用场景
                                applySceneData: Object.assign({}, state.applySceneData, data[5]),
                            };
                        });
                    }),
                //  获取图片标题接口
                requestGetImgTitle(MATRIX.name)
                    .then(data => {
                        //  console.log('获取图片标题接口');
                        //  荣获多项国际大奖
                        const awardsBoxDataList = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        //  四个一块的
                        const cdrbData = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        //  高性能图像感知能力
                        const perceptionDataList = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        //  开发工具套件
                        const toolSuiteDataList = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        //  硬件关键规格
                        const hsDataList = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        //  应用场景
                        const applySceneDataList = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        navSortByRank(applySceneDataList, 'rank');
                        this.setState((state) => {
                            return {
                                //  荣获多项国际大奖
                                awardsBoxData: Object.assign({}, state.awardsBoxData, { list: awardsBoxDataList }),
                                //  四个一块的
                                cdrbData: Object.assign([], state.cdrbData, cdrbData),
                                //  高性能图像感知能力
                                perceptionData: Object.assign({}, state.perceptionData, { list: perceptionDataList }),
                                //  开发工具套件
                                toolSuiteData: Object.assign({}, state.toolSuiteData, { list: toolSuiteDataList }),
                                //  硬件关键规格
                                hsData: Object.assign({}, state.hsData, { imgList: hsDataList }),
                                //  应用场景
                                applySceneData: Object.assign({}, state.applySceneData, { list: applySceneDataList })
                            };
                        });
                    })
            ])
                .then(() => {
                    const { setComponentDidMountFinish } = this.props;
                    //  父组件初始化完成
                    setComponentDidMountFinish(true);
                    //  console.log('setState结果是🍎', this.state.applySceneData);
                });

            //            //  获取客户案例接口
            //            requestGetClientCase(119)
            //                .then(v => {
            //                    const { data } = v;
            //                    console.log('获取客户案例接口');
            //                });
        }

        render() {
            const { awardsBoxData, cdrbData, perceptionData, toolSuiteData, chainBoxData, hsData, applySceneData } = this.state;
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader onceHeader={{ isOnce: false }} />
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={FixedBarBox} />
                    <div id="m1" pc={60} />
                    {/*banner轮播*/}
                    <BannerOnce bannerType={11} />
                    {/*荣获多项国际大奖*/}
                    <AwardsBox awardsBoxData={awardsBoxData} />
                    {/*四个一块*/}
                    <FourBlocks data={cdrbData} isLight={true} />
                    {/*高性能图像感知能力*/}
                    <MatrixPerception perceptionData={perceptionData} />
                    {/*开发工具套件*/}
                    <ToolSuite toolSuiteData={toolSuiteData} />
                    {/*开放工具链*/}
                    <ChainBox chainBoxData={chainBoxData} />
                    {/*硬件关键规格*/}
                    <div id="m2" pc={60} />
                    {/*硬件关键规格*/}
                    <HardwareSpecification hsData={hsData} />
                    {/*应用场景*/}
                    <MatrixApplyScene applySceneData={applySceneData} />
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