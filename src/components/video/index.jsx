import React from 'react';
import style from './index.module.less';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import layout from '@css/layout.module.less';

//  视频播放器
export const VideoWrap = connect(
    mapStateToProps,
    mapDispatchToProps
)(({
    REDUCER_VIDEO,
    setVideoOpenStatus,
}) => {
    const { videoIsOpen, videoSrc } = REDUCER_VIDEO;
    if (!videoSrc) {
        return '';
    }
    return (
        <div className={`${style.popVideoWrap} ${layout.mask}`} style={{ display: videoIsOpen ? 'flex' : 'none' }}>
            <div className={style.popVideoMain}>
                <video
                    id='mainVideo'
                    autoPlay
                    preload="auto"
                    controls="controls"
                    playsInline={true}
                    webkit-playsinline='true'
                    x5-video-player-type="h5"
                    x5-video-orientation="portraint"
                    x5-video-player-fullscreen="true"
                    src={videoSrc}
                    className={style.popVideo}
                />
                <div className={style.iconClose} onClick={() => { setVideoOpenStatus(false); }} />
            </div>
        </div>
    );
});