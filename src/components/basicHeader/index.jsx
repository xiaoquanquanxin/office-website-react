import React from 'react';
import { HeaderPC } from '@components/basicHeader/headerPC';
import { HeaderMobile } from '@components/basicHeader/headerMobile';
import { requestGetSeo, requestHeaderNav } from '@api/index';
import { emptyFunction, navSortByRank, specialPathName } from '@utils/utils';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';

export const BasicHeader = connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    class extends React.Component {
        pathName;

        constructor(props) {
            super(props);
            //  是哪一个页面
            this.getHistoryMenu();
            this.pathName = window.location.pathname.replace(/\//ig, '') || 'index.html';
            this.state = {
                //  鼠标浮于上方，锁定白色
                isOverHeader: false,

                //  右侧菜单的折叠状态 true:折叠
                menuIsFold: true,
                //  是首页？
                isHomePage: this.pathName === 'index.html',
                //  展开的一级菜单的index - 移动端
                primaryIndex: -1,
                //  展开的二级菜单的index - 移动端
                secondaryIndex: -1,
            };
        }
        getHistoryMenu() {
            const isCliked = sessionStorage.getItem('menu-click')
            if (isCliked) {
                const menu = sessionStorage.getItem('menu')
                if (menu) {
                    const datas = JSON.parse(menu)
                    const { setNavListData } = this.props;
                    this.navSort(datas);
                    setNavListData(datas);
                    sessionStorage.removeItem('menu-click');
                }
            }
        }
        //  钩子
        componentDidMount() {
            //  发请求，取导航数据
            requestHeaderNav()
                .then(v => {
                    this.navSort(v.data);
                    //  设置导航数据
                    const { setNavListData } = this.props;
                    setNavListData(v.data);
                    sessionStorage.setItem('menu', JSON.stringify(v.data))
                    //  ⚠️⚠️特殊问题特殊处理
                    specialPathName(this.pathName, v.data);
                })
                .then(() => {
                    const { REDUCER_FIXED_TAB_BOX } = this.props;
                    const { barBoxData } = REDUCER_FIXED_TAB_BOX;
                    //  请求seo
                    requestGetSeo(barBoxData.id)
                        .then(v => {
                            const { data, code } = v;
                            if (!data || Number(code) < 0) {
                                return;
                            }
                            // data.og_image = window.location.origin + data.og_image;
                            const {
                                title,
                                keywords,
                                description,
                                og_site_name,
                                og_type,
                                og_url,
                                og_title,
                                og_description,
                                og_image,
                            } = data;
                            // console.log('🍎');
                            window.document.title = title;
                            const metaKeyword = document.querySelector('#metaKeyword');
                            metaKeyword.content = keywords;
                            const metaDesc = document.querySelector('#metaDesc');
                            metaDesc.content = description;
                            const metaSiteName = document.querySelector('#metaSiteName');
                            metaSiteName.content = og_site_name;
                            const metaType = document.querySelector('#metaType');
                            metaType.content = og_type;
                            const metaUrl = document.querySelector('#metaUrl');
                            metaUrl.content = og_url;
                            const metaTitle = document.querySelector('#metaTitle');
                            metaTitle.content = og_title;
                            const metaDescription = document.querySelector('#metaDescription');
                            metaDescription.content = og_description;
                            const metaImage = document.querySelector('#metaImage');
                            metaImage.content = og_image;
                        })
                        .catch(emptyFunction);
                });
        }

        //  渲染函数
        render() {
            const {
                isOverHeader,
                menuIsFold,
                isHomePage,
                primaryIndex,
                secondaryIndex,
            } = this.state;
            const {
                isRelativeWide
            } = this.props.REDUCER_BROWSER_INFO;
            // console.log(this.props.onceHeader.isOnce)
            return (
                //  pc？
                isRelativeWide ?
                    <HeaderPC
                        isOverHeader={isOverHeader}
                        isHomePage={isHomePage}
                        headerMouseOver={this.headerMouseOver}
                        headerMouseLeave={this.headerMouseLeave}
                        isOnce={this.props.onceHeader.isOnce}
                    /> :
                    <HeaderMobile
                        menuIsFold={menuIsFold}
                        isHomePage={isHomePage}
                        primaryIndex={primaryIndex}
                        secondaryIndex={secondaryIndex}
                        primaryMenuClick={this.primaryMenuClick}
                        secondaryMenuClick={this.secondaryMenuClick}
                        menuFoldClick={this.menuFoldClick}
                    />
            );
        }

        /**
         * 导航排序
         * @param {Array} list              数据
         * @return {boolean}                子路由有没有被选中
         * **/
        navSort(list) {
            navSortByRank(list, 'rank');
            //  当前路由有没有被选中
            let currentHasActive = false;
            for (let value of list) {
                //  console.log(value.url);
                //  如果遍历到的url和当前页面的url匹配，那么，我当前选中的就是这个路由，它的div应该是激活态

                if (value.url === null) {
                    //  console.log(value.url, value);
                } else if (value.url === this.pathName) {
                    //  console.log('匹配到的页面，这个路由是激活的🐸');
                    //  console.log(value);
                    //  给 FixedBarBox 加状态，
                    const { setBarBoxData } = this.props;
                    setBarBoxData(value);
                    //  激活态
                    value.isActive = true;
                    //  不需要跳转
                    value.url = null;
                    currentHasActive = true;
                } else if (!value.url.includes('.html') && !value.url.includes('http')) {
                    //  如果不包含.html后缀，说明是死路由
                    value.url = null;
                }
                //  如果没有子路由
                if (!value.son || !value.son.length) {
                    value.son = null;
                } else {
                    //  排子列表
                    const childIsActive = this.navSort(value.son);
                    //  子路由有没有被选中
                    if (childIsActive) {
                        value.isActive = true;
                        currentHasActive = true;
                    }
                }
            }
            return currentHasActive;
        }

        //  头部右侧折叠框的点击事件
        menuFoldClick = (menuIsFold) => {
            this.setState(() => {
                return {
                    menuIsFold: !menuIsFold
                };
            });
        };
        //  一级菜单点击事件
        primaryMenuClick = (primaryIndex) => {
            //  如果点击的还是原来那个
            if (this.state.primaryIndex === primaryIndex) {
                primaryIndex = -1;
            } else {
                //  点击的不同，次级index重置
                this.setState(() => ({
                    secondaryIndex: -1
                }));
            }
            this.setState(() => ({
                primaryIndex,
            }));
        };
        //  次级菜单点击事件
        secondaryMenuClick = (secondaryIndex) => {
            if (this.state.secondaryIndex === secondaryIndex) {
                secondaryIndex = -1;
            }
            this.setState(() => ({
                secondaryIndex,
            }));
        };

        //  鼠标浮于上方
        headerMouseOver = () => {
            //  告诉子组件我不是在顶部，以展示白色
            this.setState(() => {
                return {
                    isOverHeader: true,
                };
            });
        };
        //  鼠标离开
        headerMouseLeave = () => {
            this.setState(() => {
                return {
                    isOverHeader: false,
                };
            });
        };
    }
);

