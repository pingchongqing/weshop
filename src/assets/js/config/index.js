import {CONSTANTS} from './constants'
import {setScreenHeight,getScreenHeight} from './screenHight'
import {getCsjUrl} from './contactUrl'
import {getPosition} from './getPosition'
import saveBrowseHistory from './savehistory'
import {isLocalStorageSupported} from './isLocalStorageSupported'
const CONFIG = {};
CONFIG.install = function (Vue, options) {
    Vue.prototype.$CONSTANTS = CONSTANTS;
    Vue.prototype.$getScreenHeight = getScreenHeight;
    Vue.prototype.$setScreenHeight = setScreenHeight;
    Vue.prototype.$getCsjUrl = getCsjUrl;
    Vue.prototype.$getPosition = getPosition;
    Vue.prototype.$saveBrowseHistory = saveBrowseHistory;
    Vue.prototype.$isLocalStorageSupported = isLocalStorageSupported;
};

export {CONFIG};
