import React from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { clipData, commonRelativeWideFn, getBrowserInfo, setJSONData } from '@utils/utils';
import { ScrollFixed } from '@components/scrollFixed';
import { FixedBarBox } from '@components/fixedBarBox';
import { BannerOnce } from '@components/bannerOnce';
// import { BannerManage } from '@components/bannerManage';
import { FourBlocks } from '@components/fourBlocks';
import { AiotBox } from '@components/sunrise2/aiotBox';
// import { ApplyScene } from '@components/applyScene';
import { Sunrise2mainParam } from '@components/sunrise2/mainParam';
import { GetMoreBox } from '@components/getMoreBox';
import { PopForm } from '@components/popForm';
import { requestGetClientCase, requestGetImgTitle, requestGetPageContent } from '@api/index';
import { SUNRISE2, NAV_CAT_ID } from '@utils/constant';
import { Toast } from '@components/toast';
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
                //  计算赋能
                aiotBoxData: null,
                //  应用场景
                // applySceneData: null,
                //  主要参数
                mainParamData1: null,
                //  芯片规格
                mainParamData2: null,
            };
            //  页面宽度监听
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);
        }

        componentDidMount() {
            Promise.all([
                //  获取页面文案接口
                requestGetPageContent(SUNRISE2.name)
                    .then(data => {
                        //  计算赋能
                        this.setState((state) => {
                            setJSONData(data[1]);
                            setJSONData(data[2]);
                            return {
                                //  计算赋能
                                aiotBoxData: Object.assign({}, state.aiotBoxData, data[0]),
                                //  主要参数
                                mainParamData1: Object.assign({}, state.mainParamData1, data[1]),
                                //  芯片规格
                                mainParamData2: Object.assign({}, state.mainParamData2, data[2]),
                                //  应用场景
                                // applySceneData: Object.assign({}, state.applySceneData, data[3]),
                            };
                        });
                    }),
                //  获取图片标题接口
                requestGetImgTitle(SUNRISE2.name)
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
                requestGetClientCase(SUNRISE2.type)
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
                aiotBoxData,
                // applySceneData, 
                mainParamData1,
                mainParamData2
            } = this.state;
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader onceHeader={{ isOnce: false }} />
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={FixedBarBox} />
                    <div id="m1" pc={60} />
                    <BannerOnce bannerType={9} />
                    <BlackPadding y={3} color={'#131313'} />
                    <FourBlocks data={cdrbData} />
                    <BlackPadding color={'#131313'} />
                    {/*边缘计算赋能 AIoT*/}
                    <AiotBox aiotBoxData={aiotBoxData} />
                    {/* <BlackPadding color={'#19191D'}/> */}
                    {/*应用场景，无文字，纯图片*/}
                    {/* <ApplyScene applySceneData={applySceneData} sceneType={0} /> */}
                    {/*主要参数*/}
                    <div id="m2" pc={60} />
                    <BlackPadding color={'rgb(25 25 28)'} />
                    <Sunrise2mainParam mainParamData={mainParamData1} />
                    <BlackPadding color={'rgb(25 25 28)'} />
                    <Sunrise2mainParam mainParamData={mainParamData2} hasBorderBottom={true} />
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