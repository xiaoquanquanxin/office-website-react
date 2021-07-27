import React from 'react'
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "@store/reduxMap";
import {BasicTitleDesc} from "@components/basicTitleDesc";
import style from "./index.module.less";

//  方案架构
export const SolutionArchitecture = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({solutionArchitectureData}) => {
        //  如果没有数据，或者没有title，或者没有img
        if (!solutionArchitectureData || !solutionArchitectureData.title || !solutionArchitectureData.img) {
            return null;
        }
        return (
            <div id='solutionArchitecture' className={style.solutionArchitecture}>
                <BasicTitleDesc data={solutionArchitectureData} isLight={true}/>
                <div className={style.content}>
                    <div className={style.contentImg}
                         style={{backgroundImage: `url(${solutionArchitectureData.img || ''})`}}/>
                </div>
            </div>
        )
    }
);