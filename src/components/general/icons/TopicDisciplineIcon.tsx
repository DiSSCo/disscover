/* Import Webroot */
import AnthropologyIcon from 'webroot/icons/topicDiscipline/anthropology.png';
import AstrogeologyIcon from 'webroot/icons/topicDiscipline/astrogeology.png';
import BotanyIcon from 'webroot/icons/topicDiscipline/botany.png';
import EcologyIcon from 'webroot/icons/topicDiscipline/ecology.png';
import GeologyIcon from 'webroot/icons/topicDiscipline/geology.png';
import MicrobiologyIcon from 'webroot/icons/topicDiscipline/microbiology.png';
import OtherBiodiversityIcon from 'webroot/icons/topicDiscipline/otherBiodiversity.svg';
import OtherGeodiversityIcon from 'webroot/icons/topicDiscipline/otherGeodiversity.svg';
import PalaeontologyIcon from 'webroot/icons/topicDiscipline/palaeontology.png';
import ZoologyIcon from 'webroot/icons/topicDiscipline/zoology.png';


const TopicDisciplineIcon = (topicDiscipline?: string) => {
    switch (topicDiscipline) {
        case 'Anthropology': {
            return  AnthropologyIcon;
        }
        case 'Astrogeology': {
            return AstrogeologyIcon;
        }
        case 'Botany': {
            return BotanyIcon;
        }
        case 'Ecology': {
            return EcologyIcon;
        }
        case 'Geology': {
            return GeologyIcon;
        }
        case 'Microbiology': {
            return MicrobiologyIcon;
        }
        case 'Other Biodiversity': {
            return OtherBiodiversityIcon;
        }
        case 'Other Geodiversity': {
            return OtherGeodiversityIcon;
        }
        case 'Palaeontology': {
            return PalaeontologyIcon;
        }
        case 'Zoology': {
            return ZoologyIcon;
        }
        default: {
            return '';
        }
    }
}

export default TopicDisciplineIcon;