import { Button } from "@radix-ui/themes";

/* Import styling */
import './TabsList.scss';
import { TabItem } from "types/digitalSpecimenTypes";

interface TabListProps {
    tabs: TabItem[],
    SetCurrentTab: Function,
    currentTab: string,
}

export const TabsList = ({ tabs, SetCurrentTab, currentTab }: TabListProps) => {

    return (
        <div className="tabs-list">
            { tabs.map((tab: TabItem) => {
                return (
                    <div key={tab.value} className={`tab ${currentTab === tab.value ? 'active' : ''}`}>
                        <Button variant="ghost" onClick={() => SetCurrentTab(tab.value)}>
                            {tab.title}
                        </Button>
                    </div>
                )
            })}
        </div>
    )
}