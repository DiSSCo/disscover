/* Import components */
import { LoopIcon, MagnifyingGlassIcon, Share2Icon } from "@radix-ui/react-icons"
import { Button, Select } from "@radix-ui/themes";

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
                <div className="search-input-filter">
                    <input type="text" placeholder="Search..." />
                    <Select.Root defaultValue="scientific-name" size="3">
                        <Select.Trigger />
                        <Select.Content>
                            <Select.Item value="scientific-name" className="search-input-option">Scientific name</Select.Item>
                            <Select.Item value="digital-specimen-id" className="search-input-option">Digital specimen ID</Select.Item>
                            <Select.Item value="virtual-collection"className="search-input-option">Virtual collection</Select.Item>
                            <Select.Item value="all-data"className="search-input-option">All data</Select.Item>
                        </Select.Content>
                    </Select.Root>
                    <Button size="3">
                        Search
                        <MagnifyingGlassIcon />
                    </Button>
                </div>
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