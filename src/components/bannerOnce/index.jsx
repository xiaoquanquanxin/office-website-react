import React from 'react';
import { requestGetBannerByType } from '@api/index';
import { navSortByRank } from '@utils/utils';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
// import { IndexBannerSliderItem } from '@components/bannerOnce/indexBanner';
// import { AboutBannerSliderItem } from '@components/bannerOnce/aboutBanner';
// import { AdvertisementSlickItem } from '@components/bannerOnce/advertisementBanner';
// import { ProjectBannerSliderItem } from '@components/bannerOnce/projectBanner';
import { MatrixSliderItem } from '@components/bannerOnce/matrixBanner';
import { ProductSliderItem } from '@components/bannerOnce/productBanner';
import './index.less'

//  bannerId字符串
const aboutBanner = 'aboutBanner';
const projectBanner = 'projectBanner';
const productBanner = 'productBanner';
const matrixBanner = 'matrixBanner';

export const BannerOnce = connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    class extends React.Component {
        //  区分使用使用的子组件
        //  key: bannerType , value : sliderItemType
        //  要补充4个地方：bannerSliderTypeMap、bannerIdMap、bannerStyle、render（）的switch
        bannerSliderTypeMap = {
            //  关于我们、新闻中心
            4: 3,
            5: 3,
            //  核心技术、天工开物、高级别辅助驾驶、自动驾驶、智能座舱、高精地图、智能物联网
            6: 4,
            12: 4,
            13: 4,
            14: 4,
            16: 4,
            17: 4,
            18: 4,
            //  征程2、征程3、旭日2、旭日3
            8: 5,
            21: 5,
            9: 5,
            10: 5,
            //  matrix
            11: 6,
        };
        //  功能类似，banner的Id
        //  key: bannerType , value : bannerId
        bannerIdMap = {
            //  关于我们、新闻中心
            4: aboutBanner,
            5: aboutBanner,
            //  核心技术、天工开物、高级别辅助驾驶、自动驾驶、智能座舱、高精地图、智能物联网
            6: projectBanner,
            12: projectBanner,
            13: projectBanner,
            14: projectBanner,
            16: projectBanner,
            17: projectBanner,
            18: projectBanner,
            //  征程2、征程3、旭日2、旭日3
            8: productBanner,
            9: productBanner,
            10: productBanner,
            21: productBanner,
            //  matrix
            11: matrixBanner,
        };
        //  banner的样式
        bannerStyle = {
            6: 'pb6',
            12: 'pb12',

            13: 'pb13',
            14: 'pb14',
            16: 'pb16',
            17: 'pb17',

            //  征程2、征程3、旭日2、旭日3
            8: 'pb8',
            9: 'pb9',
            10: 'pb10',
            21: 'pb21',
            // matrix
            11: 'pb11',

            18: 'pb18',
        };

        /**
         * bannerType : 用于请求
         * */
        constructor(props) {
            super(props);
            const { bannerType, setProjectBanner } = props;
            if (!bannerType) {
                throw new Error(`缺少用于发请求的bannerType${bannerType}`);
            }
            this.state = {
                swiperData: null,
                sliderItemType: this.bannerSliderTypeMap[bannerType],
                bannerId: this.bannerIdMap[bannerType],
            };
            //  this.bannerStyle;
            //  设置产品banner样式
            setProjectBanner(this.bannerStyle[bannerType]);
        }

        componentDidMount() {
            const { bannerType } = this.props;
            //  发请求，取页面数据
            requestGetBannerByType(bannerType)
                .then(v => {
                    navSortByRank(v.data, 'rank');
                    const swiperData = v.data;
                    this.setState(() => {
                        return {
                            swiperData,
                        };
                    });
                });
        }

        render() {
            const { sliderItemType, swiperData } = this.state;
            let SliderItem = null;
            switch (sliderItemType) {
                // case 1: //  首页banner
                //     SliderItem = IndexBannerSliderItem;
                //     break;
                // case 2: //  首页的赋能客户
                //     SliderItem = AdvertisementSlickItem;
                //     break;
                // case 3: //  新闻中心、关于我们
                //     SliderItem = AboutBannerSliderItem;
                //     break;
                // case 4: //  核心技术、天工开物、高级别辅助驾驶、自动驾驶、智能座舱、高精地图、智能物联网
                //     SliderItem = ProjectBannerSliderItem;
                //     break;
                case 5: //  征程、旭日2、旭日3
                    SliderItem = ProductSliderItem;
                    break;
                case 6: //  matrix
                    SliderItem = MatrixSliderItem;
                    break;
                default:
                    throw new Error('错误的类型，没有这种类sliderItem');
            }
            return swiperData && swiperData.length ? <SliderItem data={swiperData[0]} /> : null
        }
    }
);
