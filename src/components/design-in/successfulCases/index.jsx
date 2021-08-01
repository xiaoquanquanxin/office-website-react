import React from 'react';
import style from './index.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';

//  开发流程
export const SuccessfulCases = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({ successfulCasesData }) => {
    if (!successfulCasesData) {
        return null;
    }
    const list = (successfulCasesData.list || [1, 2, 3, 4, 5, 6, 7, 8]).map((item, index) => {
        return (
            <li className={style.successfulCasesItem} key={index}>
                <img alt="" className={style.successfulCasesItemImg}
                     src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng601fa7a265ea779fbca277c773904656f77114e4a7d40d28a4bb84036897012e"/>
                <p className={style.successfulCasesItemDesc}>众包地图</p>
            </li>
        );
    });
    return (
        <div className={style.successfulCases}>
            <BasicTitleDesc data={successfulCasesData}/>
            <p className={style.successfulCasesTitle2} dangerouslySetInnerHTML={{ __html: successfulCasesData.title2 }}/>
            <ul className={style.successfulCasesList}>
                {list}
            </ul>
        </div>
    );
});



