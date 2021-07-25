import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@store/reduxMap';
import { isValidHTTPString, isValidResourceString } from '@utils/utils';
import sliderItemStyle from '../sliderItem.module.less';
import style from './index.module.less';
import './index.less';

//  轮播每一项
export const AboutBannerSliderItem = connect(
    mapStateToProps
)(({
    data,
    REDUCER_BROWSER_INFO,
}) => {
    const { isRelativeWide } = REDUCER_BROWSER_INFO;
    //  如果不是合法视频地址
    data._video = data.video;
    if (!isValidHTTPString(data.video) && !isValidResourceString(data.video)) {
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
                    : <img className={style.sliderItemImg} src={data.img} alt={data.title || ''} />
            }
            <p className={style.sliderTitle}>{data.title}</p>
        </div>
    );
}
);