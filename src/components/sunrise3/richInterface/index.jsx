import React from 'react';
import style from './index.module.less';
// import layout from '@css/layout.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

//  旭日3 系列——释放 “芯” 效能
export const RichInterface = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0,
        };
    }

    setActive(activeTab) {
        this.setState(() => {
            return {
                activeTab,
            };
        });
    }

    render() {
        const richInterfaceData = this.props.richInterfaceData || {};
        const { content } = richInterfaceData;
        const { activeTab } = this.state;
        if (!content) {
            return '';
        }
        //  tab
        const ddList = content.map((item, index) => {
            return (
                <dd className={`${style.tab} ${activeTab === index ? style.active : ''}`}
                    onClick={() => { this.setActive(index); }}
                    onMouseEnter={() => { this.setActive(index); }}
                    dangerouslySetInnerHTML={{ __html: item.title }}
                    key={index}
                />
            );
        });
        const ulList = content.map((item, index) => {
            const list = item.list.map((item, index) => {
                return (
                    <RichInterfaceItem key={index} data={item} />
                );
            });
            return (
                <ul className={`${style.list} ${activeTab === index ? style.flex : style.none}`} key={index}>
                    {list}
                </ul>
            );
        });
        return (
            <div className={style.richInterface}>
                <BasicTitleDesc data={richInterfaceData} widthType={784} />
                <dl className={style.tabBox}>
                    {ddList}
                </dl>
                <div className={style.tabContent}>
                    <div className={style.tabConts2}>
                        {ulList}
                    </div>
                    <div className={style.tabConts}>
                        {ulList}
                    </div>
                </div>
            </div>
        );
    }
};
//  每一项
const RichInterfaceItem = ({
    data,
}) => {
    if (data.content && data.content.join) {
        data._content = data.content.join('<br/>');
    }
    return (
        <li className={style.item}>
            <label className={style.label} dangerouslySetInnerHTML={{ __html: data.label }} />
            <div className={style.c} dangerouslySetInnerHTML={{ __html: data._content }} />
        </li>
    );
};
