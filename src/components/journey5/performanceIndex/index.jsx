import React from 'react';
import style from './index.module.less';
import {BasicTitleDesc} from "@components/basicTitleDesc";
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "@store/reduxMap";

//  数据
// const performanceIndexData = {
//     pcList: [
//         [
//             '双核BPU   贝叶斯架构',
//             '高性能等效算力128 TOPS',
//         ],
//         [
//             '八核 Arm   Cortex  -A55 CPU集群',
//             'CV引擎，双核DSP，双核ISP，强力Codec',
//         ],
//         [
//             '支持多路4K及全高清视频输入及处理',
//             '双核锁步MCU，功能安全等级达 ASIL-B(D)',
//         ],
//         [
//             '全面符合 AEC - Q100 Grade 2 车规级标准'
//         ]
//     ],
//     mobileList: [
//         '双核BPU   贝叶斯架构',
//         '高性能等效算力128 TOPS',
//         '八核 Arm   Cortex  -A55 CPU集群',
//         'CV引擎，双核DSP，双核ISP，强力Codec',
//         '支持多路4K及全高清视频输入及处理',
//         '双核锁步MCU，功能安全等级达 ASIL-B(D)',
//         '全面符合 AEC-Q100 Grade 2 车规级标准'
//     ]
// }

//  性能指标
export const PerformanceIndex = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({performanceIndexData}) => {
    if (!performanceIndexData) {
        return null;
    }
    //  这里，渲染2套，如果是pc，展示符合list，如果是Mobile，展示单一list
    const pcList = (performanceIndexData.pcList || []).map((item, index) => {
        return (
            <li key={index} className={style.performanceIndexItem}>
                <div dangerouslySetInnerHTML={{__html: item[0]}} className={style.content}/>
                <div dangerouslySetInnerHTML={{__html: item[1]}} className={style.content}/>
            </li>
        )
    });
    const mobileList = (performanceIndexData.mobileList || []).map((item, index) => {
        return (
            <li key={index} className={style.performanceIndexItem}>
                <div dangerouslySetInnerHTML={{__html: item}} className={style.content}/>
            </li>
        )
    });
    return (
        <div className={style.performanceIndex}>
            <BasicTitleDesc data={performanceIndexData}/>
            <ul className={`${style.performanceIndexList} ${style.performanceIndexPcList}`}>{pcList}</ul>
            <ul className={`${style.performanceIndexList} ${style.performanceIndexMobileList}`}>{mobileList}</ul>
            <br/>
        </div>
    );
});
