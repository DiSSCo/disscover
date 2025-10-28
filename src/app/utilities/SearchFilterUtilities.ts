const missingDataFilters = {
    'hasGenus': [],
    'hasClass': [],
    'hasLatitude': [],
    'hasPhylum': [],
    'hasCountry': [],
    'hasLongitude': [],
    'hasFamily': [],
    'hasKingdom': [],
    'hasLocality': [],
    'hasOrder': [],
    'hasSpecies': []
}

const formatMissingDataFilter = (name: string, type: ('title' | 'filter')) => {
    switch(type) {
        case 'title':
            return name.replace('no', 'No ');
        case 'filter':
            return name.replace('no', 'has');
        default:
            return name;
    }
}

export {
    missingDataFilters,
    formatMissingDataFilter
}