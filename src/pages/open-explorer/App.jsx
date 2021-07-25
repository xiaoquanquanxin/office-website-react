import React from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { clipData, commonRelativeWideFn, getBrowserInfo } from '@utils/utils';
import { BannerManage } from '@components/bannerManage';
import { ScrollFixed } from '@components/scrollFixed';
import { FixedBarBox } from '@components/fixedBarBox';
import './index.less';
import { Advantages } from '@components/open-explorer/advantages';
import { ModuleNav } from '@components/open-explorer/moduleNav';
import { OpenExplorer } from '@components/sunrise3/openExplorer';
import { NAV_CAT_ID, OPEN_EXPLORER } from '@utils/constant';
import { requestGetImgTitle, requestGetPageContent, requestGetProductPartner } from '@api/index';
import { AdvertisementBanner } from '@components/bannerManage/advertisementBanner';
import { GetMoreBox } from '@components/getMoreBox';
import { PopForm } from '@components/popForm';
import { Toast } from '@components/toast';

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
                //  特色与优势
                advantagesData: null,
                //  功能模块
                moduleNavData: null,
                //  “天工开物” AI 开发平台
                openExplorerData: null,
                //  合作伙伴
                customList: null
            };
            const { setBarBoxAnchorList } = props;
            setBarBoxAnchorList(['优势概述', '合作伙伴',]);
        }

        componentDidMount() {
            //  OPEN_EXPLORER
            Promise.all([
                requestGetProductPartner()
                    .then(v => {
                        this.setState(() => {
                            return {
                                customList: v.data,
                            };
                        });
                    }),
                //  获取页面文案接口
                requestGetPageContent(OPEN_EXPLORER.name)
                    .then(data => {
                        this.setState((state) => {
                            return {
                                //  特色与优势
                                advantagesData: Object.assign({}, state.advantagesData, data[0]),
                                //  功能模块
                                moduleNavData: Object.assign({}, state.moduleNavData, data[1]),
                                //  “天工开物” AI 开发平台
                                openExplorerData: Object.assign({}, state.openExplorerData, data[2]),
                            };
                        });
                    }),
                //  获取图片标题接口
                requestGetImgTitle(OPEN_EXPLORER.name)
                    .then(data => {
                        //  特色与优势
                        const advantagesDataList = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        //  功能模块
                        const moduleNavDataList = clipData(data, NAV_CAT_ID, data[0][NAV_CAT_ID]);
                        this.setState((state) => {
                            return {
                                //  特色与优势
                                advantagesData: Object.assign({}, state.advantagesData, { list: advantagesDataList }),
                                //  功能模块
                                moduleNavData: Object.assign({}, state.moduleNavData, { list: moduleNavDataList }),
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
                advantagesData,
                moduleNavData,
                openExplorerData,
                customList,
            } = this.state;
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader onceHeader={{ isOnce: false }} />
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={FixedBarBox} />
                    <BannerManage bannerType={12} />
                    <div id="m1" pc={60} />
                    {/*特色与优势*/}
                    <Advantages advantagesData={advantagesData} />
                    {/*功能模块*/}
                    <ModuleNav moduleNavData={moduleNavData} />
                    {/*地平线 “天工开物”*/}
                    <OpenExplorer openExplorerData={openExplorerData} isLight={true} margin={.2} />
                    <div id="m2" pc={30} mobile={90} />
                    {/*合作伙伴*/}
                    <AdvertisementBanner
                        data={customList}
                        title='合作伙伴'
                        styleType={2}
                    />
                    {/*更多*/}
                    <GetMoreBox isGrey={true} />
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