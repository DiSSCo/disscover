/* Import Webroot */
import AnthropologyIcon from 'webroot/icons/topicDiscipline/anthropology.svg';
import AstrogeologyIcon from 'webroot/icons/topicDiscipline/astrogeology.svg';
import BotanyIcon from 'webroot/icons/topicDiscipline/botany.svg';
import EcologyIcon from 'webroot/icons/topicDiscipline/ecology.svg';
import GeologyIcon from 'webroot/icons/topicDiscipline/geology.svg';
import MicrobiologyIcon from 'webroot/icons/topicDiscipline/microbiology.svg';
import OtherBiodiversityIcon from 'webroot/icons/topicDiscipline/otherBiodiversity.svg';
import OtherGeodiversityIcon from 'webroot/icons/topicDiscipline/otherGeodiversity.svg';
import PalaeontologyIcon from 'webroot/icons/topicDiscipline/palaeontology.svg';
import ZoologyIcon from 'webroot/icons/topicDiscipline/zoology.svg';


const TopicDisciplineIcon = (topicDiscipline?: string) => {
    let topicDisciplineIcon: string = '';

    switch (topicDiscipline) {
        case 'Anthropology': {
            topicDisciplineIcon = AnthropologyIcon;

            break;
        }
        case 'Astrogeology': {
            topicDisciplineIcon = AstrogeologyIcon;

            break;
        }
        case 'Botany': {
            topicDisciplineIcon = BotanyIcon;

            break;
        }
        case 'Ecology': {
            topicDisciplineIcon = EcologyIcon;

            break;
        }
        case 'Geology': {
            topicDisciplineIcon = GeologyIcon;

            break;
        }
        case 'Microbiology': {
            topicDisciplineIcon = MicrobiologyIcon;

            break;
        }
        case 'Other Biodiversity': {
            topicDisciplineIcon = OtherBiodiversityIcon;

            break;
        }
        case 'Other Geodiversity': {
            topicDisciplineIcon = OtherGeodiversityIcon;

            break;
        }
        case 'Palaeontology': {
            topicDisciplineIcon = PalaeontologyIcon;

            break;
        }
        case 'Zoology': {
            topicDisciplineIcon = ZoologyIcon;

            break;
        }
    }

    return topicDisciplineIcon;
}

export default TopicDisciplineIcon;