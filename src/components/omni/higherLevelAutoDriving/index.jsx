import React from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from '@store/reduxMap';
import style from './index.module.less';
import {BasicTitleDesc} from '@components/basicTitleDesc';
import {hasTitleAndImg} from "@utils/utils";

// const list = [
//     [
//         { title: '抢占市场先机', desc: '动态与细颗粒度感知定位，超前赋能L3+<br/>应用，帮助客户快速抢占市场' },
//         { title: '给予供应安全保障', desc: '自有的芯片<br/>保证供应安全' },
//     ],
//     [
//         { title: '车路打通，快速验证保障', desc: '车侧感知与路侧感知使用相同接口，<br/>快速打通，快速验证' },
//         { title: '开放生态，合作保障', desc: '通信、V2X、相机、激光雷达相关<br/>合作伙伴与政府支持丰富' },
//     ],
//     [
//         { title: '产品高性能组合', desc: '低延时方案+低功耗芯片，边缘部署，<br/>极致的速度相应' },
//         { title: '优化产品成本', desc: '成熟算法降低研发资源<br/>投入风险' },
//     ],
// ];
// const contentList = list.map((content, index) => {
//     return (
//         <ContentList content={content} key={index} index={index}/>
//     );
// });

//  Horizon Omni 赋能更高级别自动驾驶
export const HigherLevelAutoDriving = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({
       higherLevelAutoDrivingData,
   }) => {
        //  如果没有数据，或者没有title，或者没有img
        if (!hasTitleAndImg(higherLevelAutoDrivingData)) {
            return null;
        }
        return (
            <div id='higherLevelAutoDriving' className={style.higherLevelAutoDriving}>
                <BasicTitleDesc data={higherLevelAutoDrivingData} isLight={true}/>
                <div className={style.content}>
                    <div className={style.contentImg}
                         style={{backgroundImage: `url(${higherLevelAutoDrivingData.img || ''})`}}/>
                    {/*    <ul className={style.contentList}>*/}
                    {/*        {contentList}*/}
                    {/*    </ul>*/}
                </div>
            </div>
        );
    },
);
// //  赋能更高级别自动驾驶 的每一行
// const ContentList = ({content, index}) => {
//     return (
//         <li className={`${style.contentRows} ${!(index % 2) && style.spaceAround}`}>
//             <ContentCol content={content[0]} directionRight={false}/>
//             <ContentCol content={content[1]} directionRight={true}/>
//         </li>
//     );
// };
//
// //  赋能更高级别自动驾驶 的每一项
// const ContentCol = ({content = {}, directionRight}) => {
//     const {title = '', desc = ''} = content;
//     return (
//         <div className={`${style.contentCol} ${directionRight && style.directionRight}`}>
//             <div className={style.contentColImg}/>
//             <div className={style.contentAround}/>
//             <div className={style.contentText}>
//                 <div className={style.contentTitle} dangerouslySetInnerHTML={{__html: title}}/>
//                 <div className={style.contentDesc} dangerouslySetInnerHTML={{__html: desc}}/>
//             </div>
//         </div>
//     );
// };