import React from 'react';
import style from './index.module.less';
import { requestGetBannerByType } from '@api/index';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';

export const Journey2Video = connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                videoData: null,
            };
        }

        componentDidMount() {
            const { videoType } = this.props;
            requestGetBannerByType(videoType)
                .then(v => {
                    const videoData = v.data[0];
                    if (!videoData) {
                        throw new Error(`requestGetBannerByType 请求有误 ${videoData}`);
                    }
                    this.setState(() => {
                        return {
                            videoData,
                        };
                    });
                });
        }
        render() {
            const { videoData } = this.state;
            if (!videoData) {
                return '';
            }
            //  服务端返回video为 "0"
            if (videoData.video === '0') {
                videoData.video = null;
            }
            return (
                <div className={style.videoShow}>
                    <div className={style.videoBox}>
                        <p className={style.videoTitle}>{videoData.title}</p>
                        {(videoData.video && <div className={style.videoCover} style={{ backgroundImage: `url(${videoData.img || ''})` }}
                            onClick={() => { this.props.setVideoOpenStatus(true, videoData && videoData.video); }}
                        />) || <img src={videoData.img} alt="" style={{ marginTop: '40px', width: '100%' }} />}
                        <p className={style.videoSTitle}>{videoData.title2}</p>
                    </div>
                </div>
            );
        }
    }
);