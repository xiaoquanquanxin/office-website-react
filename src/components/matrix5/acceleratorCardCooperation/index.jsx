import React from 'react';
import style from './index.module.less';
import {BasicTitleDesc} from '@components/basicTitleDesc';
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "@store/reduxMap";
import {replaceRN} from "@utils/utils";

// Matrix 5 PAC-加速卡合作
export const AcceleratorCardCooperation = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({
       acceleratorCardCooperationData
   }) => {
    if (!acceleratorCardCooperationData) {
        return null;
    }
    const acceleratorCardCooperationList = (acceleratorCardCooperationData.list || []).map((item, index) => {
        //  替换\r\n
        item._desc = replaceRN(item.desc);
        return (
            <div className={style.acceleratorCardCooperationItem} key={index}>
                <div className={style.acceleratorCardCooperationTitle} dangerouslySetInnerHTML={{__html: item.title}}/>
                <div className={style.acceleratorCardCooperationDesc} dangerouslySetInnerHTML={{__html: item._desc}}/>
            </div>
        )
    });
    return (
        <div className={style.acceleratorCardCooperation}>
            <BasicTitleDesc data={acceleratorCardCooperationData}/>
            <img className={style.acceleratorCardCooperationImg} src={acceleratorCardCooperationData.img} alt=""/>
            <p className={style.acceleratorCardCooperationTitle2}
               dangerouslySetInnerHTML={{__html: acceleratorCardCooperationData.title2}}/>
            <div className={style.acceleratorCardCooperationList}>
                {acceleratorCardCooperationList}
            </div>
        </div>
    );
});

