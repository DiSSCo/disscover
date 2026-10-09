import { TabItem } from "types/digitalSpecimenTypes";

interface TabContentProps {
    currentTab: string,
    tabs: TabItem[],
}

export const TabsContent = ({ currentTab, tabs }: TabContentProps) => {
    const renderActiveTabContent = () => { 
        const correctTab = tabs.find((tab: TabItem) => { return tab.value === currentTab});
        return correctTab?.component;
    }

    return (
        renderActiveTabContent()
    );
};