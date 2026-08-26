/* Import components */
import { Hero } from 'components/Hero/Hero';

export const DigitalMediaOverview = () => {
    return (
        <div className="digital-specimen-page">
            <Hero
                title="image"
                showShareButton={true}
                badge={[{
                    content: 'image',
                    type: 'solid',
                    color: 'amber'
                }]}
            >
            </Hero>
        </div>
    )
}