import React, { createRef } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@store/reduxMap';
import { getUserAgentType } from '@utils/utils';
import style from './index.module.less';

//  如果是safari
if (getUserAgentType.isSafari) {
    require('smoothscroll-polyfill').polyfill();
}
export const ScrollFixed = connect(
    mapStateToProps,
)(
    class extends React.Component {
        wrapRef;
        locationRef;

        constructor(props) {
            super(props);
            this.wrapRef = createRef();
            this.locationRef = createRef();
        }

        componentDidMount() {

        }

        render() {
            const { RenderElement, REDUCER_BROWSER_INFO } = this.props;
            const { current: wrapRef } = this.wrapRef;
            const { current: locationRef } = this.locationRef;
            const wrapRefStyleSheet = {};
            const locationRefStyleSheet = {};
            let className = null;
            //  如果有元素了
            if (wrapRef) {
                const { scrollTop, scrollLeft } = REDUCER_BROWSER_INFO;
                //  如果滚动的距离大于元素本身的距离top的距离
                //  固定定位
                if (scrollTop > wrapRef.offsetTop) {
                    className = style.scrollFixed;
                    wrapRefStyleSheet.left = `${-scrollLeft}px`;
                    locationRefStyleSheet.height = `${locationRef.offsetHeight}px`;
                } else {
                    //  常规定位
                    className = style.scrollRelative;
                    wrapRefStyleSheet.top = 0;
                    locationRefStyleSheet.height = 'auto';
                }
            }

            return (
                <div className={style.wrap} ref={this.wrapRef} style={locationRefStyleSheet}>
                    <div className={className} ref={this.locationRef} style={wrapRefStyleSheet}>
                        <RenderElement />
                    </div>
                </div>
            );
        }
    }
);
