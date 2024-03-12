/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getDataApi } from "../../backend/BasicAxios"
import { ServicesData } from "../../interfaces/services.interface";
import { TableComponents } from "../../components/table/TableComponents";
import { configTable } from "./services.data";
import { RowAction, TableInterface } from "../../interfaces/table.interface";

export const Services = () => {

    const [config, setConfig] = useState<TableInterface>(configTable);
    const [servicesData, setServicesData] = useState<ServicesData[]>([]);

    const getServices = () => {
        getDataApi('services').then((data: ServicesData[]) => {
            setServicesData(data);
            const conf = configTable;
            conf.rows = data;
            setConfig(conf);
        });
    }

    const servicesAvalibles = () => {
        const dataNormal = config;
        dataNormal.rows = config.rows.filter((ser: ServicesData) => ser.avalible == true);
        setConfig(dataNormal);
    }

    const servicesAll = () => {
        const dataNormal = config;
        dataNormal.rows = servicesData;
        setConfig(dataNormal);
    }
    
    const changeData = (filter: boolean) => {
        if(!filter){
            servicesAvalibles();
        } else {
            servicesAll();
        }
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
            <TableComponents tableConfig={config} returnData={getData} secondFunction={changeData}/>

        </div>
    )
}
