import React, { createRef } from 'react';
import style from './index.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';
import { FRAME_DELAY } from '@utils/constant';

//  方案优势
export const MultipleAdvantages = class extends React.Component {
    listRef;
    boxRef;
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 2,
        };
        this.mouseHover = this.mouseHover.bind(this);
        this.listRef = createRef();
        this.boxRef = createRef();
    }

    mouseHover(activeIndex) {
        this.setState(() => {
            return {
                activeIndex
            };
        });
    }

    updateOffsetWidth() {
        window.requestAnimationFrame(() => {
            setTimeout(() => {
                const boxRef = this.boxRef.current;
                const listRef = this.listRef.current;
                const diffX = (listRef.offsetWidth - boxRef.offsetWidth) / 2;
                boxRef.scrollTo(diffX, 0);
            }, FRAME_DELAY)
        })
    }
    componentDidUpdate(prevProps) {
        const { maData } = this.props;
        if (maData === null) {
            return;
        }
        if (
            (maData.maDataNormal && !prevProps.maData)
            || (maData.maDataNormal && !prevProps.maData.maDataNormal)
        ) {
            this.updateOffsetWidth()
        }
    }

    render() {
        const maData = this.props.maData || {};
        const { activeIndex } = this.state;
        const { maDataNormal, maDataHover } = maData;
        if (!maDataNormal) {
            return '';
        }
        const list = maDataNormal.map((item, index) => {
            return (<Item
                key={index}
                index={index}
                activeIndex={activeIndex}
                data={item}
                hoverData={maDataHover[index]}
                mouseHover={this.mouseHover}
            />)
        });
        return (
            <div className={style.multipleAdvantages}>
                <BasicTitleDesc data={{ title: '方案优势' }} isLight={true} />
                <div className={style.multipleAdvantagesIn} ref={this.boxRef}>
                    <ul className={style.list} ref={this.listRef}> {list} </ul>
                </div>
            </div>
        );
    }
};

const Item = ({
    index,
    activeIndex,
    hoverData,
    data,
    mouseHover
}) => {
    return (
        <li className={`${style.item} ${activeIndex === index ? style.active : ''}`}
            onMouseOver={() => { mouseHover(index); }}
            style={{ backgroundImage: `url(${data.img || ''})` }}
        >
            <div className={style.thumb}
                style={{ backgroundImage: `url(${hoverData.img || ''})` }}>
                <p className={style.name} dangerouslySetInnerHTML={{ __html: data.title }} />
                <div className={style.desc} dangerouslySetInnerHTML={{ __html: hoverData.desc }} />
            </div>
        </li>
    )
}