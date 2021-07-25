import React from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { requestGetNewsList } from '@api/index';

import { MainListItem } from '@components/news/newsList/mainListItem';
import { RelativeArticle } from '@components/relativeArticle';
import style from './index.module.less';

export const NewsList = connect(
    mapStateToProps,
    mapDispatchToProps
)(class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            //  主数据
            dataList: null,
            //  相关文章数据
            relateList: null,
            //  有更多数据
            hasMoreData: true,
            //  可以点击
            canClick: true,
        };
    }

    componentDidMount() {
        this.getNewsList();
    }

    //  仅关心是否分页
    componentDidUpdate(prevProps, prevState, snapshot) {
        //  console.log(prevProps.REDUCER_NEWS_TAB_BOX, this.props.REDUCER_NEWS_TAB_BOX);
        const { activeIndex: prevActiveIndex } = prevProps.REDUCER_NEWS_TAB_BOX;
        const { activeIndex } = this.props.REDUCER_NEWS_TAB_BOX;
        //  console.log(prevActiveIndex, activeIndex);

        //  只有这个activeIndex变化了，才重置零
        if (prevActiveIndex !== activeIndex) {
            this.setState(() => {
                return {
                    //  重置页码
                    page: 1,
                    //  数据
                    dataList: null,
                    //  相关文章
                    relateList: null,
                    //  更多数据
                    hasMoreData: true,
                    //  可以点击
                    canClick: true,
                };
            });
            //  必须等一帧
            window.requestAnimationFrame(() => {
                this.getNewsList();
            });
        }
    }

    //  请求
    getNewsList() {
        const { activeIndex } = this.props.REDUCER_NEWS_TAB_BOX;
        //  console.log('list请求数据', activeIndex,this.state.page);
        const { page, dataList, relateList, canClick } = this.state;
        //  console.log(canClick);
        //  如果不能点击
        if (!canClick) {
            return false;
        }
        //  console.log('发送请求');
        //  发请求的过程中，不能点击
        this.setState(() => {
            return {
                canClick: false,
            };
        });
        requestGetNewsList(activeIndex, page)
            .then(v => {
                //  console.log(v);
                //  主数据没有排序
                //  navSortByRank(v.data, 'rank');
                //  相关文章数据也没有排序
                //  navSortByRank(v.relate, 'rank');
                this.setState(() => {
                    return {
                        hasMoreData: v.data.length === 5,
                        dataList: dataList ? dataList.concat(v.data) : v.data,
                        relateList: relateList ? relateList : v.relate,
                        canClick: v.data.length === 5,
                    };
                }
                );
            })
            .catch(err => {
                if (Number(activeIndex) !== 0) {
                    //  设置给store redux，因为这个请求出错了，所以要重置为零
                    this.props.setTabBoxActiveIndex(0);
                }
            });
    }

    //  加载更多
    loadMore() {
        const { page, canClick } = this.state;
        if (!canClick) {
            return false;
        }
        this.setState(() => {
            return {
                page: page + 1,
            };
        });
        //  必须等一帧
        window.requestAnimationFrame(() => {
            this.getNewsList();
        });
    }

    render() {
        const { dataList, relateList, hasMoreData } = this.state;
        //  主数据模块
        const mainList = (dataList && dataList.length && dataList.map(item => {
            return (
                <MainListItem key={item.id} data={item} />
            );
        })) || [];
        //const {newsCategoryDataMap } = this.props;
        //console.log(newsCategoryDataMap);
        return (
            <div className={style.listRelative}>
                <div className={style.listInner}>
                    <div className={style.listBox}>
                        <ul className={style.mainList}>
                            {mainList}
                        </ul>
                        {
                            (!hasMoreData || mainList.length === 0)
                                ? <div className={style.emptyText}>没有更多了...</div>
                                : <div className={style.addMore} onClick={() => { this.loadMore(); }}>加载更多</div>
                        }
                    </div>
                    {/*相关文章数据模块*/}
                    <RelativeArticle relateList={relateList} />
                </div>
            </div>
        );
    }
}
);
