const CheckCurrentTaxonomyLevel = (taxonomyLevel: string, currentLevel: string) => {
    if (taxonomyLevel === 'genus') {
        return 'genus';
    } else if (taxonomyLevel === 'family' && currentLevel !== 'genus') {
        return 'family';
    } else if (taxonomyLevel === 'order' && !['genus', 'family'].includes(currentLevel)) {
        return 'order';
    } else if (taxonomyLevel === 'class' && !['genus', 'family', 'order'].includes(currentLevel)) {
        return 'class';
    } else if (taxonomyLevel === 'phylum' && !['genus', 'family', 'order', 'class'].includes(currentLevel)) {
        return 'phylum';
    } else {
        return currentLevel;
    }
}

export {
    CheckCurrentTaxonomyLevel
}