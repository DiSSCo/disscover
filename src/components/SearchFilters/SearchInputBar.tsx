type SearchInputBarProps = {
    value: string;
    setInputValue: (value: string) => void;
};

export const SearchInputBar = ({
    value,
    setInputValue,
}: SearchInputBarProps) => {
    return (
        <div>
            <input
                type="text"
                value={value}
                placeholder="Search..."
                className="form-input"
                onChange={(e) => setInputValue(e.target.value.toString())}
            />
        </div>
    );
};