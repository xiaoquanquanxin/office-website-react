import React, {useLayoutEffect, useRef} from 'react';
import style from './index.module.less';
import {BasicTitleDesc} from '@components/basicTitleDesc';
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from '@store/reduxMap';

//  产品套件
export const SupportScenario = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({supportScenarioData}) => {
    if (!supportScenarioData) {
        return null;
    }
    return (
        <div className={style.supportScenario}
             style={{backgroundImage: supportScenarioData.img && `url(${supportScenarioData.img})`}}>
            <BasicTitleDesc data={supportScenarioData} isLight={true}/>
            <div className={style.supportScenarioContent}>
                <LeftSideMenu leftSideMenuData={supportScenarioData.list}/>
                <RightSideContent/>
            </div>
        </div>
    );
});

//  左侧菜单
const LeftSideMenu = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({leftSideMenuData, setSupportScenarioActiveData, REDUCER_DESIGN_IN}) => {
    //  滚动的wrap
    const wrapEl = useRef(null);
    //  激活的tab
    const activeEl = useRef(null);
    //  被激活的场景项目
    const {supportScenarioActiveData} = REDUCER_DESIGN_IN;
    const list = (leftSideMenuData || []).map((item, index) => {
        return (
            <li key={index}
                ref={item === supportScenarioActiveData ? activeEl : null}
                className={`${style.leftItem} ${item === supportScenarioActiveData ? style.leftItemActive : null}`}
                dangerouslySetInnerHTML={{__html: item.title}}
                onClick={() => {
                    setSupportScenarioActiveData(item);
                }}
            />
        );
    });
    useLayoutEffect(() => {
        const {clientWidth: wrapElClientWidth, offsetLeft: wrapElOffsetLeft} = wrapEl.current;
        if (!activeEl.current) {
            return;
        }
        //  激活元素 的定位
        const {clientWidth: activeElClientWidth, offsetLeft: activeElOffsetLeft} = activeEl.current;
        const diffX = (wrapElClientWidth - activeElClientWidth) / 2;
        const offsetLeft = activeElOffsetLeft - wrapElOffsetLeft;
        // console.log(`diffX  ${diffX} offsetLeft ${offsetLeft}`);
        wrapEl.current.scrollTo({left: offsetLeft - diffX, behavior: 'smooth'});

    }, [supportScenarioActiveData])
    return (
        <div className={style.leftWrap} ref={wrapEl}>
            <ul className={style.leftSideMenuData}>
                {list}
            </ul>
        </div>
    );
});

//  右侧内容
const RightSideContent = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({REDUCER_DESIGN_IN}) => {
    //  被激活的场景项目
    const {supportScenarioActiveData} = REDUCER_DESIGN_IN;
    if (!supportScenarioActiveData) {
        return null;
    }
    return (
        <div className={style.rightSideContent}>
            <p className={style.desc} dangerouslySetInnerHTML={{__html: supportScenarioActiveData.desc}}/>
            <img className={style.img} src={supportScenarioActiveData.img} alt="详情"/>
        </div>
    );
});