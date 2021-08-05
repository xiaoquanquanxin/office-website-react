import React from 'react';
import style from './index.module.less';
import layout from '@css/layout.module.less';
import { stopPropagation } from '@utils/eventListener';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import putOnRecords from '@media/basicFooter/putOnRecords.png';

export const SiteInfo = connect(
    mapStateToProps,
    mapDispatchToProps
)(
    ({
        qrCodeShowIndex,
        qrCodeClick,
        //  获取浏览器信息，来源于redux
        REDUCER_BROWSER_INFO,
        //
        data,
    }) => {
        if (!data || !data.data) {
            return null;
        }
        //  浏览器足够宽
        const { isRelativeWide } = REDUCER_BROWSER_INFO;
        const {copy_right} = data.data;
        const copy_right_list = (copy_right || '').split(';');
        const text = copy_right_list[0];
        const href1 = copy_right_list[1];
        const linkText1 = copy_right_list[2];
        const href2 = copy_right_list[3];
        const linkText2 = copy_right_list[4];

        return (
            <div className={style.siteInfo}>
                <div className={`${style.siteInfoInner} ${layout.clearfix}`}>
                    <div
                        className={`${style.buttonGroups} ${layout.clearfix} ${isRelativeWide ? layout.right : ''}`}>
                        <button className={`${style.button} ${layout.inlineBlock}`}
                            onClick={() => { qrCodeClick(0); }}
                            onBlur={() => { qrCodeClick(0, true); }}
                        >
                            <div className={style.icon} />
                            <span>地平线官微</span>
                            <img src={data.data.qrcode}
                                alt='地平线官微' onClick={(e) => stopPropagation(e)}
                                className={`${style.qrCode} ${qrCodeShowIndex === 0 ? layout.block : layout.none}`} />
                        </button>
                        <button className={`${style.button} ${layout.inlineBlock}`}
                            onClick={() => { qrCodeClick(1,); }}
                            onBlur={() => { qrCodeClick(1, true); }}
                        >
                            <div className={style.icon} />
                            <span>地平线招聘号</span>
                            <img src={data.data.zp_qrcode}
                                alt='地平线招聘号' onClick={(e) => stopPropagation(e)}
                                className={`${style.qrCode} ${qrCodeShowIndex === 1 ? layout.block : layout.none}`} />
                        </button>
                    </div>
                    <div className={`${style.siteInfoMsg} ${isRelativeWide ? layout.left : ''} `}>
                        {text}
                        <a className={style.linkHref} rel="noopener noreferrer" target="_blank" href={href1}
                           dangerouslySetInnerHTML={{__html: linkText1}}
                        />
                        <img className={style.linkImg} src={putOnRecords} alt=''/>
                        <a className={style.linkHref} rel="noopener noreferrer" target="_blank" href={href2}
                           dangerouslySetInnerHTML={{__html: linkText2}}
                        />
                    </div>
                </div>
            </div>
        );
    }
);