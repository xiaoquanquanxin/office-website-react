//  是否打开播放器
export const VIDEO_IS_OPEN = 'VIDEO_IS_OPEN';

/**
 * 是否打开播放器，如果打开就有资源
 * @param {boolean} videoIsOpen
 * @param {string} videoSrc
 * */
export function setVideoOpenStatus(videoIsOpen, videoSrc) {
    return { type: VIDEO_IS_OPEN, videoIsOpen, videoSrc };
}

//  播放器
export function REDUCER_VIDEO(state = {
    videoIsOpen: false,
    videoSrc: '',
}, action) {
    const { type, videoIsOpen, videoSrc } = action;
    switch (type) {
        case VIDEO_IS_OPEN:
            return Object.assign({}, state, { videoIsOpen, videoSrc });
        default:
            return state;
    }
}