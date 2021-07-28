import React from 'react';
import style from './index.module.less';
import {BasicTitleDesc} from '@components/basicTitleDesc';
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "@store/reduxMap";

//  Matrix 5自动驾驶计算平台特点
export const PlatformFeatures = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({
       platformFeaturesData
   }) => {
    if (!platformFeaturesData) {
        return null;
    }
    const platformFeaturesList = (platformFeaturesData.list || []).map((item, index) => {
        console.log(item)
        return (
            <div className={style.platformFeaturesItem}>
                <img className={style.platformFeaturesImg} src={item.img} alt=""/>
                <div className={style.platformFeaturesTitle} dangerouslySetInnerHTML={{__html: item.title}}/>
                <div className={style.platformFeaturesDesc} dangerouslySetInnerHTML={{__html: item.desc}}/>
            </div>
        )
    });
    return (
        <div className={style.platformFeatures}>
            <BasicTitleDesc data={platformFeaturesData} widthType={620}/>
            <div className={style.platformFeaturesList}>
                {platformFeaturesList}
            </div>
        </div>
    );
});
