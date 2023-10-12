/* Function to capitalize the first character of a string */
const Capitalize = (string: string) => {
    if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
        return '';
    }
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
    if (/Android/i.exec(navigator.userAgent) ||
        /webOS/i.exec(navigator.userAgent) ||
        /iPhone/i.exec(navigator.userAgent) ||
        /iPod/i.exec(navigator.userAgent) ||
        /BlackBerry/i.exec(navigator.userAgent) ||
        /Windows Phone/i.exec(navigator.userAgent) ||
        /Opera Mini/i.exec(navigator.userAgent) ||
        /IEMobile/i.exec(navigator.userAgent)
    ) {
        mobile = true;
    }

    /* Test Screen Size */
    if (!mobile && window.innerWidth <= 768) {
        mobile = true;
    }

    return mobile;
}

/* Function for returning all filters from search params */
const GetFilters = (searchParams: URLSearchParams) => {
    const filters = [];

    for (const filterEntry of searchParams.entries()) {
        filters.push(filterEntry);
    }

    return filters;
}

/* Function for generating a random, ten character string */
const RandomString = () => {
    let result = '';

    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export {
    Capitalize,
    CheckProperty,
    DetectMobile,
    GetFilters,
    RandomString
};