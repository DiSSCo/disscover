/* Import Dependencies */
import { useEffect, useState, useRef } from 'react';
import { Capitalize } from 'app/Utilities';
import classNames from 'classnames';

/* Import Store */
import { useAppDispatch } from 'app/hooks';
import { setIntroTopic } from 'redux/general/GeneralSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Styles */
import styles from '../header.module.scss';


/* Props Typing */
interface Props {
    introTopics: { intro: string, title: string }[],
    ToggleCollapseMenu?: Function
};


const IntroTopics = (props: Props) => {
    const { introTopics, ToggleCollapseMenu } = props;

    /* Hooks */
    const dispatch = useAppDispatch();
    const dropdownRef = useRef<HTMLDivElement>(null);

    /* Handling version dropdown with custom hook */
    const [dropdown, setDropdown] = useState(false);

    /* Class Names */
    const activeClass = classNames({
        'd-none': !dropdown
    });

    /* Hook for toggling the intro topic dropdown */
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
    
    /* Function for when clicked on the 'take a tour' button */
    const TakeATour = () => {
        if (introTopics.length > 1) {
            setDropdown(true);
        } else {
            dispatch(setIntroTopic(introTopics[0].intro));

            if (ToggleCollapseMenu) {
                ToggleCollapseMenu();
            }
        }
    }

    return (
        <div className="position-relative">
            <button type="button" className="primaryButton px-2 py-1"
                onClick={() => TakeATour()}
            >
                Take a tour
            </button>

            {/* Intro Topic options, if there are multiple options */}
            {introTopics.length > 1 &&
                <div className={`${styles.introTopics} ${activeClass} b-primary position-absolute bg-white rounded mt-2`}
                    ref={dropdownRef}
                >
                    {introTopics.map((introTopic) => {
                        return (
                            <div key={introTopic.intro} className={`${styles.introTopicItem} px-3 py-1 c-pointer`}
                                onClick={() => {
                                    dispatch(setIntroTopic(introTopic.intro));
                                    setDropdown(false);

                                    if (ToggleCollapseMenu) {
                                        ToggleCollapseMenu();
                                    }
                                }}
                            >
                                <p> {Capitalize(introTopic.title)} </p>
                            </div>
                        );
                    })}
                </div>
            }
        </div>
    );
}

export default IntroTopics;