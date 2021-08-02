import React from 'react';
import style from './index.module.less';
import {BasicTitleDesc} from '@components/basicTitleDesc';
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from '@store/reduxMap';
import viewDetail from '@media/design-in/viewDetail.png';

console.log(viewDetail);
//  产品套件
export const ProductSuite = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({productSuiteData}) => {
    if (!productSuiteData) {
        return null;
    }
    //  需要有内容
    if (!productSuiteData.list) {
        return null;
    }
    return (
        <div className={style.productSuite}>
            <BasicTitleDesc data={productSuiteData}/>
            <div className={style.productSuiteContent}>
                <ProductSuiteItem data={productSuiteData.list[0]}/>
                <ProductSuiteItem data={productSuiteData.list[1]}/>
            </div>
        </div>
    );
});

//  每一项
const ProductSuiteItem = ({data}) => {
    return (
        <div className={style.productSuiteItem}>
            <img className={style.productSuiteImg} src={data.img} alt=""/>
            <a href={data.more} className={style.productSuiteParagraph}>
                <p className={style.productSuiteTitle}
                   dangerouslySetInnerHTML={{__html: data.title}}/>
                <p className={style.productSuiteDesc} dangerouslySetInnerHTML={{__html: data.desc}}/>
                <div className={style.productSuiteViewDetail}>
                    <div className={style.productSuiteViewDetailText}>查看详情</div>
                    <img className={style.productSuiteViewDetailSvg} src={viewDetail} alt=''/>
                </div>
            </a>
        </div>
    );
};