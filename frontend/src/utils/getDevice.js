export const getDevice = () => {
    if (typeof window !== 'undefined') {
        const varUA = navigator.userAgent.toLowerCase();

        if ( varUA.indexOf('android') > -1) {
            return "android";
        } else if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
            return "ios";
        }
    }

    return null;
}