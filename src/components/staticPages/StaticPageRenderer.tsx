/* Import dependencies */
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

/* Import styling */
import './StaticPageRenderer.scss';

/* Retrieve all static page sources */
const modules = import.meta.glob('../../sources/staticPages/*.md', { as: 'raw', eager: true });

interface Props {
    fileName: string;
  }

const StaticPageRenderer = ({ fileName }: Props) => {
    const [content, setContent] = useState<string>('');
  
    useEffect(() => {
      // Construct the path based on your folder structure
      const path = `../../sources/staticPages/${fileName}.md`;
      const rawText = modules[path];
  
      if (rawText) {
        setContent(rawText);
      } else {
        setContent('# File Not Found');
      }
    }, [fileName]);
  
    return (
      <div className="content-container">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
      </div>
    );
  };

  export default StaticPageRenderer;