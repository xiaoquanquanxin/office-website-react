import React from 'react';
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
    //  被激活的场景项目
    const {supportScenarioActiveData} = REDUCER_DESIGN_IN;
    const list = (leftSideMenuData || []).map((item, index) => {
        return (
            <li key={index}
                className={`${style.leftItem} ${item === supportScenarioActiveData ? style.leftItemActive : null}`}
                dangerouslySetInnerHTML={{__html: item.title}}
                onClick={() => {
                    setSupportScenarioActiveData(item);
                }}
            />
        );
    });
    return (
        <div className={style.leftWrap}>
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