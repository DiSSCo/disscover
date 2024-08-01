/* Import Dependencies */
import classNames from 'classnames';
import { cloneElement, useState } from 'react';
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs';

/* Import Utilities */
import { MakeReadableString } from 'app/Utilities';

/* Import Types */
import { Dict } from 'app/Types';


/* Props Type */
type Props = {
    tabs: {
        [name: string]: JSX.Element
    },
    selectedIndex?: number,
    tabProps?: {
        [propName: string]: string | number | boolean | Dict | Function
    },
    tabClassName?: string,
    tabPanelClassName?: string,
    SetSelectedIndex: Function
};


/**
 * Component that renders tabs according to the application's style
 * @param tabs An object containg tab records, identified with the name of the tab as the key and the JSX component as the value
 * @param selectedIndex The selected index in the parent state
 * @param tabProps The Props object that should be passed onto the individual tabs
 * @param tabClassName Additional class names to append to a tab
 * @param tabPanelClassName Addition class names to append to a tab panel
 * @param SetSelectedIndex A function to set the selected index in the parent component
 * @returns JSX Component
 */
const Tabs = (props: Props) => {
    const { tabs, selectedIndex, tabProps, tabClassName, tabPanelClassName, SetSelectedIndex } = props;

    /* Base variables */
    const [localSelectedIndex, setLocalSelectedIndex] = useState<number>(selectedIndex ?? 0);

    /* Class Names */
    const tabClass = classNames({
        [`${tabClassName}`]: true,
        'fs-4': !tabClassName?.includes('fs')
    });

    return (
        <ReactTabs selectedIndex={typeof(selectedIndex) !== 'undefined' ? selectedIndex : localSelectedIndex}
            className="h-100 d-flex flex-column"
            onSelect={(index: number) => {
                typeof(selectedIndex) !== 'undefined' ? SetSelectedIndex?.(index)
                : setLocalSelectedIndex(index);
            }}
        >
            {/* Tabs List */}
            <TabList className="tabsList p-0">
                {/* Generate tabs from tabs list */}
                {Object.keys(tabs).map(key => (
                    <Tab key={`tab_${key}`}
                        className={`${tabClass} react-tabs__tab bgc-grey fw-lightBold br-round me-2`}
                        selectedClassName="bgc-primary tc-white fw-bold"
                    >
                        {MakeReadableString(key)}
                    </Tab>
                ))}
            </TabList>
            {/* Tab Panels */}
            {Object.entries(tabs).map(([key, value]) => (
                <TabPanel key={`tabPanel_${key}`}
                    className={`${tabPanelClassName} react-tabs__tab-panel w-100 flex-grow-1`}
                >
                    {cloneElement(value, {
                        ...tabProps
                    })}
                </TabPanel>
            ))}
        </ReactTabs>
    );
};

export default Tabs;