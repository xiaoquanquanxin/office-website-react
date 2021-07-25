//  产品的banner
const PROJECT_BANNER = 'PROJECT_BANNER';

//  设置产品banner信息
export const setProjectBanner = (projectBannerStyle) => {
    return { type: PROJECT_BANNER, projectBannerStyle };
};

export function REDUCER_BANNER_INFO(state = {
    projectBannerStyle: null,
}, action) {
    const { type, projectBannerStyle } = action;
    switch (type) {
        //  产品banner
        case PROJECT_BANNER:
            return Object.assign({}, state, { projectBannerStyle });
        default:
            return state;
    }
}