import React, { createRef } from 'react';
import style from './index.module.less';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { isValidHTTPString } from '@utils/utils';

export const MainInfo = connect(
    mapStateToProps,
    mapDispatchToProps
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
            const { textPosition, REDUCER_BROWSER_INFO } = this.props;
            const info = this.props.info || {};
            const { isRelativeWide } = REDUCER_BROWSER_INFO;
            if (!isRelativeWide) {
                info.video = null;
            }
            let extraClassName = '';
            switch (textPosition) {
                case 'left':
                    extraClassName = 'left';
                    break;
                case 'right':
                    extraClassName = 'right'
                    break;
                default:
                    throw new Error(`错误的文字位置,${textPosition}`);
            }
            //  判断url对不对
            if (!isValidHTTPString(info.url)) {
                info.url = null;
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
            // console.log(isRelativeWide, info._video)
            return (
                <div className={`${style.container} ${style[extraClassName]}`}>
                    {info.video
                        ? <video className={style.bgVideo}
                            src={info.video}
                            autoPlay="autoplay" muted="muted" loop="loop" preload="auto" playsInline={true}
                            webkit-playsinline="true" x5-video-player-type="h5"
                            x5-video-orientation="portraint"
                            x5-video-player-fullscreen="true"
                        />
                        : <img className={style.bgGif} alt={info.title} src={info.img} />
                    }
                    <div className={style.content} ref={this.infoRef}>
                        <p className={style.title} ref={this.titleRef} dangerouslySetInnerHTML={{ __html: info.title }} />
                        <div className={style.description}>
                            {info.url
                                ? <a href={info.url}
                                    dangerouslySetInnerHTML={{ __html: info.desc }} />
                                : <span
                                    dangerouslySetInnerHTML={{ __html: info.desc }} />}
                        </div>
                    </div>
                </div>
            );
        }

    }
);