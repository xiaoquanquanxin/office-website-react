import React from 'react';
import BMap from 'BMap';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '@store/reduxMap';
import { BMAP_ANIMATION_BOUNCE } from '@utils/constant';
import style from './index.module.less';

//  地图相关
const aboutUsMapData = {
    //  地图实例
    map: null,
    //  地图的观测实例
    geoMap: null,
    //  标记
    marker: null,
    //  初始化
    init() {
        //  console.log('初始化地图仅一次');
        // 创建Map实例
        const map = new BMap.Map('aboutUsMap');
        // 初始化地图,设置中心点坐标和地图级别
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 0);
        //  添加地图类型控件
        map.addControl(new BMap.MapTypeControl());
        // 设置地图显示的城市 此项是必须设置的
        map.setCurrentCity('北京');
        //  开启鼠标滚轮缩放
        map.enableScrollWheelZoom(true);
        this.map = map;
        this.geoMap = new BMap.Geocoder();
    },
    //  切换地图
    changeMap(value) {
        this.geoMap.getPoint(value, (point) => {
            //  console.log(value, point.lat, point.lng);
            if (point) {
                this.map.centerAndZoom(point, 22);
                //  清除旧的Overlay
                this.map.clearOverlays();
                this.marker = new BMap.Marker(point);
                //  将标注添加到地图中
                this.map.addOverlay(this.marker);
                //  跳动的动画
                this.marker.setAnimation(BMAP_ANIMATION_BOUNCE);
                return;
            }
            alert('您选择地址没有解析到结果!');
        });
    }
};

//  地图相关组件
export const AboutUsLocation = connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    class extends React.Component {
        componentDidUpdate(prevProps, prevState, snapshot) {
            const { activeAreaId, activeAreaName } = this.props.REDUCER_ABOUT_US_MAP;
            const { setAboutUsMapActiveAreaId, addrInfoMap, addrInfoList } = this.props;
            //  等数据
            if (addrInfoMap === null) {
                return;
            }
            //  点击了，或者初始化了
            if (prevProps.REDUCER_ABOUT_US_MAP.activeAreaId !== activeAreaId) {
                //  激活的名字
                aboutUsMapData.changeMap(activeAreaName);
                return;
            }
            //  如果没有设置过地图的激活数据，那么应该将其置为第一个城市的第一条数据
            if (activeAreaId === null) {
                //  console.log(addrInfoMap);
                //  我想要的区域的数据将
                const currentAreaData = addrInfoMap[addrInfoList[0]][0];
                //  这时候初始化是安全的
                aboutUsMapData.init();
                window.requestAnimationFrame(() => {
                    setAboutUsMapActiveAreaId(currentAreaData.id, currentAreaData.addr);
                });
            }
        }

        render() {
            const {
                //  地图的城市的名称
                addrInfoList,
                //  地图数据
                addrInfoMap,
            } = this.props;
            let list;
            if (addrInfoMap) {
                list = addrInfoList.map((mapKey, index) => {
                    return (
                        <CityItem key={mapKey}
                            areaList={addrInfoMap[mapKey]}
                            cityName={mapKey}
                            index={index}
                        />
                    );
                });
            }
            return (
                <div className={style.addrMap}>
                    <div className={style.addrList}>
                        <p className={style.title}>公司地址</p>
                        {list}
                    </div>
                    <div id="aboutUsMap" className={style.map} />
                </div>
            );
        }
    }
);

//  城市的每一项
const CityItem = connect(
    mapStateToProps,
    mapDispatchToProps
)(
    ({
        //  地区列表
        areaList,
        //  城市名称
        cityName,
        //  index
        index,
        REDUCER_ABOUT_US_MAP,
        //  城市点击事件
        setAboutUsMapOpenIndex,
    }) => {
        const { openIndex } = REDUCER_ABOUT_US_MAP;
        const list = (openIndex === index) ?
            areaList.map(item => {
                return (
                    <AreaItem
                        key={item.id}
                        data={item}
                    />
                );
            })
            : null;
        return (
            <dl className={style.cityItem}>
                <dt className={`${style.subTitle} ${style.hasChild} ${openIndex === index ? style.isOpen : ''}`}
                    onClick={() => { setAboutUsMapOpenIndex(index); }}
                >{cityName}</dt>
                {list}
            </dl>
        );
    }
);
//  地区的每一项
const AreaItem = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({
    data,
    REDUCER_ABOUT_US_MAP,
    //  点击换地图
    setAboutUsMapActiveAreaId
}) => {
    //  激活的id，用户选中的地图
    const { activeAreaId } = REDUCER_ABOUT_US_MAP;
    return (
        <dd className={`${style.areaItem} ${activeAreaId === data.id ? style.areaItemActive : ''}`}
            onClick={() => { setAboutUsMapActiveAreaId(data.id, data.addr); }}>
            <div className={style.areaItemContent}>
                <strong className={style.strong}>{data.name}</strong>
                <span className={style.mobile}>{data.mobile}</span>
            </div>
            <div className={style.addrDetail}>{data.addr}</div>
        </dd>
    );
});

