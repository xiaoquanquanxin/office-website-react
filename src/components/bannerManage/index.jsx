import React from 'react';
import {requestGetBannerByType} from '@api/index';
import {navSortByRank} from '@utils/utils';
import {CustomSwiper} from '@components/swiper';
import style from './index.module.less';
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from '@store/reduxMap';
import './index.less';

//  bannerId字符串
const aboutBanner = 'aboutBanner';
const projectBanner = 'projectBanner';
const solutionBanner = 'solutionBanner';
const productBanner = 'productBanner';
const matrixBanner = 'matrixBanner';

export const BannerManage = connect(
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
            //  核心技术、天工开物、自动驾驶
            6: 4,
            12: 4,
            //  征程2、征程3、旭日2、旭日3
            8: 5,
            21: 5,
            9: 5,
            10: 5,
            //  matrix
            11: 6,

            //  解决方案下的全部
            //  adas
            13: 7,
            //  navinet
            17: 7,
            //  superdrive
            23: 7,
            //  omni
            22: 7,
            //  intelligent-cockpit
            16: 7,
            //  design-in
            26: 7,
            //  aiot
            18: 7,
            //  autonomous-driving
            14: 7,
        };
        //  功能类似，banner的Id
        //  key: bannerType , value : bannerId
        bannerIdMap = {
            //  关于我们、新闻中心
            4: aboutBanner,
            5: aboutBanner,
            //  核心技术、天工开物、自动驾驶
            6: projectBanner,
            12: projectBanner,
            //  征程2、征程3、旭日2、旭日3
            8: productBanner,
            21: productBanner,
            9: productBanner,
            10: productBanner,
            //  matrix
            11: matrixBanner,

            //  解决方案下的全部
            //  adas
            13: solutionBanner,
            //  navinet
            17: solutionBanner,
            //  superdrive
            23: solutionBanner,
            //  omni
            22: solutionBanner,
            //  intelligent-cockpit
            16: solutionBanner,
            //  design-in
            26: solutionBanner,
            //  aiot
            18: solutionBanner,
            //  autonomous-driving
            14: solutionBanner,
        };
        //  banner的样式
        bannerStyle = {
            6: 'pb6',
            12: 'pb12',

            //  征程2、征程3、旭日2、旭日3、matrix
            8: 'pb8',
            9: 'pb9',
            10: 'pb10',
            11: 'pb11',
            21: 'pb21',

            //  解决方案下的全部
            //  adas
            13: 'pb19',
            //  navinet
            17: 'pb19',
            //  superdrive
            23: 'pb19',
            //  omni
            22: 'pb19',
            //  intelligent-cockpit
            16: 'pb19',
            //  design-in
            26: 'pb19',
            //  aiot
            18: 'pb19',
            //  autonomous-driving
            14: 'pb19',
        };

        /**
         * bannerType : 用于请求
         * */
        constructor(props) {
            super(props);
            const {bannerType, setProjectBanner} = props;
            if (!bannerType) {
                throw new Error(`缺少用于发请求的bannerType${bannerType}`);
            }
            //  console.log(`BannerManage 组件：bannerType:${bannerType}`);
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
            const {bannerType} = this.props;

            //  发请求，取页面数据
            requestGetBannerByType(bannerType)
                .then(v => {
                    navSortByRank(v.data, 'rank');
                    //                const swiperData = v.data.concat(Object.assign({}, v.data[0]));
                    //                swiperData[0].id = '12345';
                    const swiperData = v.data;
                    //  console.log(swiperData);
                    this.setState(() => {
                        return {
                            swiperData,
                        };
                    });
                });
        }

        render() {
            const {swiperData, sliderItemType, bannerId} = this.state;
            const {bannerType} = this.props;
            let id;
            //  只有征程、旭日2、旭日3、MATRIX有需要背景
            switch (bannerType) {
                case 8:     //  只有征程2、征程3、旭日2、旭日3一种背景色
                case 21:
                case 9:
                case 10:
                    id = 'swiperMainWrapDark';
                    break;
                case 11:    //  matrix  颜色不同而已
                    id = 'swiperMainWrapLight';
                    break;
                default:
                    break;
            }
            return (
                <div id={id} className={`${style[id]}`}>
                    <div className={`${style.bannerSwiper} ${this.bannerStyle[bannerType]}`}
                         id={bannerId}>
                        <div className={style.container}>
                            <CustomSwiper
                                swiperData={swiperData}
                                sliderItemType={sliderItemType}
                                basicDelay={5}
                                autoHeight={true}
                            />
                        </div>
                    </div>
                </div>
            );
        }
    }
);
