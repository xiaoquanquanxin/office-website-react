import React from 'react';
import style from './index.module.less';
import layout from '@css/layout.module.less';
//  白色箭头，取自header
import currSrc from '@media/basicHeader/icon-arrow-white.png';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';

//  链接项
const Link = ({ url, name, activeLinkIndex }) => (
    <dd>
        {url ?
            <a className={`${style.link} ${layout.inlineBlock} ${activeLinkIndex ? '' : ''}`} href={url}>{name}</a>
            : <span className={`${style.noLinking} ${layout.inlineBlock}`}>{name}</span>
        }
    </dd>
);
//  链接的一列
const LinkListItem = connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    ({
        //  文字链接区域的文字描述
        par,
        //  链接list
        linkList,
        //  当前模块是第几个，从零开始，下标
        currentIndex,
        //  展开的导航是第几个，从零开始，下标
        isSpreadIndex,
        //  当前链接列，第几个路由是被激活的
        activeLinkIndex,
        //  点击展开模块
        spreadClick,
        //  获取浏览器信息，来源于redux
        REDUCER_BROWSER_INFO,
    }) => {
        const isSpread = isSpreadIndex === currentIndex;
        //  生成块内链接list
        const list = linkList.map(item => {
            return (
                <Link
                    url={item.url}
                    key={item.id}
                    name={item.name}
                    activeLinkIndex={activeLinkIndex}
                />
            );
        });
        //  浏览器足够宽
        const { isRelativeWide } = REDUCER_BROWSER_INFO;
        return (
            <li className={`${style.linkItem} ${isRelativeWide ? layout.left : ''}`}>
                <p className={style.linkItemPar} onClick={() => { spreadClick(currentIndex); }}>
                    {/*文字链接区域的文字描述*/}
                    {par}
                    {/*箭头*/}
                    {isRelativeWide
                        ? ''
                        : <img src={currSrc} alt='箭头'
                            className={`${style.curr} ${isSpread ? style.isSpread : ''}`} />
                    }
                </p>
                <dl className={`${style.linkWrap} ${(isSpread || isRelativeWide) ? layout.block : layout.none}`}>
                    {list}
                </dl>
            </li>
        );
    }
);

export const LinkList = connect(
    mapStateToProps,
    mapDispatchToProps
)(
    ({
        //  被展开的链接块
        isSpreadIndex,
        //  被选中的link
        activeLinkIndex,
        //  数据
        data,
        //  展开底导航
        spreadClick,
        //  获取浏览器信息，来源于redux
        REDUCER_BROWSER_INFO,
    }) => {
        //  浏览器足够宽
        const { isRelativeWide } = REDUCER_BROWSER_INFO;
        if (data === null) {
            return '';
        }
        const list = [
            { par: '公司业务', key: 'solution' },
            { par: '公司产品', key: 'product' },
            { par: '关于我们', key: 'aboutus' },
            { par: '联系我们', key: 'contact' },
        ].map((item, index) => {
            return (
                <LinkListItem
                    key={index}
                    par={item.par}
                    linkList={data[item.key]}
                    currentIndex={index}
                    isSpreadIndex={isSpreadIndex}
                    activeLinkIndex={activeLinkIndex}
                    spreadClick={spreadClick}
                />
            );
        });
        return (
            <ul className={`${style.linkList} ${layout.clearfix} ${isRelativeWide ? layout.right : ''}`}>
                {list}
            </ul>
        );
    }
);