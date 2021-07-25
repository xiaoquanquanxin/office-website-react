import React from 'react';
//  填充，移动端有露底
export const BlackPadding = ({
    //  颜色
    color,
    //  y轴位移
    y,
    //
    zIndex,
    //  发散
    spread,
}) => {
    color = color || 'white';
    y = y || 0;
    zIndex = zIndex || 0;
    spread = spread || 3;
    return (
        <div style={{
            boxShadow: `${color} 0 ${y}px 0 ${spread}px`,
            height: '0',
            position: 'relative',
            zIndex: zIndex,
        }} />
    );
};