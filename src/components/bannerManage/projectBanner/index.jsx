import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@store/reduxMap';
import sliderItemStyle from '../sliderItem.module.less';
import style from './index.module.less';
import './index.less';
import { isValidHTTPString, isValidResourceString } from '@utils/utils';

//  轮播每一项
export const ProjectBannerSliderItem = connect(
    mapStateToProps
)(({
    data,
    REDUCER_BROWSER_INFO,
    REDUCER_BANNER_INFO,
}) => {
    const { isRelativeWide } = REDUCER_BROWSER_INFO;
    const { projectBannerStyle } = REDUCER_BANNER_INFO;
    //  console.log('projectBannerStyle', projectBannerStyle);
    data._video = data.video;
    //  如果不是合法视频地址
    if (!isValidHTTPString(data.video) && !isValidResourceString(data.video)) {
        data._video = null;
    }
    return (
        <div className={`${sliderItemStyle.bannerSlider} ${style.bannerSlider} ${style[projectBannerStyle]}`}
            style={{ backgroundImage: `url(${data.img || ''})` }}
        >
            {
                (data._video && isRelativeWide)
                    ?
                    <video autoPlay='autoplay' muted='muted' loop='loop' preload='auto' playsInline={true}
                        webkit-playsinline='true' x5-video-player-type='h5' x5-video-orientation='portraint'
                        x5-video-player-fullscreen='true'
                        src={data._video} className={style.sliderItemVideo} />
                    : ''
                //                        <img className={style.sliderItemImg} src={data.img} alt={data.title || ''}/>
            }
            <div className={style.sliderText}>
                <p className={`${style.sliderTitle} ${data.title && data.title.length >= 20 ? style.textSmallSize : ''}`}
                    dangerouslySetInnerHTML={{ __html: data.title }} />
                <p className={`${style.sliderDescription} ${data.desc && data.desc.length >= 100 ? style.textSmallSize : ''}`}
                    dangerouslySetInnerHTML={{__html: data.desc}}/>
            </div>
        </div>
    );
}
);