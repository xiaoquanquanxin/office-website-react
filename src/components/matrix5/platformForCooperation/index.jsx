import React from 'react';
import style from './index.module.less';
import {BasicTitleDesc} from '@components/basicTitleDesc';
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "@store/reduxMap";
import {replaceRN} from "@utils/utils";

//  Matrix 5 ACP-自动驾驶计算平台合作
export const PlatformForCooperation = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({
       platformForCooperationData
   }) => {
    if (!platformForCooperationData) {
        return null;
    }
    const platformForCooperationList = (platformForCooperationData.list || []).map((item, index) => {
        //  替换\r\n
        item._desc = replaceRN(item.desc);
        return (
            <div className={style.platformForCooperationItem} key={index}>
                <div className={style.platformForCooperationTitle} dangerouslySetInnerHTML={{__html: item.title}}/>
                <div className={style.platformForCooperationDesc} dangerouslySetInnerHTML={{__html: item._desc}}/>
            </div>
        )
    });
    return (
        <div className={style.platformForCooperation}>
            <BasicTitleDesc data={platformForCooperationData} widthType={620} isLight={true}/>
            <img className={style.platformForCooperationImg} src={platformForCooperationData.img} alt=""/>
            <p className={style.platformForCooperationTitle2}
               dangerouslySetInnerHTML={{__html: platformForCooperationData.title2}}/>
            <div className={style.platformForCooperationList}>
                {platformForCooperationList}
            </div>
        </div>
    );
});
