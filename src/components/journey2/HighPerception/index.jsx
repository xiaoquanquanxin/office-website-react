import React from 'react';
import style from './index.module.less';
import { DescList } from '@components/journey2/descList';
import { mapStateToProps, mapDispatchToProps } from '@store/reduxMap';
import { connect } from 'react-redux';
// import { setRelativeWide } from '@store/browserInfo';

//  四个一块的
export const HighPerception = connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    class extends React.Component {
        render() {
            let { data, customWidth, position, REDUCER_BROWSER_INFO } = this.props
            data = data || {};
            if (data.content) {
                data.descList = JSON.parse(data.content);
                if (data.descList.length > 1) {
                    data.descList.splice(1, 0, null);
                }
            }

            let pos;
            switch (position) {
                case 1:
                    pos = '';
                    break;
                case 2:
                    pos = style.highPerRight;
                    break;
                default:
                    break;
            }
            let wrapWidth;
            switch (customWidth) {
                case 1:
                    wrapWidth = style.wrapWidth1;
                    break;
                case 3:
                    wrapWidth = style.wrapWidth3;
                    break;
                default:
                    break;
            }
            return (
                <div className={`${style.highPerception} ${pos}`}>
                    <div className={`${style.highPerceptionIn} ${wrapWidth}`} >
                        {data.video && REDUCER_BROWSER_INFO.isRelativeWide
                            ? <video className={style.bgVideo}
                                src={data.video}
                                autoPlay="autoplay" muted="muted" loop="loop" preload="auto" playsInline={true}
                                webkit-playsinline="true" x5-video-player-type="h5"
                                x5-video-orientation="portraint"
                                x5-video-player-fullscreen="true"
                            />
                            : <img className={style.bgImg} alt={data.title} src={data.img} />
                        }
                        <div className={`${style.wrap}`}>
                            <p className={style.title} dangerouslySetInnerHTML={{ __html: data.title }} />
                            <div className={`${style.desc}`} dangerouslySetInnerHTML={{ __html: data.desc }} />
                            <DescList data={data.descList} />
                        </div>
                    </div>
                </div>
            );
        }
    }
);

