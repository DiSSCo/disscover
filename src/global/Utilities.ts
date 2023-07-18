/* Function to capitalize the first character of a string */
const Capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/* Function for displaying a properties' value, or 'not provided'; used in ID Card */
const CheckProperty = (property: string | undefined): string => {
    if (property) {
        return property;
    } else {
        return 'Not provided';
    }
}

/* Function for checking if the user is using a mobile device */
const DetectMobile = (): boolean => {
    let mobile: boolean = false;

    /* Test Browser Agent */
    if (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i) ||
        navigator.userAgent.match(/Opera Mini/i) ||
        navigator.userAgent.match(/IEMobile/)
    ) {
        mobile = true;
    }

    /* Test Screen Size */
    if (!mobile && window.innerWidth <= 768) {
        mobile = true;
    }

    return mobile;
}

export {
    Capitalize,
    CheckProperty,
    DetectMobile
};