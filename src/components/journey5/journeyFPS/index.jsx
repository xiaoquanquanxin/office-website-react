import React from 'react'
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "@store/reduxMap";
import {BasicTitleDesc} from "@components/basicTitleDesc";
import style from "./index.module.less";
import {hasTitleAndImg} from "@utils/utils";

//  征程  5 (6391 FPS)
export const JourneyFPS = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({JourneyFPSData}) => {
        //  如果没有数据，或者没有title，或者没有img
        if (!hasTitleAndImg(JourneyFPSData)) {
            return null;
        }
        return (
            <div id='journeyFPS' className={style.journeyFPS}>
                <BasicTitleDesc data={JourneyFPSData}/>
                <div className={style.content}>
                    <div className={style.contentImg}
                         style={{backgroundImage: `url(${JourneyFPSData.img || ''})`}}/>
                </div>
            </div>
        )
    }
);