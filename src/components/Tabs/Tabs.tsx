import { Tabs } from "@radix-ui/themes";
import { ReactNode } from "react";

/* Import styling */
import "./Tabs.scss";

interface Props {
    defaultValue: string,
    tabs: {
        value: string,
        title: string,
        component: ReactNode,
    }[]
}

export const DigitalSpecimenTabs = ({ defaultValue, tabs }: Props) => {
    return (
        <Tabs.Root defaultValue={defaultValue}>
            <Tabs.List>
                { tabs.map((tab) => {
                    return (
                        <Tabs.Trigger key={tab.value} value={tab.value}>{tab.title}</Tabs.Trigger>
                    )
                })}
            </Tabs.List>

            <div>
                { tabs.map((tab) => {
                    return (
                        <Tabs.Content key={'second-' + tab.value} value={tab.value}>
                            {tab.component}
                        </Tabs.Content>
                    )
                })}
            </div>
        </Tabs.Root>
    )
}