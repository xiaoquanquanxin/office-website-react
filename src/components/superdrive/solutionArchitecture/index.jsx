import React from 'react'
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "@store/reduxMap";
import {BasicTitleDesc} from "@components/basicTitleDesc";
import style from "./index.module.less";

//  方案架构
export const SolutionArchitecture = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({}) => {
        const data = {title: '方案架构'};
        return (
            <div id='solutionArchitecture' className={style.solutionArchitecture}>
                <BasicTitleDesc data={data} isLight={true}/>
                <div className={style.content}>
                    <div className={style.contentImg}/>
                </div>
            </div>
        )
    }
);