import React from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { clipData, commonRelativeWideFn, getBrowserInfo, setJSONData } from '@utils/utils';
import { FixedBarBox } from '@components/fixedBarBox';
import { ScrollFixed } from '@components/scrollFixed';
// import { BannerManage } from '@components/bannerManage';
import { BannerOnce } from '@components/bannerOnce';
import { FourBlocks } from '@components/fourBlocks';
import { HighPerception } from '@components/journey2/HighPerception';
// import { EdgeComputing } from '@components/journey2/edgeComputing';
import { ProductMatrix } from '@components/journey2/productMatrix';
import { BaseParam } from '@components/journey2/baseParam';
import { Journey2Video } from '@components/journey2/journey2Video';
import { GetMoreBox } from '@components/getMoreBox';
import { VideoWrap } from '@components/video';
import { PopForm } from '@components/popForm';
import { Toast } from '@components/toast';
import { requestGetImgTitle, requestGetPageContent } from '@api/index';
import { JOURNEY2, NAV_CAT_ID } from '@utils/constant';
import { BlackPadding } from '@components/blackPadding';
import './index.less';

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
                //  高性能视觉感知1
                hPData1: null,
                hPData3: null,
                hPData2: null,
                //  地平线智能驾驶产品矩阵
                productMatrixData: null,
            };
        }

        componentDidMount() {
            Promise.all([
                //  获取页面文案接口
                requestGetPageContent(JOURNEY2.name)
                    .then(data => {
                        this.setState((state) => {
                            setJSONData(data[4]);
                            if (data[4].list) {
                                data[4].list.forEach(item => {
                                    item.desc = item.desc.join('<br/>');
                                });
                            }
                            return {
                                //  高性能视觉感知1
                                hPData1: Object.assign({}, state.hPData1, data[0]),
                                hPData2: Object.assign({}, state.hPData2, data[1]),
                                hPData3: Object.assign({}, state.hPData3, data[2]),
                                //  地平线智能驾驶产品矩阵
                                productMatrixData: Object.assign({}, state.productMatrixData, data[3]),
                                //  规格参数
                                baseParamData: Object.assign({}, state.baseParamData, data[4]),
                            };
                        });
                    }),
                //  获取图片标题接口
                requestGetImgTitle(JOURNEY2.name)
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
                //                //  客户案例  ，视频用
                //                requestGetClientCase(JOURNEY2.type)
                //                    .then(data => {
                //                        console.log(data);
                //                    })
            ]).then(() => {
                const { setComponentDidMountFinish } = this.props;
                //  父组件初始化完成
                setComponentDidMountFinish(true);
                //    console.log('setState结果是🍎', this.state);
            });
        }

        render() {
            const {
                cdrbData,
                hPData1,
                hPData2,
                hPData3,
                productMatrixData,
                baseParamData
            } = this.state;

            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader onceHeader={{ isOnce: false }} />
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={FixedBarBox} />
                    {/*<FixedBarBox/>*/}
                    <div id="m1" pc={60} />
                    <BannerOnce bannerType={8} />
                    {/*banner轮播*/}
                    {/* <BannerManage bannerType={8}/> */}
                    <BlackPadding y={3} color={'#131313'} />
                    {/*四个一块*/}
                    <FourBlocks data={cdrbData} />
                    <BlackPadding color={'#101010'} />
                    {/*高知觉*/}
                    <HighPerception data={hPData1} customWidth={1} position={1} />
                    <BlackPadding color={'#171717'} zIndex={-1} />
                    {/* <EdgeComputing data={hPData2}/> */}
                    <HighPerception data={hPData2} customWidth={1} position={2} />
                    <BlackPadding color={'#171717'} zIndex={-1} />
                    <HighPerception data={hPData3} customWidth={3} position={1} />
                    <BlackPadding color={'#2c2c2f'} />
                    {/*地平线智能驾驶产品矩阵*/}
                    <ProductMatrix data={productMatrixData} />
                    {/*规格参数*/}
                    <BlackPadding color={'#19191c'} />
                    <div id="m2" pc={36} />
                    <BaseParam baseParamData={baseParamData} />
                    {/*视频展示*/}
                    <BlackPadding color={'#191918'} />
                    <Journey2Video videoType={19} />
                    {/*更多*/}
                    <GetMoreBox />
                    {/*表单*/}
                    <PopForm />
                    {/*toast*/}
                    <Toast />
                    {/*视频本身*/}
                    <VideoWrap />
                    {/*脚部*/}
                    <BasicFooter />
                </div>
            );
        }
    }
);