import React from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import './index.less';
import style from './index.module.less';
import sliderItemStyle from '@components/bannerManage/sliderItem.module.less';
import { isValidHTTPString } from '@utils/utils';

//  matrix 轮播
export const MatrixSliderItem = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({
    data,
    REDUCER_BROWSER_INFO,
}) => {
    const { isRelativeWide } = REDUCER_BROWSER_INFO;
    data._video = data.video;
    //  如果不是合法视频地址
    if (!isValidHTTPString(data.video)) {
        data._video = null;
    }
    return (
        <div className={`${sliderItemStyle.bannerSlider} ${style.bannerSlider}`}>
            {
                (data._video && isRelativeWide)
                    ?
                    <video autoPlay='autoplay' muted='muted' loop='loop' preload='auto' playsInline={true}
                        webkit-playsinline='true' x5-video-player-type='h5' x5-video-orientation='portraint'
                        x5-video-player-fullscreen='true'
                        src={data._video} className={style.sliderItemVideo} />
                    : <div className={style.sliderItemImg} style={{
                        backgroundImage: `url(${data.img || ''})`
                    }} />
            }
            <div className={style.textDesc}>
                <p className={style.title} dangerouslySetInnerHTML={{ __html: data.title }} />
                <p className={style.sTitle} dangerouslySetInnerHTML={{ __html: data.title2 }} />
                <div className={style.desc} dangerouslySetInnerHTML={{ __html: data.desc }} />
                <div className={style.line} />
            </div>
        </div>
    );
}
);
