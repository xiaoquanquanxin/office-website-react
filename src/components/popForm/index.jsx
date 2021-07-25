import React from 'react';
import { connect } from 'react-redux';
import style from './index.module.less';
import layout from '@css/layout.module.less';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { requestSave } from '@api/index';

export const PopForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class extends React.Component {
        //  表单的list
        formList;

        constructor(props) {
            super(props);
            this.state = {
                //  验证每一项       -1：初始化，false：错误的验证，true：通过验证
                validateList: [-1, -1, -1, -1, -1, -1],
                //  可以提交
                canSend: false,
            };
            //  表单的list
            this.formList = ['content', 'fullname', 'contact', 'company', 'position', 'email'];
            //  测试
            //  const { setToastStatus } = this.props;
            //  setToastStatus(true, true);
        }

        /**
         * 输入验证
         * @param {Event} e 事件
         * @param {number} index validateList的下标
         * */
        oninput(e, index) {
            const { value } = e.target;
            const { validateList } = this.state;
            switch (index) {
                case 0: //  公司名称
                case 1: //  您的姓名
                case 2: //  您的职位
                case 5: //  咨询内容
                    validateList[index] = (value.trim() !== '');        //  都是仅必填
                    break;
                case 3: //  邮箱地址
                    validateList[index] = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})/.test(value);
                    break;
                case 4: //  电话号码
                    validateList[index] = /^[1][3,4,5,7,8][0-9]{9}$/.test(value);
                    break;
                default:
                    throw new Error(`错误的类型,${index}`);
            }
            this.setState(() => {
                return {
                    validateList,
                    canSend: !validateList.some(item => item !== true),
                };
            });
        }

        send() {
            const data = {};
            this.formList.forEach(name => {
                data[name] = document.querySelector(`[name=${name}]`).value;
            });
            requestSave(data)
                .then(v => {
                    const { setToastStatus } = this.props;
                    if (v.code === 0) {
                        this.formReset();
                        setToastStatus(true, true);
                    } else {
                        setToastStatus(true, false);
                    }
                });
        }

        //  重置表单
        formReset() {
            const { setPopFormOpenStatus } = this.props;
            //  关闭表单
            setPopFormOpenStatus(false);
            //  清空表单数据
            this.formList.forEach(name => {
                document.querySelector(`[name=${name}]`).value = '';
            });
            //  重置表单验证
            this.setState((v) => {
                return {
                    validateList: [-1, -1, -1, -1, -1, -1],
                };
            });
        }

        render() {
            const { REDUCER_POP_FORM } = this.props;
            const { popFormIsOpen } = REDUCER_POP_FORM;
            const { validateList, canSend } = this.state;
            return (
                <div className={`${style.popForm} ${layout.mask} ${popFormIsOpen ? layout.flex : layout.none}`}>
                    <div className={style.popFormMain}>
                        <div className={style.popFormDec}>
                            <p className={style.themeTitle}>合作咨询</p>
                            <p className={style.titleDesc}>业务合作及产品咨询</p>
                        </div>
                        <div className={style.popFormIptbox}>
                            <div className={style.labelIptMsg}>
                                <label className={style.requireLabel}>公司名称<b className={style.requireStar}>*</b></label>
                                <div className={style.iptBox}>
                                    <input type="text" autoComplete="new-password" autoCapitalize="off"
                                        onInput={(e) => this.oninput(e, 0)}
                                        onBlur={(e) => this.oninput(e, 0)}
                                        name='company'
                                        className={`${style.noBb} ${validateList[0] === false ? style.error : ''}`} />
                                    <div className={style.msg}>请输入公司名称</div>
                                </div>
                            </div>
                            <div className={style.labelIptMsg}>
                                <label className={style.requireLabel}>您的姓名<b className={style.requireStar}>*</b></label>
                                <div className={style.iptBox}>
                                    <input type="text" autoComplete="new-password" autoCapitalize="off"
                                        onInput={(e) => this.oninput(e, 1)}
                                        onBlur={(e) => this.oninput(e, 1)}
                                        name='fullname'
                                        className={`${style.noBb} ${validateList[1] === false ? style.error : ''}`} />
                                    <div className={style.msg}>请输入您的姓名</div>
                                </div>
                            </div>
                            <div className={style.labelIptMsg}>
                                <label className={style.requireLabel}>您的职位<b className={style.requireStar}>*</b></label>
                                <div className={style.iptBox}>
                                    <input type="text" autoComplete="new-password" autoCapitalize="off"
                                        onInput={(e) => this.oninput(e, 2)}
                                        onBlur={(e) => this.oninput(e, 2)}
                                        name='position'
                                        className={`${style.noBb} ${validateList[2] === false ? style.error : ''}`} />
                                    <div className={style.msg}>请输入您的职位</div>
                                </div>
                            </div>
                            <div className={style.labelIptMsg}>
                                <label className={style.requireLabel}>邮箱地址<b className={style.requireStar}>*</b></label>
                                <div className={style.iptBox}>
                                    <input type="text" autoComplete="new-password" autoCapitalize="off"
                                        onInput={(e) => this.oninput(e, 3)}
                                        onBlur={(e) => this.oninput(e, 3)}
                                        name='email'
                                        className={`${style.noBb} ${validateList[3] === false ? style.error : ''}`} />
                                    <div className={style.msg}>邮箱地址不正确</div>
                                </div>
                            </div>
                            <div className={style.labelIptMsg}>
                                <label className={style.requireLabel}>电话号码<b className={style.requireStar}>*</b></label>
                                <div className={style.iptBox}>
                                    <input type="text" autoComplete="new-password" autoCapitalize="off"
                                        onInput={(e) => this.oninput(e, 4)}
                                        onBlur={(e) => this.oninput(e, 4)}
                                        name='contact'
                                        className={`${style.noBb} ${validateList[4] === false ? style.error : ''}`} />
                                    <div className={style.msg}>手机号码格式有误</div>
                                </div>
                            </div>
                            <div className={style.labelIptMsg}>
                                <label className={style.requireLabel}>咨询内容<b className={style.requireStar}>*</b></label>
                                <div className={style.iptBox}>
                                    <textarea autoComplete="new-password"
                                        autoCapitalize="off"
                                        onInput={(e) => this.oninput(e, 5)}
                                        onBlur={(e) => this.oninput(e, 5)}
                                        name='content'
                                        className={`${style.noBb} ${style.textarea} ${validateList[5] === false ? style.error : ''}`} />
                                    <div className={`${style.msg} ${style.showMsg}`}>请准确输入您的信息以便我们及时与您取得联系</div>
                                </div>
                            </div>
                            <div className={style.btnSendBox}>
                                {canSend
                                    ? <div className={`${style.btnSend} ${style.btnSendActive}`}
                                        onClick={(e) => { this.send(); }}>确认信息并发送</div>
                                    : <div className={style.btnSend}>确认信息并发送</div>
                                }
                            </div>
                        </div>
                        <div className={style.iconClose} onClick={() => { this.formReset(false); }} />
                    </div>
                </div>
            );
        }
    }
);