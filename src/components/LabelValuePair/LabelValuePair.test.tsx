/* Import test dependencies */
import { screen, fireEvent, render } from 'tests/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';

/* Import component & mocked dependencies */
import { LabelValuePair } from './LabelValuePair';
import { useClipboard } from 'hooks/useClipboard';
import { sanitizeHtmlWrapper } from 'utils/Utils';

/* Mock external dependencies */
vi.mock('hooks/useClipboard', () => ({
    useClipboard: vi.fn(),
}));

vi.mock('app/Utilities', () => ({
    RetrieveEnvVariable: vi.fn(() => 'https://doi.org/'),
}));

vi.mock('utils/Utils', () => ({
    sanitizeHtmlWrapper: vi.fn((html) => `<span>Sanitized: ${html}</span>`),
}));

describe('LabelValuePair', () => {
    const mockCopyFn = vi.fn();

    beforeEach(() => {
        vi.mocked(useClipboard).mockReturnValue({
            copy: mockCopyFn,
            hasCopied: false,
        });
    });

    describe('Null Guards / Conditional Rendering', () => {
        it('renders null if value is missing or empty', () => {
            const itemWithoutValue = {
                label: 'Scientific Name',
                value: '',
                isHtml: false,
                type: 'string',
                hidden: false,
            };

            const { container } = render(<LabelValuePair item={itemWithoutValue} />);
            expect(container.firstChild).toBeEmptyDOMElement();
        });

        it('renders null if hidden is set to true', () => {
            const hiddenItem = {
                label: 'Internal Code',
                value: 'Secret 123',
                isHtml: false,
                type: 'string',
                hidden: true,
            };

            const { container } = render(<LabelValuePair item={hiddenItem} />);
            expect(container.firstChild).toBeEmptyDOMElement();
        });
    });

    describe('Type Branching', () => {
        it('renders standard text for default type when isHtml is false', () => {
            const defaultItem = {
                label: 'Country',
                value: 'Netherlands',
                isHtml: false,
                type: 'string',
                hidden: false,
            };

            render(<LabelValuePair item={defaultItem} />);

            expect(screen.getByText('Country')).toBeInTheDocument();
            expect(screen.getByText('Netherlands')).toBeInTheDocument();
        });

        it('calls the sanitizeHtmlWrapper utility when isHtml is true and type is default', () => {
            const htmlItem = {
                label: 'Description',
                value: '<b>Panthera</b>',
                isHtml: true,
                type: 'string',
                hidden: false,
            };

            render(<LabelValuePair item={htmlItem} />);

            expect(sanitizeHtmlWrapper).toHaveBeenCalledWith('<b>Panthera</b>');
            expect(screen.getByText('Panthera')).toBeInTheDocument();
        });

        it('renders Catalogue of Life link for "url" type', () => {
            const urlItem = {
                label: 'Taxon Link',
                value: 'https://catalogueoflife.org/taxon/123',
                isHtml: false,
                type: 'url',
                hidden: false,
            };

            render(<LabelValuePair item={urlItem} />);

            const link = screen.getByRole('link', { name: /catalogue of life/i });
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute('href', 'https://catalogueoflife.org/taxon/123');
            expect(link).toHaveAttribute('target', '_blank');
        });

        it('renders stripped DOI button and invokes copy hook on click for "copy" type', () => {
            const copyItem = {
                label: 'DOI',
                value: 'https://doi.org/10.1234/5678',
                isHtml: false,
                type: 'copy',
                hidden: false,
            };

            render(<LabelValuePair item={copyItem} />);

            /* Check that DOI_URL prefix ('https://doi.org/') was stripped */
            const button = screen.getByRole('button', { name: '10.1234/5678' });
            expect(button).toBeInTheDocument();

            /* Click button to invoke copy */
            fireEvent.click(button);
            expect(mockCopyFn).toHaveBeenCalledWith('https://doi.org/10.1234/5678');
        });
    });
});