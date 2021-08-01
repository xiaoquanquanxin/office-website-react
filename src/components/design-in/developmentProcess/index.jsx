import React from 'react';
import style from './index.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';

//  开发流程
export const DevelopmentProcess = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({ developmentProcessData, REDUCER_DESIGN_IN }) => {
    if (!developmentProcessData) {
        return null;
    }
    if (!developmentProcessData.list || !developmentProcessData.list.length) {
        return null;
    }
    //  点击的开发流程
    const { activeDevelopmentProcessData } = REDUCER_DESIGN_IN;
    if (!activeDevelopmentProcessData) {
        return null;
    }
    return (
        <div className={style.developmentProcess}>
            <BasicTitleDesc data={developmentProcessData} isLight={true}/>
            <div className={style.tabList}>
                <Tab tabData={developmentProcessData.list[0]}/>
                <Tab tabData={developmentProcessData.list[1]}/>
            </div>
            <img className={style.img} src={activeDevelopmentProcessData.img} alt="详情"/>
        </div>
    );
});

const Tab = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({ tabData, setDevelopmentProcessData, REDUCER_DESIGN_IN }) => {
    const { activeDevelopmentProcessData } = REDUCER_DESIGN_IN;
    if (!activeDevelopmentProcessData) {
        return null;
    }
    return (
        <div className={`${style.tab} ${tabData === activeDevelopmentProcessData ? style.activeTab : null}`}
             dangerouslySetInnerHTML={{ __html: tabData.title }}
             onClick={() => {
                 setDevelopmentProcessData(tabData);
             }}
        />
    );
});