import React from 'react';
import style from './index.module.less';
import {BasicTitleDesc} from '@components/basicTitleDesc';
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from '@store/reduxMap';

//  开发流程
export const SuccessfulCases = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({successfulCasesData}) => {
    if (!successfulCasesData) {
        return null;
    }
    const list = (successfulCasesData.list || []).map((item, index) => {
        return (
            <li className={style.successfulCasesItem} key={index}>
                <img className={style.successfulCasesItemImg} alt="" src={item.img}/>
                <p className={style.successfulCasesItemDesc} dangerouslySetInnerHTML={{__html: item.title}}/>
            </li>
        );
    });
    return (
        <div className={style.successfulCases}>
            <BasicTitleDesc data={successfulCasesData}/>
            <p className={style.successfulCasesTitle2} dangerouslySetInnerHTML={{__html: successfulCasesData.title2}}/>
            <ul className={style.successfulCasesList}>
                {list}
            </ul>
        </div>
    );
});



