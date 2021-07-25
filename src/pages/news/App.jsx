import React from 'react';
import { BasicHeader } from '@components/basicHeader';
import { BasicFooter } from '@components/basicFooter';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { commonRelativeWideFn, getBrowserInfo } from '@utils/utils';
import { NewsTabBox } from '@components/news/newsTabBox';
import { NewsList } from '@components/news/newsList';
import './index.less';
import { BannerManage } from '@components/bannerManage';
import { ScrollFixed } from '@components/scrollFixed';

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
        }

        render() {
            return (
                <div className="App">
                    {/*头部*/}
                    <BasicHeader onceHeader={{ isOnce: false }} />
                    {/*banner*/}
                    <BannerManage bannerType={4} />
                    {/*菜单*/}
                    {/*合作咨询定位组件*/}
                    <ScrollFixed RenderElement={NewsTabBox} />
                    {/*新闻内容*/}
                    <NewsList />
                    {/*<br/>*/}
                    {/*脚部*/}
                    <BasicFooter />
                </div>
            );
        }
    }
);