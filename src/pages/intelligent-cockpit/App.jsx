import React from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { requestGetClientCase, requestGetCockPitPartner, requestGetImgTitle, requestGetPageContent } from '@api/index';
import { clipData, commonRelativeWideFn, getBrowserInfo, setListJSONData } from '@utils/utils';
import { navSortByRank } from '@utils/utils';
import { BannerManage } from '@components/bannerManage';
import { ScrollFixed } from '@components/scrollFixed';
import { FixedBarBox } from '@components/fixedBarBox';
import { NAV_CAT_ID, INTELLIGENT_COCKPIT } from '@utils/constant';
// import { PlanAdvantage } from '@components/intelligent-cockpit/planAdvantage';
import { ModuleNav } from '@components/open-explorer/moduleNav';
import { ProductArchitecture } from '@components/intelligent-cockpit/productArchitecture';
import { CoreAlgorithm } from '@components/intelligent-cockpit/coreAlgorithm';
import { AlgorithmsLibrary } from '@components/intelligent-cockpit/algorithmsLibrary';
import { IcCustomerCase } from '@components/intelligent-cockpit/icCustomerCase';
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
                planAdvantageData: null,
                //  产品结构
                productArchitectureData: null,
                //  核心算法介绍
                coreAlgorithmData: null,
                //  算法库
                algorithmsLibraryData: null,
                //  客户案例
                customerCaseData: null,
                //  合作伙伴
                customList: null,
            };
            //  页面宽度监听
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);
            const { setBarBoxAnchorList } = props;
            setBarBoxAnchorList(['方案概述', '客户案例']);
        }

        componentDidMount() {
            Promise.all([
                //  获取页面文案接口
                requestGetPageContent(INTELLIGENT_COCKPIT.name)
                    .then(data => {
                        setListJSONData(data[0]);
                        if (data[0].content) {
                            data[0].content.reverse();
                        }
                        setListJSONData(data[1]);
                        this.setState((state) => {
                            return {
                                //  产品架构
                                productArchitectureData: Object.assign({}, state.productArchitectureData, data[0]),
                                //  算法库
                                algorithmsLibraryData: Object.assign({}, state.algorithmsLibraryData, data[1]),
                                //  方案优势
                                planAdvantageData: Object.assign({}, state.planAdvantageData, data[2]),
                                //  核心算法介绍
                                coreAlgorithmData: Object.assign({}, state.coreAlgorithmData, data[3]),
                                //  客户案例
                                customerCaseData: Object.assign({}, state.customerCaseData, data[4]),
                            };
                        });
                    }),
                //  获取图片标题接口
                requestGetImgTitle(INTELLIGENT_COCKPIT.name)
                    .then(data => {
                        //  方案优势
                        const planAdvantageDataList = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        //  算法核心介绍
                        const coreAlgorithmDataList = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        //  用户案例
                        const descList = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        this.setState((state) => {
                            return {
                                //  方案优势
                                planAdvantageData: Object.assign({}, state.planAdvantageData, { list: planAdvantageDataList }),
                                //  算法核心介绍
                                coreAlgorithmData: Object.assign({}, state.coreAlgorithmData, { list: coreAlgorithmDataList }),
                                //  用户案例
                                customerCaseData: Object.assign({}, state.customerCaseData, { descList, })
                            };
                        });
                    }),
                //  客户案例
                requestGetClientCase(INTELLIGENT_COCKPIT.type)
                    .then(data => {
                        this.setState((state) => {
                            return {
                                customerCaseData: Object.assign({}, state.customerCaseData, { list: data })
                            };
                        });

                    }),
                //  合作伙伴
                requestGetCockPitPartner()
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
                planAdvantageData,
                productArchitectureData,
                coreAlgorithmData,
                algorithmsLibraryData,
                customerCaseData,
                customList
            } = this.state;
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader onceHeader={{ isOnce: false }} />
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={FixedBarBox} />
                    <BannerManage bannerType={16} />
                    {/*方案优势*/}
                    <div id="m1" pc={60} />
                    {/* <PlanAdvantage planAdvantageData={planAdvantageData}/> */}
                    <ModuleNav moduleNavData={planAdvantageData} />
                    {/*产品架构*/}
                    <ProductArchitecture productArchitectureData={productArchitectureData} />
                    {/*算法核心介绍*/}
                    <CoreAlgorithm coreAlgorithmData={coreAlgorithmData} />
                    {/*算法库*/}
                    <AlgorithmsLibrary algorithmsLibraryData={algorithmsLibraryData} />
                    <div id="m2" pc={60} />
                    {/*客户案例*/}
                    <IcCustomerCase customerCaseData={customerCaseData} />
                    {/*合作伙伴*/}
                    <AdvertisementBanner
                        data={customList}
                        title='合作伙伴'
                        styleType={3}
                    />
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