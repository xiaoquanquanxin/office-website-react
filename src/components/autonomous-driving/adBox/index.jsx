import React from 'react';
import style from './index.module.less';
import layout from '@css/layout.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

//  自动驾驶 的box
export const AdBox = class extends React.Component {

    /**
     * @param  {object} props { dataList:列表数据 , adBoxData:常规数据 , index:索引 }
     * */
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
        };
        this.mouseOver.bind(this);
    }

    mouseOver(activeIndex) {
        this.setState(() => {
            return {
                activeIndex,
            };
        });
    }

    render() {
        const { activeIndex } = this.state;
        const { adBoxData, index } = this.props;
        let list;
        let tabList;
        if (adBoxData && adBoxData.data) {
            list = adBoxData.data.map((item, index) => {
                return (
                    <ADItem key={index} data={item} />
                );
            });
            tabList = adBoxData.tabList.map((item, index) => {
                return (
                    <li key={index}
                        className={`${style.item} ${activeIndex === index ? style.active : ''}`}
                        onMouseOver={() => { this.mouseOver(index); }}>{item}
                    </li>
                );
            });
        }
        return (
            <div className={`${style.imgTabBox} ${index % 2 ? style.odd : ''}`}>
                <BasicTitleDesc data={adBoxData} isLight={true} />
                <div className={style.imgTab}>
                    <div className={`${layout.imgCenter2} ${style.imgCenter2}`}>
                        <img src={adBoxData.img || ''} alt="" />
                    </div>
                    <div className={style.tabHeaderContent}>
                        <ul className={style.list}>
                            {tabList}
                        </ul>
                        <div className={style.itemContents}>
                            <div className={`${style.itemContent} ${activeIndex === 0 ? style.active : ''}`}>
                                <dl className={style.dl}>
                                    {list}
                                </dl>
                            </div>
                            <div className={`${style.itemContent} ${activeIndex === 1 ? style.active : ''}`}>
                                <dl className={style.dl}>
                                    {
                                        adBoxData.list
                                            ? <dd className={style.type2}
                                                dangerouslySetInnerHTML={{ __html: adBoxData.list[0] }} />
                                            : ''
                                    }
                                </dl>
                            </div>
                            <div className={`${style.itemContent} ${activeIndex === 2 ? style.active : ''}`}>
                                <dl className={style.dl}>
                                    {
                                        adBoxData.list
                                            ? <dd className={style.type2}
                                                dangerouslySetInnerHTML={{ __html: adBoxData.list[1] }} />
                                            : ''
                                    }
                                </dl>
                            </div>
                        </div>
                        <div className={style.itemContents2}>
                            <div className={`${style.itemContent} ${activeIndex === 0 ? style.active : ''}`}>
                                <dl className={style.dl}>
                                    {list}
                                </dl>
                            </div>
                            <div className={`${style.itemContent} ${activeIndex === 1 ? style.active : ''}`}>
                                <dl className={style.dl}>
                                    {
                                        adBoxData.list
                                            ? <dd className={style.type2}
                                                dangerouslySetInnerHTML={{ __html: adBoxData.list[0] }} />
                                            : ''
                                    }
                                </dl>
                            </div>
                            <div className={`${style.itemContent} ${activeIndex === 2 ? style.active : ''}`}>
                                <dl className={style.dl}>
                                    {
                                        adBoxData.list
                                            ? <dd className={style.type2}
                                                dangerouslySetInnerHTML={{ __html: adBoxData.list[1] }} />
                                            : ''
                                    }
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

//  第一块的每一项
const ADItem = ({ data }) => {
    return (
        <dd className={style.type1}>
            <i className={style.ok} />
            <span className={style.span} dangerouslySetInnerHTML={{ __html: data.title }} />
            <em className={style.em} dangerouslySetInnerHTML={{ __html: data.desc }} />
        </dd>
    );
};