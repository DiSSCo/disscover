/* Import dependencies */
import { screen } from '@testing-library/react';
import { render } from 'tests/test-utils'
import { describe, it, expect } from 'vitest';

/* Import components */
import StaticPageRenderer from './StaticPageRenderer';

const markdownMock = '# This is a test title';

describe('StaticPageRenderer Component', () => {
    it('renders the title of the mock content when pageContent is passed', () => {
        render(<StaticPageRenderer pageContent={markdownMock}/>);

        expect(screen.getByRole('heading', { name: /this\s*is\s*a\s*test\s*title/i })).toBeInTheDocument();
    });
});