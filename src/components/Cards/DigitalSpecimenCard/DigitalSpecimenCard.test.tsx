/* Import test dependencies */
import { screen, fireEvent, render } from 'tests/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';

/* Import component to test */
import { DigitalSpecimenCard } from './DigitalSpecimenCard';

/* Import hooks/components to mock */
import { useClipboard } from 'hooks/useClipboard';

/* Import types */
import { AnnotationTargetPayload } from 'types/digitalSpecimenTypes';

/* Mock custom hooks and subcomponents */
vi.mock('hooks/useClipboard', () => ({
    useClipboard: vi.fn(),
}));

/* Mock OpenStreetMap to check props passed to it without rendering the full map canvas */
vi.mock('components/elements/customUI/CustomUI', () => ({
    OpenStreetMap: ({ latitude, longitude }: { latitude?: number; longitude?: number }) => (
        <div data-testid="mock-map" data-lat={latitude} data-lng={longitude}>
            Map
        </div>
    ),
}));

/* Mock LabelValuePair to easily test key rendering and hidden item filtering */
vi.mock('components/LabelValuePair/LabelValuePair', () => ({
    LabelValuePair: ({ item }: { item: any }) => (
        <div data-testid="label-value-pair">
            <span>{item.label}:</span> <span>{String(item.value)}</span>
        </div>
    ),
}));

/* Mock Data */
const mockFragment = [
    { label: 'Organisation ID', value: 'https://ror.org/012345', type: 'string', hidden: false },
    { label: 'Organisation Name', value: 'Naturalis Biodiversity Center', type: 'string', hidden: false },
    { label: 'DOI', value: 'https://doi.org/10.1234/5678', type: 'string', hidden: false },
    { label: 'Decimal Latitude', value: 52.1601, type: 'number', hidden: false },
    { label: 'Decimal Longitude', value: 4.497, type: 'number', hidden: false },
    { label: 'Internal Secret', value: 'Hidden Data', type: 'string', hidden: true },
];

describe('DigitalSpecimenCard', () => {
    const mockCopyFn = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useClipboard).mockReturnValue({
            copy: mockCopyFn,
            hasCopied: false,
        });
    });

    it('renders the header title and non-hidden fragment items', () => {
        render(<DigitalSpecimenCard cardHeader="Specimen Overview" fragment={mockFragment} />);

        expect(screen.getByRole('heading', { name: 'Specimen Overview' })).toBeInTheDocument();

        /* LabelValuePair elements (5 visible items out of 6 in mockFragment) */
        const renderedPairs = screen.getAllByTestId('label-value-pair');
        expect(renderedPairs).toHaveLength(5);
        expect(screen.getByText('Organisation Name:')).toBeInTheDocument();
        expect(screen.queryByText('Internal Secret:')).not.toBeInTheDocument();
    });

    describe('Annotation functionality', () => {
        it('renders the Annotate button and passes the typed payload to AnnotateHelper', () => {
            const mockAnnotateHelper = vi.fn();
            
            const mockTarget: AnnotationTargetPayload = {
                type: 'class',
                jsonPath: '$.digitalSpecimen.dwc:scientificName',
                directPath: true
            };
    
            render(
                <DigitalSpecimenCard
                    cardHeader="Test Card"
                    fragment={mockFragment}
                    annotate={true}
                    annotationTarget={mockTarget}
                    AnnotateHelper={mockAnnotateHelper}
                />
            );
    
            const annotateBtn = screen.getByRole('button', { name: /annotate/i });
            expect(annotateBtn).toBeInTheDocument();
    
            fireEvent.click(annotateBtn);
            
            expect(mockAnnotateHelper).toHaveBeenCalledTimes(1);
            expect(mockAnnotateHelper).toHaveBeenCalledWith({
                type: 'class',
                jsonPath: '$.digitalSpecimen.dwc:scientificName',
                directPath: true
            });
        });
    
        it('handles term type targets correctly when directPath is omitted', () => {
            const mockAnnotateHelper = vi.fn();
            
            const mockTarget: AnnotationTargetPayload = {
                type: 'term',
                jsonPath: '$.digitalSpecimen.dwc:locality'
            };
    
            render(
                <DigitalSpecimenCard
                    cardHeader="Test Card"
                    fragment={mockFragment}
                    annotate={true}
                    annotationTarget={mockTarget}
                    AnnotateHelper={mockAnnotateHelper}
                />
            );
    
            fireEvent.click(screen.getByRole('button', { name: /annotate/i }));
    
            expect(mockAnnotateHelper).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'term',
                    jsonPath: '$.digitalSpecimen.dwc:locality'
                })
            );
        });
    });

    describe('Copy / Citation functionality', () => {
        it('copies formatted text to clipboard on Copy button click', () => {
            const currentYear = new Date().getFullYear();

            render(
                <DigitalSpecimenCard
                    cardHeader="Test Card"
                    fragment={mockFragment}
                    copy={true}
                />
            );

            const copyBtn = screen.getByRole('button', { name: /copy/i });
            fireEvent.click(copyBtn);

            const expectedCitationText = `Naturalis Biodiversity Center (${currentYear}). Distributed System of Scientific Collections. [Dataset]. https://doi.org/10.1234/5678`;
            expect(mockCopyFn).toHaveBeenCalledWith(expectedCitationText);
        });

        it('displays "Copied!" when clipboard state hasCopied is true', () => {
            vi.mocked(useClipboard).mockReturnValue({
                copy: mockCopyFn,
                hasCopied: true,
            });

            render(
                <DigitalSpecimenCard
                    cardHeader="Test Card"
                    fragment={mockFragment}
                    copy={true}
                />
            );

            expect(screen.getByRole('button', { name: /copied!/i })).toBeInTheDocument();
        });

        it('renders formatted citation HTML section when citation prop is true', () => {
            render(
                <DigitalSpecimenCard
                    cardHeader="Test Card"
                    fragment={mockFragment}
                    citation={true}
                />
            );

            const orgLink = screen.getByRole('link', { name: 'Naturalis Biodiversity Center' });
            expect(orgLink).toHaveAttribute('href', 'https://ror.org/012345');

            const doiLink = screen.getByRole('link', { name: 'https://doi.org/10.1234/5678' });
            expect(doiLink).toHaveAttribute('href', 'https://doi.org/10.1234/5678');
        });
    });

    describe('Georeference map', () => {
        it('renders map component with correct coordinates when georeference is true', () => {
            render(
                <DigitalSpecimenCard
                    cardHeader="Test Card"
                    fragment={mockFragment}
                    georeference={true}
                />
            );

            const map = screen.getByTestId('mock-map');
            expect(map).toBeInTheDocument();
            expect(map).toHaveAttribute('data-lat', '52.1601');
            expect(map).toHaveAttribute('data-lng', '4.497');
        });

        it('does not render map when georeference is false', () => {
            render(
                <DigitalSpecimenCard
                    cardHeader="Test Card"
                    fragment={mockFragment}
                    georeference={false}
                />
            );

            expect(screen.queryByTestId('mock-map')).not.toBeInTheDocument();
        });
    });
});