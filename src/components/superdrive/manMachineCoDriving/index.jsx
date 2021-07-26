import React from 'react'
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "@store/reduxMap";
import {BasicTitleDesc} from "@components/basicTitleDesc";
import style from "./index.module.less";

//  数据
const manMachineCoDrivingData = [
    {
        title: '高速场景',
        desc: [
            '自动上下匝道',
            '智能匝道通行',
            '车流汇入/汇出',
            '收费站通行',
            '路权决策',
        ]
    },
    {
        title: '城区场景',
        desc: [
            '红绿灯识别',
            '提升醒目性',
            '环岛通行',
            '十字路口通行',
            '无保护左转'
        ]
    },
    {
        title: '泊车场景',
        desc: [
            '多种车位识别',
            '实时视觉定位',
            '记忆泊入/泊出',
            '低速紧急制动',
            '动态路径规划'
        ]
    },
    {
        title: '智能交互场景',
        desc: [
            '疲劳驾驶缓解',
            '分神提醒',
            '智能车控',
            '个性化关怀',
            '智能声音调节',
        ]
    },
    {
        title: '人机共驾场景',
        desc: [
            '智能接管',
            '语音控车',
            '动态ADAS报警',
            '智能驾驶策略',
            '驾驶策略预告',
        ]
    }
]
//  系统架构
export const ManMachineCoDriving = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({}) => {
        const data = {
            title: 'Horizon Matrix  超级驾驶解决方案<br/>实现全场景自动驾驶 & 人机共驾',
            desc: '·从城区到高速，从启动到泊车，人机共驾让每一次驾驶更轻松   ·个性化的智能交互以及整车智能，让驾驶者更加安心、更加舒适'
        };

        const manMachineCoDrivingList = manMachineCoDrivingData.map(((item, index) => {
            const descList = item.desc.map((desc, _index) => {
                return (
                    <p key={_index} className={style.manMachineCoDrivingDesc}>{desc}</p>
                )
            })
            return (
                <li key={index} className={style.manMachineCoDrivingItem}>
                    <div className={style.manMachineCoDrivingImg}/>
                    <div>
                        <p className={style.manMachineCoDrivingTitle}>{item.title}</p>
                        {descList}
                    </div>
                </li>
            )
        }))
        return (
            <div id='manMachineCoDriving' className={style.manMachineCoDriving}>
                <BasicTitleDesc data={data}/>
                <br/>
                <ul className={style.manMachineCoDrivingList}>
                    {manMachineCoDrivingList}
                </ul>
            </div>
        )
    }
);
