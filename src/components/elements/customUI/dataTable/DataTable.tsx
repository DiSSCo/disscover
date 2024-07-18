/* Import Dependencies */
import { useState } from 'react';
import classNames from 'classnames';
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    FilterFn
} from '@tanstack/react-table';
import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Styles */
import styles from './dataTable.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';


/* Props Type */
interface Props {
    columns: any,
    data: Dict[],
    selectedRowIndex?: number,
    SelectAction?: Function
};

/* React Table module */
declare module '@tanstack/react-table' {
    interface ColumnMeta<TData, TValue> {
        widthInRem?: number,
        link?: boolean,
        sortable?: boolean,
        pinned?: boolean
    }
};

/* TanStack Table module */
declare module '@tanstack/table-core' {
    interface FilterFns {
        fuzzy: FilterFn<unknown>
    }
    interface FilterMeta {
        itemRank: RankingInfo
    }
};


/**
 * Component that renders a customizable data table including options for pinning columns, sorting and selecting rows
 * @param columns The columns to be rendered in the data table, type is based on one full data row
 * @param data The data to be rendered as data rows in the data table
 * @param selectedRowIndex The index of the currently selected data row
 * @param SelectAction The function to execute when selecting a data row
 * @returns JSX Component
 */
const DataTable = (props: Props) => {
    const { columns, data, selectedRowIndex, SelectAction } = props;

    /* Base variables */
    const [hoverRowId, setHoverRowId] = useState<number>(-1);
    const oneRem = 0.85 * window.innerWidth / 100;
    let pinnedCount: number = 0;

    /**
     * Function to sort by a given column
     * @param row The row to filter
     * @param columnId The id of the column to filter by
     * @param value The value to filter by
     * @param addMeta Function to add meta data to the filter
     * @returns Boolean
     */
    const FuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
        /* Rank the item */
        const itemRank = rankItem(row.getValue(columnId), value)

        /* Store the itemRank info */
        addMeta({
            itemRank
        });

        /* Return if the item should be filtered in/out */
        return itemRank.passed
    };

    /* Table initiation */
    const table = useReactTable({
        columns: columns,
        data: data,
        filterFns: {
            fuzzy: FuzzyFilter,
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel()
    });

    /* Count pinned columns */
    columns.forEach((column: Dict) => {
        if (column.meta.pinned) {
            pinnedCount++;
        };
    });

    /**
     * Class Names function for the table header
     * @param pinned Boolean, if is pinned or not
     * @returns Class Name
     */
    const HeaderClass = (pinned: boolean = false) => {
        return classNames({
            'px-3 py-3 fs-4 bgc-secondary-hard tc-white': true,
            'position-sticky z-1': pinned
        });
    };

    /**
     * Class Names function for a data table row
     * @param selected Boolean, if row is selected or not
     * @returns Class Name
     */
    const RowClassNames = (rowIndex: number) => {
        return classNames({
            [`${styles.dataTableRow}`]: true,
            [`bgc-white tr-fast hover-secondary`]: true,
            'bgc-secondary-soft': rowIndex === selectedRowIndex
        });
    };

    /**
     * Class Names function for a data table column
     * @param rowIndex The index of the row
     * @param selected Boolean, if the column is selected or not
     * @param pinned Boolean, if the column is pinned or not
     * @returns Class Name
     */
    const ColumnClassNames = (rowIndex: number, selected: boolean, pinned: boolean = false) => {
        return classNames({
            [`${styles.dataTableColumn} fs-5 px-3 py-2 b-bottom-grey mc-pointer`]: true,
            'position-sticky z-1 bgc-white': pinned,
            'bgc-secondary-soft': hoverRowId === rowIndex || selectedRowIndex === rowIndex || selected /*|| selected*/
        });
    };

    return (
        <div className="h-100 overflow-auto br-corner">
            <table className={`${styles.dataTable} w-100`}>
                <thead className="position-sticky top-0 z-2">
                    {table.getHeaderGroups().map(headerGroup => {
                        let totalRowWidth: number = 0;

                        return (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const headerWidth: number = header.column.columnDef.meta?.widthInRem ?
                                        header.column.columnDef.meta.widthInRem * oneRem
                                        : header.column.getSize();

                                    totalRowWidth += headerWidth;

                                    return (
                                        <th key={header.id}
                                            style={{
                                                width: headerWidth,
                                                minWidth: headerWidth,
                                                ...(header.column.columnDef.meta?.pinned && { 'left': `${totalRowWidth - headerWidth}px` })
                                            }}
                                            className={HeaderClass(header.column.columnDef.meta?.pinned)}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div className={header.column.columnDef.meta?.sortable
                                                    ? 'mc-pointer select-none'
                                                    : ''
                                                }
                                                    {...(header.column.columnDef.meta?.sortable && {
                                                        onClick: header.column.getToggleSortingHandler()
                                                    })}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {{
                                                        asc: <FontAwesomeIcon icon={faChevronUp}
                                                            className="ms-2"
                                                        />,
                                                        desc: <FontAwesomeIcon icon={faChevronDown}
                                                            className="ms-2"
                                                        />
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </div>
                                            )}
                                        </th>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </thead>

                <tbody className="flex-grow-1 overflow-x-hidden overflow-y-scrol bgc-white"
                    onMouseLeave={() => setHoverRowId(-1)}
                >
                    {data.length ? table.getRowModel().rows.map((row) => {
                        let totalRowWidth: number = 0;

                        return (
                            <tr key={row.id}
                                className={RowClassNames(row.index)}
                                onMouseEnter={() => setHoverRowId(Number(row.id))}
                            >
                                {row.getVisibleCells().map((cell, cellIndex) => {
                                    const columnWidth: number = cell.column.columnDef.meta?.widthInRem ?
                                        cell.column.columnDef.meta.widthInRem * oneRem
                                        : cell.column.getSize();

                                    totalRowWidth += columnWidth;

                                    return (
                                        <td key={cell.id}
                                            style={{
                                                width: columnWidth,
                                                minWidth: columnWidth,
                                                ...(cell.column.columnDef.meta?.pinned && { left: `${totalRowWidth - columnWidth}px` }),
                                                ...((cell.column.columnDef.meta?.pinned && (cellIndex + 1) === pinnedCount) && { 'borderRight': '1px solid #D9D9DF' })
                                            }}
                                            className={ColumnClassNames(row.index, row.original.selected, cell.column.columnDef.meta?.pinned)}
                                            onClick={() => { if (!window.getSelection()?.toString() && SelectAction && !cell.column.columnDef.meta?.link) { SelectAction(row.original) } }}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    }) : <tr>
                        <td>
                            <div className="w-100 text-center position-absolute mt-2">
                                <p> No records found </p>
                            </div>
                        </td>
                    </tr>}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;