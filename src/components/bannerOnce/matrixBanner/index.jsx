import React from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { isValidHTTPString } from '@utils/utils';
import style from '@components/bannerOnce/index.module.less';

export const MatrixSliderItem = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({
    data,
    REDUCER_BROWSER_INFO,
    bannerType,
}) => {
    const { isRelativeWide } = REDUCER_BROWSER_INFO;
    data._video = data.video;
    //  如果不是合法视频地址
    if (!isValidHTTPString(data.video)) {
        data._video = null;
    }
    //  console.log(bannerType);
    const classNameTypeMap = {
        //  matrix2
        11:'whiteBannerOnce',
        //  matrix5
        25:'whiteBannerMatrix5',
    }
    return (
        <div className={`${style.bannerOnce} ${classNameTypeMap[bannerType]}`}>
            <div className={`${style.bannerSlider}`}>
                {
                    (data._video && isRelativeWide)
                        ? <video className={style.sliderItemVideo} autoPlay='autoplay' muted='muted' loop='loop' preload='auto' playsInline={true}
                            webkit-playsinline='true' x5-video-player-type='h5' x5-video-orientation='portraint'
                            x5-video-player-fullscreen='true'
                            src={data._video} />
                        : <img src={data.img} className={style.sliderItemImg} alt='' />
                }
                <div className={style.textDesc}>
                    <p className={`${style.title} whiteTitle`} dangerouslySetInnerHTML={{ __html: data.title }} />
                    <div className={`${style.line} ${style.line1}`} />
                    <p className={`${style.sTitle} whitesTitle`} dangerouslySetInnerHTML={{ __html: data.title2 }} />
                    <div className={`${style.desc} whiteDesc`} dangerouslySetInnerHTML={{ __html: data.desc }} />
                    <div className={`${style.line} ${style.line2}`} />
                </div>
            </div>
        </div>
    );
}
);
