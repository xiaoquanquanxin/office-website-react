import React from 'react';
import style from './index.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

//  强大的视频处理能力
export const VideoProcessing = ({
    videoProcessingData
}) => {
    videoProcessingData = videoProcessingData || {};
    return (
        <div className={style.videoProcessing}>
            <BasicTitleDesc data={videoProcessingData} widthType={918} />
            <img className={style.img} alt=''
                src={videoProcessingData.img || ''}
            />
        </div>
    );
};