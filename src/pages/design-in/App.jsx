import React from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import {
    requestEcologyPartner, requestGetClientCase,
    requestGetImgTitle,
    requestGetPageContent,
} from '@api';
import {
    clipData,
    commonRelativeWideFn,
    getBrowserInfo, navSortByRank,
} from '@utils/utils';
import { BannerManage } from '@components/bannerManage';
import { ScrollFixed } from '@components/scrollFixed';
import { FixedBarBox } from '@components/fixedBarBox';
import { DESIGNIN, NAV_CAT_ID } from '@utils/constant';
import { GetMoreBox } from '@components/getMoreBox';
import { PopForm } from '@components/popForm';
import { Toast } from '@components/toast';
import './index.less';
import { ProductSuite } from '@components/design-in/productSuite';
import { FourBlocks } from '@components/fourBlocks';
import { SupportScenario } from '@components/design-in/supportScenario';
import { DevelopmentProcess } from '@components/design-in/developmentProcess';
import { SuccessfulCases } from '@components/design-in/successfulCases';
import { AdvertisementBanner } from '@components/bannerManage/advertisementBanner';

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    class App extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                //  四个一块的
                cdrbData: null,
                //  产品套件
                productSuiteData: null,
                //  支持场景
                supportScenarioData: null,
                //  开发流程
                developmentProcessData: null,
                //  成功案例
                successfulCasesData: null,
                //  方案合作伙伴
                programPartners: null,

            };
            //  页面宽度监听
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);
            const { setBarBoxAnchorList } = props;
            setBarBoxAnchorList(['概述', '成功案例']);
        }

        componentDidMount(){
            //  DESIGNIN
            Promise.all([
                //  获取页面文案接口
                requestGetPageContent(DESIGNIN.name)
                    .then(data => {
                        this.setState((state) => {
                            return {
                                //  产品套件
                                productSuiteData: Object.assign({}, state.productSuiteData, data[0]),
                                //  支持场景
                                supportScenarioData: Object.assign({}, state.supportScenarioData, data[1]),
                                //  开发流程
                                developmentProcessData: Object.assign({}, state.developmentProcessData, data[2]),
                                //  成功案例
                                successfulCasesData: Object.assign({}, state.successfulCasesData, data[3]),
                                //  方案合作伙伴
                                programPartners: Object.assign({}, state.programPartners, data[4]),
                            };
                        });
                    }),
                //  获取图片标题接口
                requestGetImgTitle(DESIGNIN.name)
                    .then(data => {
                        const { setSupportScenarioActiveData, setDevelopmentProcessData } = this.props;
                        //  开发流程
                        const developmentProcessData = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        //  设置初始的默认值
                        setDevelopmentProcessData(developmentProcessData[0]);
                        //  支持场景
                        const supportScenarioData = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        //  设置初始的默认值
                        setSupportScenarioActiveData(supportScenarioData[0]);
                        //  产品套件
                        const productSuiteData = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        //  四个一块的
                        const cdrbData = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        this.setState((state) => {
                            return {
                                //  四个一块的
                                cdrbData: Object.assign([], state.cdrbData, cdrbData),
                                //  产品套件
                                productSuiteData: Object.assign({}, state.productSuiteData, { list: productSuiteData }),
                                //  支持场景
                                supportScenarioData: Object.assign({}, state.supportScenarioData, { list: supportScenarioData }),
                                //  开发流程
                                developmentProcessData: Object.assign({}, state.developmentProcessData, { list: developmentProcessData }),
                            };
                        });
                    }),
                //  获取图文接口
                requestGetClientCase(DESIGNIN.type)
                    .then((data) => {
                        this.setState((state) => {
                            return {
                                //  成功案例
                                successfulCasesData: Object.assign([], state.successfulCasesData, {list: data})
                            }
                        })
                    }),
                //  生态合作伙伴
                requestEcologyPartner()
                    .then(({ data }) => {
                        this.setState((state) => {
                            return {
                                //  方案合作伙伴
                                programPartners: Object.assign({}, state.programPartners, { list: data }),
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

        render(){
            const {
                cdrbData,
                productSuiteData,
                supportScenarioData,
                developmentProcessData,
                successfulCasesData,
                programPartners,

            } = this.state;
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader onceHeader={{ isOnce: false }}/>
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={FixedBarBox}/>
                    <div id="m1" pc={60} mobile={80}/>
                    {/*轮播*/}
                    <BannerManage bannerType={26}/>
                    {/*四个一块*/}
                    <FourBlocks data={cdrbData} isLight={true}/>
                    {/*产品套件*/}
                    <ProductSuite productSuiteData={productSuiteData}/>
                    {/*支持场景*/}
                    <SupportScenario supportScenarioData={supportScenarioData}/>
                    {/*开发流程*/}
                    <DevelopmentProcess developmentProcessData={developmentProcessData}/>
                    <div id="m2" pc={60}/>
                    {/*成功案例*/}
                    <SuccessfulCases successfulCasesData={successfulCasesData}/>
                    {/*方案合作伙伴*/}
                    <AdvertisementBanner
                        data={programPartners && programPartners.list}
                        title={programPartners && programPartners.title}
                        styleType={3}
                    />
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
    },
);

