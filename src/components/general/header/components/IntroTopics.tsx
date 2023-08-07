/* Import Dependencies */
import { useEffect, useState, useRef } from 'react';
import { Capitalize } from 'global/Utilities';
import classNames from 'classnames';

/* Import Store */
import { useAppDispatch } from 'app/hooks';
import { setIntroTopic } from 'redux/general/GeneralSlice';

/* Import Types */
import { Dict } from 'global/Types';

/* Import Styles */
import styles from '../header.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    introTopics: string[]
};


const IntroTopics = (props: Props) => {
    const { introTopics } = props;

    /* Hooks */
    const dispatch = useAppDispatch();
    const dropdownRef = useRef<HTMLDivElement>(null);

    /* Handling version dropdown with custom hook */
    const [dropdown, setDropdown] = useState(false);

    /* Class Names */
    const activeClass = classNames({
        'd-none': !dropdown
    });

    const UseDropdown = () => {
        useEffect(() => {
            const dropdownElement = dropdownRef.current as HTMLDivElement;

            const handleClickOutside = (event: Dict) => {
                if (!dropdownElement.contains(event.target)) {
                    if (dropdown && !event.target.className.includes('specimen_versionOption')) {
                        setDropdown(false);
                    }
                }
            }

            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [dropdownRef, dropdown])
    }

    if (introTopics.length > 1) {
        UseDropdown();
    }

    return (
        <div className="position-relative">
            <FontAwesomeIcon icon={faCompass}
                className="c-pointer"
                onClick={() => introTopics.length > 1 ? setDropdown(true) : dispatch(setIntroTopic(introTopics[0]))}
            />

            {/* Intro Topic options, if there are multiple options */}
            {introTopics.length > 1 &&
                <div className={`${styles.introTopics} ${activeClass} position-absolute bg-white rounded`}
                    ref={dropdownRef}
                >
                    {introTopics.map((introTopic) => {
                        return (
                            <div key={introTopic} className={`${styles.introTopicItem} px-3 py-1 c-pointer`}
                                onClick={() => {
                                    dispatch(setIntroTopic(introTopic));
                                    setDropdown(false);
                                }}
                            >
                                <p> {Capitalize(introTopic)} </p>
                            </div>
                        );
                    })}
                </div>
            }
        </div>
    );
}

export default IntroTopics;