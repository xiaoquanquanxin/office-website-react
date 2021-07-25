import React from 'react';
import style from './index.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

import playImg from '@media/video/video-play.png';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';

//  征程2 视觉感知算法
export const JourneyAlgorithm = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({
    jAData,
    setVideoOpenStatus,
}) => {
    jAData = jAData || {};
    const { content } = jAData;
    let list;
    if (content) {
        list = content.map(({ title, desc, }, index) => {
            return (
                <JAItem key={index} data={{ title, desc }} />
            );
        });
    }
    return (
        <div className={style.journeyAlgorithm}>
            <div className={style.journeyAlgorithmIn}>
                <BasicTitleDesc data={jAData} />
                <div className={style.videoDesc}>
                    <div className={style.videoBox} style={{ backgroundImage: `url(${jAData.img || ''})` }}>
                        {(jAData.video && jAData.video !== '0')
                            && <img className={style.img} alt='' src={playImg}
                                onClick={() => { setVideoOpenStatus(true, jAData && jAData.video); }}
                            />}
                    </div>
                    <ul className={style.descList}>
                        {list}
                    </ul>
                </div>
            </div>
        </div>
    );
}
);
//  每一项
const JAItem = ({ data }) => {
    return (
        <li className={style.item}>
            <p className={style.name} dangerouslySetInnerHTML={{ __html: data.title }} />
            <div className={style.desc} dangerouslySetInnerHTML={{ __html: data.desc }} />
        </li>
    );
};
