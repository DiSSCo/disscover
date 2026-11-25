/* Import components */
import { Button, Select } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { SearchInputBar } from "./SearchInputBar";

/* Import dependencies */
import { FormEvent, useEffect, useState } from "react";

/* Import hooks */
import { FilterKey, useSearchFilters } from "hooks/useSearchFilters";

export const TextSearchFilter = () => {
    /* Hooks */
    const { searchFilters, setSingleFilter } = useSearchFilters();

    /* Base variables */
    const searchOptions: { value: FilterKey; displayName: string }[] = [
        { value: "q", displayName: "All data" },
    ];
    const textFilterKeys: FilterKey[] = searchOptions.map((option) => option.value);

    /* Detect which text filter key is currently active in the URL (defaulting to 'q') */
    const activeUrlKey: FilterKey =
        searchOptions.find((opt) => searchFilters[opt.value]?.length)?.value ?? "q";
    const activeUrlValue = searchFilters[activeUrlKey]?.[0] ?? "";

    const [filterKey, setFilterKey] = useState<FilterKey>(activeUrlKey);
    const [filterValue, setFilterValue] = useState<string>(activeUrlValue);

    /* Sync local draft state when the URL changes externally */
    useEffect(() => {
        setFilterKey(activeUrlKey);
        setFilterValue(activeUrlValue);
    }, [activeUrlKey, activeUrlValue]);

    /* Set the single filter when submitting the form */
    const handleSearchSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSingleFilter(filterKey, filterValue, textFilterKeys);
    };

    return (
        <form onSubmit={handleSearchSubmit} className="search-input-filter">
            <SearchInputBar
                value={filterValue}
                setInputValue={setFilterValue}
            />
            <Select.Root
                value={filterKey}
                onValueChange={(value) => setFilterKey(value as FilterKey)}
            >
                <Select.Trigger />
                <Select.Content>
                    {searchOptions.map((option) => (
                        <Select.Item
                            key={option.value}
                            value={option.value}
                            className="search-input-option"
                        >
                            {option.displayName}
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Root>
            <Button type="submit">
                Search
                <MagnifyingGlassIcon />
            </Button>
        </form>
    );
};