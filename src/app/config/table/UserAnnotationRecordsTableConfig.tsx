/* Import Dependencies */
import { createColumnHelper } from '@tanstack/react-table';

/* Import Utilities */
import { MakeJsonPathReadableString } from 'app/utilities/SchemaUtilities';


/**
 * Config function that sets up the basic table column template for the user annotation records table on the profile page
 * @returns Table columns
 */
const UserAnnotationRecordsTableConfig = () => {
    /* User annotation record type */
    type UserAnnotationRecord = {
        jsonPath: string,
        motivation: string,
        value: string | number | boolean
    };

    /* Base variables */
    const columnHelper = createColumnHelper<UserAnnotationRecord>();

    /* Table columns */
    const columns = [
        columnHelper.accessor('jsonPath', {
            header: 'Target',
            cell: info => MakeJsonPathReadableString(info.getValue()),
            meta: {
                widthInRem: 10,
                pinned: true
            }
        }),
        columnHelper.accessor('motivation', {
            header: 'Motivation',
            meta: {
                widthInRem: 10,
                pinned: true
            }
        }),
        columnHelper.accessor('value', {
            header: 'Annotation value',
            meta: {
                widthInRem: 10,
                pinned: true
            }
        })
    ];

    return { columns };
};

export default UserAnnotationRecordsTableConfig;