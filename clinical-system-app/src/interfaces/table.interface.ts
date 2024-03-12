/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ShortTableInterface {
    tableConfig: TableInterface;
    returnData: any;
    secondFunction: any;
}

export interface TableInterface {
    iconTitle: string;
    widthDiv: string;
    title: string;
    rows: any[];
    columns: ColumnDef[];
    optionsComponents: OptionsTable;
}

export interface ColumnDef {
    header: string;
    column: string;
    type: string;
    filterOption: boolean;
    width: number;
    action?: string;
    colorBtn?: string;
}

export interface OptionsTable {
    showSeachInput: boolean;
    showAddBtn: boolean;
    showTable: boolean;
    showFilter: boolean;
}

export interface RowAction {
    dataRow: any;
    action: string;
}