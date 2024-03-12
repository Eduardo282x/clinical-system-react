import { ColumnDef, OptionsTable, TableInterface } from "../../interfaces/table.interface";

const options: OptionsTable = {
    showSeachInput: true,
    showAddBtn: true,
    showTable: true,
    showFilter: true
}

const columns: ColumnDef[] = [
    {
        header: 'Codigo',
        column: 'codService',
        type: 'string',
        filterOption: true,
        width: 100,
    },
    {
        header: 'Descripción',
        column: 'description',
        type: 'string',
        filterOption: true,
        width: 300,
    },
    {
        header: 'Precio',
        column: 'cost',
        type: 'price',
        filterOption: true,
        width: 100,
    },
    {
        header: 'Disponible',
        column: 'avalible',
        type: 'boolean',
        filterOption: true,
        width: 100,
    },
    {
        header: 'Editar',
        column: 'Edit',
        type: 'icon',
        filterOption: false,
        width: 100,
        action: 'Edit',
        colorBtn: 'primary'
    },
];

export const configTable: TableInterface = {
    iconTitle: 'services',
    widthDiv: '90rem',
    title: 'Servicios',
    rows: [],
    columns: columns,
    optionsComponents: options,
}


