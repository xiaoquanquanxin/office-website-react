import React from 'react';
import style from './index.module.less';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { requestGetBannerByType } from '@api/index';

//  核心技术的观看视频
export const TechnologyVideo = connect(
    mapStateToProps,
    mapDispatchToProps
)(class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoData: null
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
        return (
            <div className={style.videoBox} style={videoData ? { backgroundImage: `url(${videoData.img || ''})` } : {}}>
                <div className={style.btnPlay}
                    onClick={() => { this.props.setVideoOpenStatus(true, videoData && videoData.video); }}
                >观看视频
                </div>
            </div>
        );
    }
});


