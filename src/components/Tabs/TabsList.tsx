import { Button } from "@radix-ui/themes";

/* Import styling */
import './TabsList.scss';

/* Import types */
import { TabItem } from "types/digitalSpecimenTypes";

interface TabListProps {
    tabs: TabItem[],
    setCurrentTab: Function,
    currentTab: string,
}

export const TabsList = ({ tabs, setCurrentTab, currentTab }: TabListProps) => {

    return (
        <div className="tabs-list">
            { tabs.map((tab: TabItem) => {
                return (
                    <div key={tab.value} className={`tab ${currentTab === tab.value ? 'active' : ''}`}>
                        <Button variant="ghost" onClick={() => setCurrentTab(tab.value)}>
                            {tab.title}
                        </Button>
                    </div>
                )
            })}
        </div>
    )
}