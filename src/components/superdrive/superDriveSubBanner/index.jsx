import React from 'react'
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "@store/reduxMap";
import style from "./index.module.less";


//  数据
// const superDriveSubBannerData = [
//     {
//         title: '高性能',
//         desc: '基于高性能国产AI芯片的高安全性解决方案',
//         img: '',
//         icon: ''
//     },
//     {
//         title: '多传感器',
//         desc: '47颗传感器支持，智能化感知武装到牙齿；从L3到L4，从自动驾驶到人机共驾，全面覆盖',
//         img: '',
//         icon: ''
//     },
//
//     {
//         title: '智能车云',
//         desc: '智能车云，整合高精地图、AI开发平台、智能汽车运营等全方位云端智能化，构建智能汽车核心能力',
//         img: '',
//         icon: ''
//     },
//     {
//         title: '车路协同',
//         desc: '整合智能交通，支持车路协同功能的落地，极大提升系统安全性',
//         img: '',
//         icon: ''
//     }
//
// ]
//  方案架构
export const SuperDriveSubBanner = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({
       superDriveSubBannerData
   }) => {
        if (!superDriveSubBannerData) {
            return null;
        }
        const superDriveSubBannerList = superDriveSubBannerData.map((item, index) => {
            return (
                <li key={index} className={style.superDriveSubBannerItem} style={{backgroundImage: `url(${item.img})`}}>
                    {/*<div className={style.superDriveSubBannerIcon}/>*/}
                    <p className={style.superDriveSubBannerTitle} dangerouslySetInnerHTML={{__html: item.title}}/>
                    {/*<p className={style.superDriveSubBannerSpliter}/>*/}
                    <p className={style.superDriveSubBannerDesc} dangerouslySetInnerHTML={{__html: item.desc}}/>
                </li>
            )
        })
        return (
            <ul id='superDriveSubBanner' className={style.superDriveSubBanner}>
                {superDriveSubBannerList}
            </ul>
        )
    }
);