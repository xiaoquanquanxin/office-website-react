import React from 'react';
import { requestGetBannerByType } from '@api/index';
import { navSortByRank } from '@utils/utils';
import { CustomSwiper } from '@components/swiper';
import style from './index.module.less';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import './index.less';

//  bannerId字符串
const aboutBanner = 'aboutBanner';
const projectBanner = 'projectBanner';
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
            //  核心技术、天工开物、高级别辅助驾驶、自动驾驶、智能座舱、高精地图、智能物联网、omni、superdrive
            6: 4,
            12: 4,
            13: 4,
            14: 4,
            16: 4,
            17: 4,
            18: 4,
            22: 4,
            23: 4,
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
            //  核心技术、天工开物、高级别辅助驾驶、自动驾驶、智能座舱、高精地图、智能物联网、omni、superdrive
            6: projectBanner,
            12: projectBanner,
            13: projectBanner,
            14: projectBanner,
            16: projectBanner,
            17: projectBanner,
            18: projectBanner,
            22: projectBanner,
            23: projectBanner,
            //  征程2、征程3、旭日2、旭日3
            8: productBanner,
            21: productBanner,
            9: productBanner,
            10: productBanner,
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

            //  征程2、征程3、旭日2、旭日3、matrix
            8: 'pb8',
            9: 'pb9',
            10: 'pb10',
            11: 'pb11',
            21: 'pb21',

            //  aiot、omni、superdrive
            18: 'pb18',
            22: 'pb18',
            23: 'pb18',
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
            const { bannerType } = this.props;

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
            const { swiperData, sliderItemType, bannerId } = this.state;
            const { bannerType } = this.props;
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
