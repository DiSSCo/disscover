/* Import dependencies */
import ReactMarkdown from 'react-markdown';
/* Plugin that allows html tags in markdown files */
import rehypeRaw from 'rehype-raw';

/* Import styling */
import './StaticPageRenderer.scss';


interface Props {
    	pageContent: string;
  	}

  /**
   * Component that renders content based on fileName
   * @param pageContent Content of the markdown file that is to be shown
   * @returns JSX component to render the requested markdown file
   */
const StaticPageRenderer = ({ pageContent }: Props) => {
    return (
		<main className="content-container">
			<ReactMarkdown rehypePlugins={[rehypeRaw]}>{pageContent}</ReactMarkdown>
		</main>
    );
};

export default StaticPageRenderer;