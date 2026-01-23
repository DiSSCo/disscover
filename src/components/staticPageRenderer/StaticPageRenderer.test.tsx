/* Import dependencies */
import { screen } from '@testing-library/react';
import { render } from 'tests/test-utils'
import { describe, it, expect } from 'vitest';

/* Import components */
import StaticPageRenderer from './StaticPageRenderer';

describe('StaticPageRenderer Component', () => {
    it('renders the title of the about page when fileName is about', () => {
        render(<StaticPageRenderer fileName="about"/>);

        expect(screen.getByRole('heading', { name: /about\s*disscover/i })).toBeInTheDocument();
    });

    it('renders the title of the privacy page when fileName is privacy', () => {
        render(<StaticPageRenderer fileName="privacy"/>);

        expect(screen.getByRole('heading', { name: /privacy/i })).toBeInTheDocument();
    });

    it('renders the title of the acknowledgements page when fileName is acknowledgements', () => {
        render(<StaticPageRenderer fileName="acknowledgements"/>);

        expect(screen.getByRole('heading', { name: /acknowledgements/i })).toBeInTheDocument();
    });

    it('renders the title of the terms page when fileName is terms', () => {
        render(<StaticPageRenderer fileName="terms"/>);

        expect(screen.getByRole('heading', { name: /dissco\s*acceptable\s*use\s*policy\s*and\s*conditions\s*of\s*use/i })).toBeInTheDocument();
    });
});