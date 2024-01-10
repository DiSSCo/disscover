/* Import Dependencies */
import { useState } from 'react';
import '@tanstack/react-table'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import classNames from 'classnames';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getWindowDimensions } from 'redux/general/GeneralSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Styles */
import styles from './tables.module.scss';


/* Props Typing */
interface Props {
    columns: any,
    data: Dict[],
    SelectAction?: Function
};

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends unknown, TValue> {
        widthInRem?: number,
        pinned?: boolean
    }
}


const DataTable = (props: Props) => {
    const { columns, data, SelectAction } = props;

    /* Base variables */
    const windowDimensions = useAppSelector(getWindowDimensions);
    const [hoverRowId, setHoverRowId] = useState<number>(-1);
    const oneRem = 0.85 * windowDimensions.vw / 100;
    let pinnedCount: number = 0;

    /* Table initiation */
    const table = useReactTable({
        columns: columns,
        data: data,
        getCoreRowModel: getCoreRowModel()
    });

    /* Count pinned columns */
    columns.forEach((column: Dict) => {
        if (column.meta.pinned) {
            pinnedCount++;
        }
    });

    /* Function to determine table header class names */
    const HeaderClassNames = (pinned: boolean = false) => {
        return classNames({
            'bgc-secondary c-white fs-4 px-3 py-3': true,
            'position-sticky z-1': pinned
        });
    }

    /* Function to determine table row class names */
    const RowClassNames = (selected: boolean) => {
        return classNames({
            [`${styles.dataTableRow} bgc-white`]: true,
            'bgc-tableHover': selected
        });
    }

    /* Function to determine table column class names */
    const ColumnClassNames = (rowIndex: number, selected: boolean, pinned: boolean = false) => {
        return classNames({
            [`${styles.dataTableColumn} fs-4 px-3 py-2 b-bottom-grey c-pointer`]: true,
            'position-sticky z-1 bgc-white': pinned,
            'bgc-tableHover': hoverRowId === rowIndex || selected
        });
    }

    return (
        <div className="h-100 overflow-auto rounded-c">
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
                                            className={HeaderClassNames(header.column.columnDef.meta?.pinned)}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
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
                    {table.getRowModel().rows.map((row) => {
                        let totalRowWidth: number = 0;

                        return (
                            <tr key={row.id}
                                className={RowClassNames(row.original.selected || row.original.compareSelected)}
                                onClick={() => { if (!window.getSelection()?.toString() && SelectAction) { SelectAction(row.original) } }}
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
                                            className={ColumnClassNames(Number(row.id), row.original.selected || row.original.compareSelected, cell.column.columnDef.meta?.pinned)}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;