/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getDataApi } from "../../backend/BasicAxios"
import { ServicesData } from "../../interfaces/services.interface";
import { TableComponents } from "../../components/table/TableComponents";
import { configTable } from "./services.data";
import { RowAction, TableInterface } from "../../interfaces/table.interface";

export const Services = () => {

    const [config, setConfig] = useState<TableInterface>(configTable);

    const getServices = () => {
        getDataApi('services').then((data: ServicesData[]) => {
            const conf = configTable;
            conf.rows = data;
            setConfig(conf);
        })
    }

    useEffect(() => {
        getServices();
    }, []);

    const getData = (data: RowAction) => {
        const {action} = data
        const dataRow: ServicesData = data.dataRow;
        console.log(dataRow);
        console.log(action);
    }

    return (
        <div>
            <TableComponents tableConfig={config} returnData={getData}/>

        </div>
    )
}
