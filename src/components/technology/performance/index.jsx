import React from 'react';
import style from './index.module.less';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
// import { MAPS } from '@components/technology/MAPS';
import { splitDesc } from '@utils/utils';
import close from '@media/technology/close.png'
import maps1 from '@media/technology/EfficientNet-EdgeTPU.png'
import maps2 from '@media/technology/OtherModels.png'

//  性能
export const TechnologyPerformance = connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                //  是否展开
                isOpen: false,
                isShow: false
            };
        }

        //  展开或关闭
        openOrClose() {
            const { isOpen } = this.state;
            this.setState(() => {
                return {
                    isOpen: !isOpen
                };
            });
        }

        showOrHide() {
            const { isShow } = this.state;
            this.setState(() => {
                return {
                    isShow: !isShow
                };
            });
        }

        render() {
            const performanceData = this.props.performanceData || {};
            if (!performanceData) {
                return '';
            }
            const { isOpen, isShow } = this.state;
            const { REDUCER_BROWSER_INFO, mapsData } = this.props;
            //  切字符串
            if (performanceData.desc) {
                performanceData.desc_active = splitDesc(performanceData.desc, REDUCER_BROWSER_INFO.isRelativeWide);
                performanceData.desc_normal = performanceData.desc.split('[[[more]]]')[0];
            }
            if (mapsData && mapsData.desc) {
                mapsData.desc_active = splitDesc(mapsData.desc, REDUCER_BROWSER_INFO.isRelativeWide);
                mapsData.desc_normal = mapsData.desc.split('[[[more]]]')[0];
            }
            return (
                <div className={style.performance}>
                    <div className={style.performanceIn}>
                        <p className={style.title}>{performanceData.title}</p>
                        <div className={style.descBtn}>
                            <div className={style.desc}>
                                <span className={`${style.content} ${isOpen ? style.active : ''}`}
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            isOpen
                                                ? performanceData.desc_active
                                                : performanceData.desc_normal
                                    }} />
                                <div className={style.btn} onClick={() => { this.openOrClose(); }}>
                                    {isOpen
                                        ? <b className={style.close}>收起</b>
                                        : <span className={style.open}>展开</span>
                                    }
                                    <i className={style.arrow} style={isOpen ? { transform: 'rotateZ(180deg)' } : {}} />
                                </div>
                            </div>
                            <div className={style.detail} onClick={() => this.showOrHide()}>
                                <span>查看详情</span>
                            </div>
                        </div>
                        <div className={style.chartDescItem}>
                            <img src={performanceData.img} className={style.img} alt='' />
                        </div>
                    </div>
                    {isShow
                        ? <div className={style.showPerformanceBox}>
                            <img className={style.close} src={close} alt="close" onClick={() => this.showOrHide()} />
                            <div className={style.showPerformance} onClick={() => this.showOrHide()}>
                                <div className={style.performance}>
                                    <div className={style.performanceIn}>
                                        <p className={style.title}>{performanceData.title}</p>
                                        <div className={style.descBtn}>
                                            <div className={style.desc}>
                                                <span className={`${style.content} ${style.active}`}
                                                    dangerouslySetInnerHTML={{
                                                        __html: performanceData.desc_active
                                                    }} />
                                            </div>
                                        </div>
                                        <div className={style.chartDescItem}>
                                            <img src={performanceData.img} className={style.img} alt='' />
                                        </div>
                                    </div>
                                </div>
                                <div className={`${style.performance} ${style.performance2}`}>
                                    <div className={style.performanceIn}>
                                        <p className={style.title}>{mapsData.title}</p>
                                        <div className={style.descBtn}>
                                            <div className={style.desc}>
                                                <span className={`${style.content} ${style.active}`}
                                                    dangerouslySetInnerHTML={{
                                                        __html: mapsData.desc_active
                                                    }} />
                                            </div>
                                        </div>
                                        <div className={style.chartDescItem}>
                                            <img src={mapsData.img} className={style.img} alt='' />
                                        </div>
                                        <div className={style.chartDescItem2}>
                                            <img src={maps1} className={style.mapsImg} alt='' />
                                            <img src={maps2} className={style.mapsImg} alt='' />
                                        </div>
                                        <div className={style.detail} onClick={() => this.showOrHide()}>
                                            <span>关闭详情</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null
                    }
                </div>
            );
        }
    }
);