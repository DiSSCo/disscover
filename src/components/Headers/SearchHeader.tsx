/* Import components */
import { Share2Icon } from "@radix-ui/react-icons"
import { Button } from "@radix-ui/themes";
import { TextSearchFilter } from "components/SearchFilters/TextSearchFilter";

/* Import hooks */
import { useClipboard } from "hooks/useClipboard";

/* Import styling */
import "./SearchHeader.scss";

export const SearchHeader = () => {
    /* Hooks */
    const { copy, hasCopied } = useClipboard();

    /* Base variables */
    const currentUrl = `${globalThis.location.origin}${location.pathname}${location.search}`;

    return (
        <header>
            <div className="search-header-top-btns">
                {/* Text search filter */}
                <TextSearchFilter></TextSearchFilter>

                <div>
                    <Button variant="ghost" onClick={() => copy(currentUrl)}>
                        {hasCopied ? 'Copied!' : 'Share'}
                        <Share2Icon />
                    </Button>
                </div>
            </div>
        </header>
    )
}