import React, { createRef } from 'react';
import { preventDefaultFn } from '@utils/eventListener';
import { mapStateToProps, mapDispatchToProps } from '@store/reduxMap';
import { connect } from 'react-redux';
import { CustomSwiper } from '@components/swiper';
import style from './index.module.less';
import sliderItemStyle from '@components/bannerManage/sliderItem.module.less';
import './index.less';
//  slick的最内部展示组件
export const IndexBannerSliderItem = connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    class extends React.Component {
        infoRef;
        titleRef;

        constructor(props) {
            super(props);
            this.infoRef = createRef();
            this.titleRef = createRef();
            this.clients = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        }

        render() {
            let { data, REDUCER_BROWSER_INFO } = this.props
            let {
                //  视频
                video,
                //  图片地址
                img,
                //  title
                title,
                //  描述
                desc,
                //  链接
                url,
            } = data;
            //  如果不是合法视频地址
            let _video = video;
            //  ⚠️只有null和 "0" 两种
            if (video === '0') {
                _video = null;
            }
            //  如果不是合法链接
            if (url === '0') {
                url = null;
            }
            //  如果页面不够宽
            if (!REDUCER_BROWSER_INFO.isRelativeWide) {
                _video = null;
            }
            const { current: infoRef } = this.infoRef;
            const { current: titleRef } = this.titleRef;
            if (infoRef && titleRef) {
                if (titleRef.getBoundingClientRect().top <= this.clients
                    && titleRef.getBoundingClientRect().top >= 0
                ) {
                    infoRef.style.transform = 'translateY(0)'
                    infoRef.style.opacity = 1

                } else {
                    infoRef.style.transform = 'translateY(40px)'
                    infoRef.style.opacity = 0
                }
            }
            return (
                <div className={`${sliderItemStyle.bannerSlider} ${style.bannerSlider}`}>
                    {/*视频优先*/}
                    {REDUCER_BROWSER_INFO.isRelativeWide && _video ?
                        <video autoPlay='autoplay' muted='muted' loop='loop' preload='auto' playsInline={true}
                            webkit-playsinline='true' x5-video-player-type='h5' x5-video-orientation='portraint'
                            x5-video-player-fullscreen='true'
                            src={_video} className={style.sliderItemVideo} />
                        :
                        <img src={img} alt={desc} className={style.sliderItemImg} />
                    }
                    <div className={style.sliderItemText} ref={this.infoRef}>
                        <p className={style.title} ref={this.titleRef} dangerouslySetInnerHTML={{ __html: title }} />
                        <div className={style.description} dangerouslySetInnerHTML={{ __html: desc }} />
                    </div>
                    {/*全局遮罩，防止拖拽*/}
                    {url
                        ? <a href={url} onDragStart={preventDefaultFn} className={style.link}>&emsp;</a>
                        : <span className={style.link} />}
                </div>
            );
        }
    }
);

//  本组件暴露
export const BannerSwiper = ({
    swiperData
}) => {
    return (
        <div className={style.bannerSwiper} id='bannerSwiper'>
            <div className={style.container}>
                <CustomSwiper
                    swiperData={swiperData}
                    sliderItemType={1}
                    autoHeight={false}
                    basicDelay={5}
                />
            </div>
        </div>
    );
};
