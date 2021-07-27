import React from 'react'
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "@store/reduxMap";
import {BasicTitleDesc} from "@components/basicTitleDesc";
import style from "./index.module.less";
import {hasTitleAndImg} from "@utils/utils";

//      数据1
const topBlockData = [
    {title: '执行机构'},
    {title: '毫米波雷达*5', icon: ''},
    {title: '超声波雷达*12', icon: ''},
    {title: '激光雷达1+', icon: ''},
    {title: '摄像头*16+', icon: ''},
    {title: '麦克风*4+', icon: ''},
]


//  下面复杂的结构数据
const contentBlockData = {
    control: '控制',
    title: '感知/定位/融合/决策/规划',
    MCU1: 'MCU1',
    MCU2: 'MCU2',
    blockList: [
        {
            title: '征程5#1',
            desc: [
                '8MP主前视觉感知',
                '2MP周视觉感知',
                '视觉定位',
                '11V MCMOT',
                'BEV传感器融合'
            ]
        }, {
            title: '征程5#1',
            desc: [
                '8MP主前视觉感知',
                '2MP周视觉感知',
                '视觉定位',
                '11V MCMOT',
                'BEV传感器融合'
            ]
        }, {
            title: '征程5#1',
            desc: [
                '8MP主前视觉感知',
                '2MP周视觉感知',
                '视觉定位',
                '11V MCMOT',
                'BEV传感器融合'
            ]
        }, {
            title: '征程5#1',
            desc: [
                '8MP主前视觉感知',
                '2MP周视觉感知',
                '视觉定位',
                '11V MCMOT',
                'BEV传感器融合'
            ]
        },
    ],
    bottom: '高速主干网ETH/PCIe(车载计算机内部)'
}
//  系统架构
export const SuperDriveSystemArchitecture = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({
       superDriveSystemArchitectureData
   }) => {
        //  如果没有数据，或者没有title，或者没有img
        if (!hasTitleAndImg(superDriveSystemArchitectureData)) {
            return null;
        }
        return (
            <div id='superDriveSystemArchitecture' className={style.superDriveSystemArchitecture}>
                <BasicTitleDesc data={superDriveSystemArchitectureData} isLight={true}/>
                <div className={style.content} style={{backgroundImage: `url(${superDriveSystemArchitectureData.img})`}}>
                    {/*<TopBlock topBlockData={topBlockData}/>*/}
                    {/*<ContentBlock contentBlockData={contentBlockData}/>*/}
                </div>
            </div>
        )
    }
);

//  头部6个块
const TopBlock = ({topBlockData}) => {
    const topBlockItems = topBlockData.map((topBlockItem, index) => {
        return (
            <div className={style.topBlockItem} key={index}>
                <i>{topBlockItem.icon}</i>
                <span className={style.topBlockItemText}>{topBlockItem.title}</span>
                {
                    (index === 0) && <span className={style.can}>CAN</span>
                }
            </div>
        )
    })
    return (
        <div className={style.topBlock}>
            {topBlockItems}
        </div>
    )
}


//  下面复杂的结构
const ContentBlock = ({contentBlockData}) => {
    //  中间右侧4个块
    const blockList = contentBlockData.blockList.map(((item, index) => {
        const list = item.desc.map((desc, _index) => {
            return (
                <div key={_index} className={style.contentBlockItemDesc}>{desc}</div>
            )
        })
        return (
            <div key={index} className={style.contentBlockItem}>
                <p className={style.contentBlockItemTitle}>{item.title}</p>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }))
    return (
        <div className={style.contentBlock}>
            <div className={style.contentTop}>
                <div className={`${style.control} ${style.linearGradient} ${style.verticalHorizontalCenter}`}>
                    {contentBlockData.control}
                </div>
                <div className={`${style.title} ${style.verticalHorizontalCenter}`}>
                    {contentBlockData.title}
                </div>
            </div>
            <div className={style.contentMiddle}>
                <div className={style.contentLeft}>
                    <div className={`${style.MCU1} ${style.linearGradient} ${style.verticalHorizontalCenter}`}>
                        {contentBlockData.MCU1}
                    </div>
                    <div className={`${style.MCU2} ${style.linearGradient} ${style.verticalHorizontalCenter}`}>
                        {contentBlockData.MCU2}
                    </div>
                </div>
                <div className={style.contentRight}>
                    {blockList}
                </div>
            </div>
            <div className={`${style.contentBottom} ${style.linearGradient} ${style.verticalHorizontalCenter}`}>
                {contentBlockData.bottom}
            </div>
        </div>
    )
}