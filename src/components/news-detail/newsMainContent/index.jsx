import React from 'react';
import style from './index.module.less';
import { transformDateType } from '@utils/utils';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';

export const NewsMainContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(({
    mainData,
    REDUCER_NEWS_TAB_BOX
}) => {
    const { newsCategoryDataMap } = REDUCER_NEWS_TAB_BOX;
    let data = null;
    if (mainData && newsCategoryDataMap) {
        //  这是新闻菜单数据
        data = newsCategoryDataMap[mainData.category_id];
    }
    return (
        <div className={style.mainContent}>
            <div className={style.mainBanner}>
                {mainData && <img className={style.thumb} src={mainData.img} alt='' />}
                <div className={style.imgDes}>
                    <div className={style.iconType}>
                        {/*用那个数据*/}
                        {data && <img src={data.img} className={style.icon} alt={data.name} />}
                        {data && <span className={style.type}>{data.name}</span>}
                    </div>
                    {mainData && <p className={style.title}>{mainData.title}</p>}
                    {mainData && <p className={style.date}>{transformDateType(mainData.publish_date)}</p>}
                </div>
            </div>
            {mainData && <div className={style.mainText} dangerouslySetInnerHTML={{ __html: mainData.content }} />}
        </div>
    );
});