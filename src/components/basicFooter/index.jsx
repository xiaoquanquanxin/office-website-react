import React from 'react';
import style from './index.module.less';
import layout from '@css/layout.module.less';
import { SiteInfo } from '@components/basicFooter/siteInfo';
import { LinkList } from '@components/basicFooter/linkList';
import { requestFooterNav } from '@api/index';
import { getContentList, navSortByRank } from '@utils/utils';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';

const BasicFooterRender = connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    ({
        //  被选中的link
        activeLinkIndex,
        //  被展开的链接块
        isSpreadIndex,
        //  二维码展示index
        qrCodeShowIndex,
        //  数据
        data,
        //  展开底导航
        spreadClick,
        //  点击二维码
        qrCodeClick,
        //  获取浏览器信息，来源于redux
        REDUCER_BROWSER_INFO,
    }) => {
        if (!data) {
            return '';
        }
        //  浏览器足够宽
        const { isRelativeWide } = REDUCER_BROWSER_INFO;
        return (
            <section className={style.basicFooter}>
                <div className={`${style.basicFooterInfo} ${layout.clearfix}`}>
                    <div className={`${style.static} ${isRelativeWide ? layout.left : ''}`}>
                        <div>
                            <p className={`${isRelativeWide ? style.subTitle : ''}`}
                                dangerouslySetInnerHTML={{ __html: data.data.left_top_title }} />
                            <p className={style.subDescription}
                                dangerouslySetInnerHTML={{ __html: data.data.left_top_content }}
                            />
                        </div>
                        <div>
                            <p className={`${isRelativeWide ? style.subTitle : ''}`}
                                dangerouslySetInnerHTML={{ __html: data.data.left_bottom_title }}
                            />
                            <p className={style.subDescription}
                                dangerouslySetInnerHTML={{ __html: data.data.left_bottom_content }}
                            />
                        </div>
                    </div>
                    <LinkList
                        isSpreadIndex={isSpreadIndex}
                        activeLinkIndex={activeLinkIndex}
                        data={data}
                        spreadClick={spreadClick}
                    />
                </div>
                <SiteInfo
                    qrCodeShowIndex={qrCodeShowIndex}
                    qrCodeClick={qrCodeClick}
                    data={data}
                />
            </section>
        );
    }
);
export const BasicFooter = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //  被选中的link
            activeLinkIndex: props.activeLinkIndex || 0,
            //  被展开的链接块
            isSpreadIndex: -1,
            //  二维码展示index
            qrCodeShowIndex: -1,
            //  数据
            data: null,
        };
    }

    //  钩子
    componentDidMount() {
        //  发请求，取footer数据
        requestFooterNav()
            .then(data => {
                //  公司业务
                navSortByRank(data.solution, 'rank');
                //  公司产品
                navSortByRank(data.product, 'rank');
                //  关于我们
                navSortByRank(data.aboutus, 'rank');
                //  联系我们
                data.contact = getContentList(data.contact, 1);

                this.setState(() => ({
                    data,
                }));
            });
    }

    //  点击二维码
    qrCodeClick = (qrCodeShowIndex, isClose) => {
        //  重复点击                                            强制关闭
        if (qrCodeShowIndex === this.state.qrCodeShowIndex || isClose) {
            qrCodeShowIndex = -1;
        }
        this.setState(() => ({
            qrCodeShowIndex,
        }));
    };
    //  展开底导航
    spreadClick = (isSpreadIndex) => {
        if (isSpreadIndex === this.state.isSpreadIndex) {
            isSpreadIndex = -1;
        }
        this.setState(() => ({
            isSpreadIndex,
        }));
    };

    render() {
        const {
            activeLinkIndex,
            isSpreadIndex,
            qrCodeShowIndex,
            data,
        } = this.state;
        return (
            <BasicFooterRender
                activeLinkIndex={activeLinkIndex}
                isSpreadIndex={isSpreadIndex}
                qrCodeShowIndex={qrCodeShowIndex}
                data={data}
                spreadClick={this.spreadClick}
                qrCodeClick={this.qrCodeClick}
            />
        );
    }
};