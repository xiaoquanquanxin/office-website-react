import React from 'react';
import style from './index.module.less';
import { mapStateToProps, mapDispatchToProps } from '@store/reduxMap';
import { connect } from 'react-redux';
// journey3-bg01.png

export const UltraLowPower = connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    class extends React.Component {
        render() {
            //  position 是 定位参数，不影响移动端
            let {ultraLowPowerData, contentIsRight, REDUCER_BROWSER_INFO, position} = this.props
            ultraLowPowerData = ultraLowPowerData || {};
            let rightDescMore = contentIsRight && ultraLowPowerData.desc && ultraLowPowerData.desc.length > 100;
            return (
                <div className={style.ultraLowPower}>
                    <div className={style.ultraLowPowerInner}>
                        {ultraLowPowerData.video && REDUCER_BROWSER_INFO.isRelativeWide
                            ? <video className={style.bgVideo}
                                src={ultraLowPowerData.video}
                                autoPlay="autoplay" muted="muted" loop="loop" preload="auto" playsInline={true}
                                webkit-playsinline="true" x5-video-player-type="h5"
                                x5-video-orientation="portraint"
                                x5-video-player-fullscreen="true"
                            />
                            : <img className={style.bgImg} alt={ultraLowPowerData.title} src={ultraLowPowerData.img} />
                        }
                        <div
                            className={`${style.contentWrap} ${contentIsRight ? style.contentIsRight : ''} ${rightDescMore ? style.rightDescMore : ''}`}
                            style={position ? {left: position.left} : null}
                        >
                            <p className={style.title} dangerouslySetInnerHTML={{ __html: ultraLowPowerData.title }} />
                            <ul className={style.list}>
                                <li className={style.item}>
                                    <pre className={style.pre}
                                        dangerouslySetInnerHTML={{ __html: ultraLowPowerData.desc }} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
    }
);
