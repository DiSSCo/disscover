/* Import Dependencies */
import { useState } from "react";

/* Import Components */
import UserAnnotationRecordsTable from "./UserAnnotationRecordsTable";
import UserMasJobRecordsTable from "./UserMasJobRecordsTable";
import { Tabs } from "components/elements/customUI/CustomUI";


/**
 * COmponent that renders the user record tables on the profile page
 * @returns JSX Component
 */
const UserRecordTables = () => {
    /* Base variables */
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
    const tabs = {
        'annotations': <UserAnnotationRecordsTable />,
        'MASJobRecords': <UserMasJobRecordsTable />
    };

    return (
        <div className="h-100">
            <Tabs tabs={tabs}
                selectedIndex={selectedTabIndex}
                SetSelectedIndex={setSelectedTabIndex}
            />
        </div>
    );
};

export default UserRecordTables;