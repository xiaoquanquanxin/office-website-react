import React, { createRef } from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import style from './index.module.less';
import activeArrow from '@media/technology/arrow-next.svg';
import greyArrow from '@media/technology/arrow-next-gray.svg';
import layout from '@css/layout.module.less';
import Swiper from 'swiper';
import './index.less';
import 'swiper/dist/css/swiper.css';

export const XinPeriod = connect(
    mapStateToProps, mapDispatchToProps
)(
    class extends React.Component {
        swiperRef;
        mySwiper;

        constructor(props) {
            super(props);
            this.state = {
                activeIndex: null,
            };
            this.swiperRef = createRef();
        }

        componentDidUpdate(prevProps, prevState) {
            //  以前没数据，说明这一次是注入数据
            if (!prevProps.xinPeriodData) {
                const { xinPeriodData } = this.props;
                if (!xinPeriodData) {
                    return;
                }
                //  console.log(xinPeriodData);
                window.requestAnimationFrame(() => {
                    this.setState(() => {
                        return {
                            activeIndex: 0,
                        };
                    });
                });
                return;
            }
            //  console.log(prevState.activeIndex);
            if (prevState.activeIndex == null) {
                this.mySwiper = new Swiper(this.swiperRef.current, {
                    autoplay: false,
                    loop: false,
                    slidesPerView: 5,
                });
                window.requestAnimationFrame(() => {
                    this.setActiveIndex();
                });
            }
        }

        //  type -1前一个，1后一个
        switchover(type) {
            switch (type) {
                case -1:
                    this.mySwiper.slidePrev();
                    break;
                case 1:
                    this.mySwiper.slideNext();
                    break;
                default:
                    throw new Error('type');
            }
            this.setActiveIndex();
        }

        setActiveIndex() {
            const { activeIndex } = this.mySwiper;
            this.setState(() => {
                return {
                    activeIndex,
                };
            });
            //  console.log(activeIndex);
        }

        render() {
            const { xinPeriodData } = this.props;
            if (!xinPeriodData || !xinPeriodData.list) {
                return '';
            }
            const list = xinPeriodData.list.map((item, index) => {
                return (
                    <div key={index} className={`swiper-slide ${style.swiperSlide}`}>
                        <XinPeriodItem data={item} />
                    </div>
                );
            });
            const { activeIndex } = this.state;
            return (
                <div className={style.xinPeriod}>
                    <div className={style.xinPeriodIn}>
                        <p className={style.title} dangerouslySetInnerHTML={{ __html: xinPeriodData.title }} />
                        <div className={style.desc} dangerouslySetInnerHTML={{ __html: xinPeriodData.desc }} />
                        <div className={style.twoArrow}>
                            <img className={`${style.arrow} ${style.l_arrow}`}
                                src={activeIndex > 0 ? activeArrow : greyArrow} alt=''
                                onClick={() => { this.switchover(-1); }}
                            />
                            <img className={`${style.arrow} ${style.r_arrow}`}
                                src={activeIndex + 5 < xinPeriodData.list.length ? activeArrow : greyArrow} alt=''
                                onClick={() => { this.switchover(+1); }}
                            />
                        </div>
                        <div className={`swiper-container ${style.list}`} ref={this.swiperRef} id='xinPeriod'>
                            <div className="swiper-wrapper">
                                {list}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
);

//  每一项
const XinPeriodItem = ({
    data,
}) => {
    const list = data.desc.split('\n').map((item, index) => {
        return (
            <dd className={style.dd} dangerouslySetInnerHTML={{ __html: item }} key={index} />
        );
    });
    return (
        <div className={`${style.nameImg} ${layout.left} name-img`}>
            <p className={style.name} dangerouslySetInnerHTML={{ __html: data.title }} />
            <div className={`${style.imgCenter2} ${layout.imgCenter2}`}
                style={{ backgroundImage: `url(${data.img || ''})` }}
            />
            <dl className={style.xinDesc}>
                {list}
            </dl>
        </div>
    );
};