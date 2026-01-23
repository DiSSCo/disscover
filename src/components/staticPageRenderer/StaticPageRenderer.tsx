/* Import dependencies */
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
/* Plugin that allows html tags in markdown files */
import rehypeRaw from 'rehype-raw';

/* Import styling */
import './StaticPageRenderer.scss';

/* Retrieve all static page sources */
const modules = import.meta.glob('../../sources/staticPages/*.md', { eager: true, query: '?raw', import: 'default' });

interface Props {
    	fileName: string;
  	}

  /**
   * Component that renders content based on fileName
   * @param fileName Name of the markdown file to be retrieved from the sources
   * @returns JSX component to render the requested markdown file
   */
const StaticPageRenderer = ({ fileName }: Props) => {
    /* Base variables */
    const [content, setContent] = useState<string>();
    const errorMsg = '# Content not available. Please refresh the page'
  
    useEffect(() => {
		/* Find the requested markdown file in the modules */
		const rawText = modules[`../../sources/staticPages/${fileName}.md`] as string;
		
		/* Set content to either found text or to error message */
		if (rawText) {
			setContent(rawText);
		} else {
			setContent(errorMsg);
		}
    }, [fileName]);
  
    return (
		<main className="content-container">
			<ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
		</main>
    );
};

export default StaticPageRenderer;