import React from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import {
    requestGetClientCase,
    requestGetImgTitle,
    requestGetIotPartner,
    requestGetPageContent,
} from '@api/index';
import { clipData, commonRelativeWideFn, getBrowserInfo } from '@utils/utils';
import { navSortByRank } from '@utils/utils';
import { BannerManage } from '@components/bannerManage';
import { ScrollFixed } from '@components/scrollFixed';
import { FixedBarBox } from '@components/fixedBarBox';
import { Advantages } from '@components/open-explorer/advantages';
import { NAV_CAT_ID, AIOT } from '@utils/constant';
import { TechnicalSolution } from '@components/aiot/technicalSolution';
// import { ApplyScene } from '@components/applyScene';
import { AdvertisementBanner } from '@components/bannerManage/advertisementBanner';
import { GetMoreBox } from '@components/getMoreBox';
import { PopForm } from '@components/popForm';
import { Toast } from '@components/toast';
import './index.less';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                //  方案优势
                advantagesData: null,
                //  技术方案
                technicalSolutionData: null,
                //  应用场景
                // applySceneData: null,
                //  合作伙伴
                customList: null,
            };
            //  页面宽度监听
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);
            const { setBarBoxAnchorList } = props;
            setBarBoxAnchorList(['方案概述', '合作伙伴',]);
        }

        componentDidMount() {
            //  AIOT
            Promise.all([
                //  获取页面文案接口
                requestGetPageContent(AIOT.name)
                    .then(data => {
                        this.setState((state) => {
                            return {
                                //  特色与优势
                                advantagesData: Object.assign({}, state.advantagesData, data[0]),
                                //  技术方案
                                technicalSolutionData: Object.assign({}, state.technicalSolutionData, data[1]),
                                //  应用场景
                                // applySceneData: Object.assign({}, state.applySceneData, data[2])
                            };
                        });
                    }),
                //  获取图片标题接口
                requestGetImgTitle(AIOT.name)
                    .then(data => {
                        //  特色与优势
                        const advantagesDataList = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        //  技术方案
                        const technicalSolutionData = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        this.setState((state) => {
                            return {
                                //  特色与优势
                                advantagesData: Object.assign({}, state.advantagesData, { list: advantagesDataList }),
                                //  技术方案
                                technicalSolutionData: Object.assign({}, state.technicalSolutionData, { list: technicalSolutionData })
                            };
                        });
                    }),
                //  客户案例
                requestGetClientCase(AIOT.type)
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
                ,
                //  合作伙伴
                requestGetIotPartner()
                    .then(v => {
                        navSortByRank(v.data, 'rank');
                        this.setState(() => {
                            return {
                                customList: v.data,
                            };
                        });
                    }),
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
                advantagesData,
                technicalSolutionData,
                // applySceneData,
                customList
            } = this.state;
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader onceHeader={{ isOnce: false }} />
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={FixedBarBox} />
                    {/*轮播*/}
                    <BannerManage bannerType={18} />
                    <div id="m1" pc={60} />
                    {/*特色与优势*/}
                    <Advantages advantagesData={advantagesData} />
                    {/*技术方案*/}
                    <TechnicalSolution technicalSolutionData={technicalSolutionData} />
                    {/*应用场景，无文字，纯图片*/}
                    {/* <ApplyScene applySceneData={applySceneData} sceneType={1} /> */}
                    <div id="m2" pc={50} mobile={60} />
                    {/*合作伙伴*/}
                    <AdvertisementBanner data={customList} title='合作伙伴' styleType={3} />
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