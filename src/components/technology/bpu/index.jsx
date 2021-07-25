import React, { createRef } from 'react';
import style from './index.module.less';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { FRAME_DELAY } from '@utils/constant';
import { BasicTitleDesc } from '@components/basicTitleDesc';

export const Bpu = connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class extends React.Component {
        listRef;
        boxRef;

        constructor(props) {
            super(props);
            this.state = {
                //  激活的id
                activeIndex: 2,
            };
            this.setActive = this.setActive.bind(this);
            this.listRef = createRef();
            this.boxRef = createRef();
        }

        setActive(activeIndex) {
            this.setState(() => {
                return {
                    activeIndex,
                };
            });
        }

        componentDidUpdate(prevProps) {
            const { bpuData } = this.props;
            if (bpuData === null) {
                return;
            }
            //  console.log(prevProps.bpuData);
            //  以前没有主数据，现在直接有数据了，说明先回来的第一个请求就是list
            if (
                (bpuData.list && !prevProps.bpuData)
                || (bpuData.list && !prevProps.bpuData.list)
            ) {
                window.requestAnimationFrame(() => {
                    setTimeout(() => {
                        //  list数据发生变化
                        //  console.log(this.boxRef.current);
                        //  console.log(this.listRef.current);
                        const boxRef = this.boxRef.current;
                        const listRef = this.listRef.current;
                        const diffX = (listRef.offsetWidth - boxRef.offsetWidth) / 2;
                        //  console.log(listRef.offsetWidth);
                        //  console.log(boxRef.offsetWidth);
                        //  console.log(diffX);
                        boxRef.scrollTo(diffX, 0);
                    }, FRAME_DELAY * 1);
                });
            }
        }

        render() {
            const bpuData = this.props.bpuData || {};
            const { activeIndex } = this.state;
            let list;
            if (bpuData && bpuData.list) {
                list = bpuData.list.map((item, index) => {
                    return (
                        <BpuItem key={index}
                            bpuData={item}
                            activeIndex={activeIndex}
                            index={index}
                            setActive={this.setActive} />
                    );
                });
            }
            //            const data = {
            //                title: bpuData.title,
            //                desc: this.props.REDUCER_BROWSER_INFO.isRelativeWide
            //                    ? bpuData.desc
            //                    : (bpuData.desc || '').replace(/<br\/>/ig, '')
            //            };
            return (
                <div className={style.bpu}>
                    <div className={style.bpuIn}>
                        <BasicTitleDesc data={bpuData} widthType={705} />
                        <div className={style.bpuUlBox} ref={this.boxRef}>
                            <ul className={style.list} ref={this.listRef}>{list}</ul>
                        </div>
                    </div>
                </div>
            );
        }

    }
);

//  每一项
const BpuItem = ({
    bpuData,
    activeIndex,
    index,
    setActive,
}) => {
    if (bpuData.desc) {
        bpuData._desc = bpuData.desc
            .replace(/(\r)/ig, '\n')
            .replace(/\n\n/ig, '<br/>');
    }
    return (
        <li className={`${style.item} ${index === activeIndex ? style.active : ''}`}
            onMouseEnter={() => { setActive(index); }}>
            <div className={style.imgCenter2}
                style={{ backgroundImage: `url(${bpuData.img || ''})` }}
            />
            <p className={style.name} dangerouslySetInnerHTML={{ __html: bpuData.title }} />
            <div className={style.line} />
            <div className={style.sdesc} dangerouslySetInnerHTML={{ __html: bpuData._desc }} />
        </li>
    );
};