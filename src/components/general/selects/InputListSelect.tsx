/* Import Dependencies */
import { useEffect, useState, useRef, SyntheticEvent } from "react"
import classNames from "classnames";
import { isEmpty } from "lodash";

/* Import Types */
import { InputListSelectItem } from "app/Types";

/* Import Styles */
import styles from './Selects.module.scss';


/* Props Typing */
interface Props {
    items: InputListSelectItem[],
    OnItemSelect: Function,
    OnClose: Function
};


const InputSelectList = (props: Props) => {
    const { items, OnItemSelect, OnClose } = props;

    /* Hooks */
    const inputSelectListRef = useRef<HTMLDivElement>(null);

    /* Base variables */
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    /* OnChange of items: reset selected index to zero */
    useEffect(() => {
        setSelectedIndex(0);
    }, [items]);

    /* OnChange of selected index: initiate keyboard event listener to select items with the Up and Down arrow keys */
    useEffect(() => {
        let localIndex: number = selectedIndex;

        const HandleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowDown' && ((localIndex + 1) < items?.length)) {
                setSelectedIndex(localIndex + 1);

                localIndex = localIndex + 1;
            } else if (event.key === 'ArrowUp' && ((localIndex- 1) >= 0)) {
                setSelectedIndex(localIndex - 1);

                localIndex = localIndex - 1;
            } else if (event.key === 'Enter') {
                OnItemSelect(items[localIndex].name);
                OnClose();
            }
        }

        if (items && !isEmpty(items)) {
            document.addEventListener('keydown', HandleKeyDown);
        } else {
            document.removeEventListener('keydown', HandleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', HandleKeyDown);
        };
    }, [items, selectedIndex]);

    /* Hook to close the Input Select List when clicked outside of it */
    const UseSpeciesSearch = () => {
        useEffect(() => {
            const speciesSearchElement = inputSelectListRef.current as HTMLDivElement;

            const handleClickOutside = (event: any) => {
                if (!speciesSearchElement.contains(event.target)) {
                    if (items) {
                        OnClose();
                    }
                }
            }

            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [inputSelectListRef, items]);
    }

    UseSpeciesSearch();

    /* ClassNames */
    const classInputListSelect = classNames({
        'position-absolute w-100 mt-2': true,
        'd-block': items,
        'd-none ': !items
    });

    const ClassInputSelectListItem = (index: number) => {
        return classNames({
            [`${styles.inputListSelectOption} c-pointer bgc-white px-3 py-2 b-grey w-100`]: true,
            [`${styles.active}`]: index === selectedIndex
        });
    }

    return (
        <div ref={inputSelectListRef}
            className={classInputListSelect}
        >
            {items &&
                <ul className="p-0 list-style-none">
                    {items.map((item, index) => (
                        <li key={item.name}
                            className={ClassInputSelectListItem(index)}
                            onMouseEnter={() => setSelectedIndex(index)}
                            onClick={() => {
                                OnItemSelect(item.name);
                                OnClose();
                            }}
                        >
                            <p className="fs-4"> {item.name} </p>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}

export default InputSelectList;