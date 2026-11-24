import { Button, Select } from "@radix-ui/themes"
import { SearchInputBar } from "./SearchInputBar"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"

export const TextSearchFilter = () => {
    return (
        <div className="search-input-filter">
            <SearchInputBar />
            <Select.Root defaultValue="scientific-name">
                <Select.Trigger />
                <Select.Content>
                    <Select.Item value="scientific-name" className="search-input-option">Scientific name</Select.Item>
                    <Select.Item value="digital-specimen-id" className="search-input-option">Digital specimen ID</Select.Item>
                    <Select.Item value="virtual-collection"className="search-input-option">Virtual collection</Select.Item>
                    <Select.Item value="all-data"className="search-input-option">All data</Select.Item>
                </Select.Content>
            </Select.Root>
            <Button>
                Search
                <MagnifyingGlassIcon />
            </Button>
        </div>
    )
}