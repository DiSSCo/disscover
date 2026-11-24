import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { TextField } from "@radix-ui/themes"

type SearchInputBarProps = {
    icon?: boolean
}

export const SearchInputBar = ({ icon = false }: SearchInputBarProps ) => {
    return (
        <TextField.Root placeholder="Search...">
            <TextField.Slot>
                { icon && 
                <MagnifyingGlassIcon height="16" width="16" />
                }
            </TextField.Slot>
        </TextField.Root>
    )
}