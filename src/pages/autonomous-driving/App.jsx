import React from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { requestGetBannerByType, requestGetClientCase, requestGetPageContent } from '@api/index';
import { commonRelativeWideFn, getBrowserInfo, setJSONData } from '@utils/utils';
import { navSortByRank } from '@utils/utils';
import './index.less';
import { BannerManage } from '@components/bannerManage';
import { ScrollFixed } from '@components/scrollFixed';
import { FixedBarBox } from '@components/fixedBarBox';
import { SubBanner } from '@components/autonomous-driving/subBanner';
import { AUTONOMOUS_DRIVING } from '@utils/constant';
import { AdBox } from '@components/autonomous-driving/adBox';
import { GetMoreBox } from '@components/getMoreBox';
import { PopForm } from '@components/popForm';
import { Toast } from '@components/toast';
import { CustomerCase } from '@components/CustomerCase';
import { BlackPadding } from '@components/blackPadding';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                //  二级banner
                subBannerData: null,
                //  adBoxData
                adBoxData: null,
                //  客户案例
                customerCaseData: null,
            };
            //  页面宽度监听
            commonRelativeWideFn(this.props.setRelativeWideFn);
            //  页面滚动监听
            getBrowserInfo(this.props.setBrowserScrollInfoFn);
            const { setBarBoxAnchorList } = props;
            setBarBoxAnchorList(['', '',]);
        }

        componentDidMount() {
            //  AIOT
            Promise.all([
                //  subBanner数据
                requestGetBannerByType(15)
                    .then(v => {
                        this.setState(() => {
                            return {
                                subBannerData: v.data[0]
                            };
                        });
                    }),
                //  获取页面文案接口
                requestGetPageContent(AUTONOMOUS_DRIVING.name)
                    .then(data => {
                        setJSONData(data[0]);
                        setJSONData(data[1]);
                        setJSONData(data[2]);
                        this.setState((state) => {
                            return {
                                adBoxData: Object.assign({}, state.adBoxData, { list: data.slice(0, 3) }),
                                customerCaseData: Object.assign({}, state.customerCaseData, data[3])
                            };
                        });
                    }),
                //  客户案例
                requestGetClientCase(AUTONOMOUS_DRIVING.type)
                    .then(data => {
                        this.setState((state) => {
                            return {
                                customerCaseData: Object.assign({}, state.customerCaseData, { list: data })
                            };
                        });
                    }),
            ])
                .then(() => {
                    const { setComponentDidMountFinish } = this.props;
                    //  父组件初始化完成
                    setComponentDidMountFinish(true);
                    //                        console.log('setState结果是🍎', this.state);
                });
        }

        render() {
            const {
                subBannerData,
                adBoxData,
                customerCaseData,
            } = this.state;
            let AdBoxComponents;
            if (adBoxData && adBoxData.list) {
                AdBoxComponents = adBoxData.list.map((item, index) => {
                    return (
                        <AdBox key={index}
                            adBoxData={item}
                            index={index} />
                    );
                });
            }
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader onceHeader={{ isOnce: false }} />
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={FixedBarBox} />
                    <BannerManage bannerType={14} />
                    <BlackPadding y={3} color={'rgb(7,7,7)'} />
                    {/*二级banner*/}
                    <SubBanner subBannerData={subBannerData} />
                    <div id="m1" pc={60} />
                    {/*自动驾驶 的box , 3个*/}
                    {AdBoxComponents}
                    {/*客户案例*/}
                    <CustomerCase customerCaseData={customerCaseData} bgc={'#FAFAFA'} />
                    <div id="m2" pc={60} />
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
