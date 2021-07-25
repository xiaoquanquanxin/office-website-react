import { resizeListener } from '@utils/eventListener';
import { pathNameList } from '@utils/constant';

//  重定向
export const isValidatedPathName = ((pathname) => {
    if (pathNameList.indexOf(pathname) === -1) {
        window.location.href = '/404.html';
        return false;
    }
    return true;
})(window.location.pathname.slice(1));

//  重置rem
function remSet() {
    //  设备宽度
    const maxDeviceWidth = 750;
    //  设备比例
    const remCount = maxDeviceWidth / 100;
    const docEle = document.documentElement;
    const docEleStyle = docEle.style;
    const fn = () => {
        const width = docEle.clientWidth;
        const remFixDom = document.createElement('div');
        docEleStyle.fontSize = 100 * (width / maxDeviceWidth) + 'px';
        remFixDom.style.cssText = 'width:100%;height:1rem;opacity:1;position:absolute;z-index:+9999;top:0;left:0;background: rgba(0, 0, 0, 0);';
        document.body.appendChild(remFixDom);
        requestAnimationFrame(() => {
            const render = window.getComputedStyle(remFixDom);
            const rRate = (render.width.slice(0, -2) / render.height.slice(0, -2)).toFixed(1);
            if (rRate / remCount !== 1) {
                docEleStyle.fontSize = parseInt(docEleStyle.fontSize) * rRate / remCount + 'px';
            }
            document.body.removeChild(remFixDom);
        });
    };
    document.addEventListener('DOMContentLoaded', fn, false);
    resizeListener(fn);
}

//  重置rem
remSet();

