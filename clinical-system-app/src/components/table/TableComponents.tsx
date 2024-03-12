/* eslint-disable @typescript-eslint/no-explicit-any */
import {ColumnDef,ShortTableInterface,} from "../../interfaces/table.interface.ts";
import {
    AddIcon,
    DeleteIcon,
    EditIcon,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Paper,
    SearchIcon,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Table,
    DoneIcon,
    CloseIcon,
    MedicalServicesIcon,
    Switch,
} from "../../shared/materialUI.ts";
import React, { useState, useEffect } from "react";
import { StyledTableCell } from "./table.ts";
// import PropTypes from "prop-types";
import "./table.css";
import { pink } from "@mui/material/colors";

export const TableComponents: React.FC<ShortTableInterface> = ({tableConfig, returnData, secondFunction}) => {
    const {
        iconTitle,
        // widthDiv,
        title,
        rows,
        columns,
        optionsComponents,
    } = tableConfig;
    const [active, setActive] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [dataFilter, setDateFilter] = useState<any[]>([]);
    const classWidth = `flex flex-col items-center justify-center bg-gray-200 rounded-3xl p-5 w-[90rem]`;

    const setIcon = (actionIcon: string | boolean) => {
        if (actionIcon == "Edit") return <EditIcon color="primary" />;
        if (actionIcon == "Add") return <AddIcon />;
        if (actionIcon == "Delete") return <DeleteIcon sx={{ color: pink[500] }} />;
        if (actionIcon == true) return <DoneIcon color="primary" />;
        if (actionIcon == false) return <CloseIcon sx={{ color: pink[500] }} />;

        if (actionIcon == "services") return <MedicalServicesIcon />;
        // if (actionIcon == "info") return <InfoIcon />;
        // if (actionIcon == "home") return <HomeIcon />;
        // if (actionIcon == "location") return <LocationOnIcon />;
        // if (actionIcon == "light") return <LightbulbIcon />;
        // if (actionIcon == "engine") return <EngineeringIcon />;
    };

    const change = () => {
        setActive(!active);
        secondFunction(active);
    }

    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const filterValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filterInput = event.target.value;
        if (rows && rows.length > 0) {
            const filterColumn = columns.filter(
                (col: ColumnDef) => col.filterOption == true
            );
            const filtersKey = filterColumn.map((col: ColumnDef) => col.column);
            const filterSearch = filtersKey
                .map((col: string) =>
                    rows.filter((fil: any) =>
                        fil[col]
                            .toString()
                            .toLowerCase()
                            .includes(filterInput.toLowerCase())
                    )
                )
                .flat();
            const reduceFilter = new Set(filterSearch);
            const result: any = [...reduceFilter];
            setDateFilter(result);
        }
    };

    const sendData = (row: any, action: string | any) => {
        returnData({ action: action, dataRow: row });
    };

    const addNew = () => {
        returnData({ action: "Add", dataRow: null });
    };

    useEffect(() => {
        setDateFilter(rows);
    }, [rows]);

    return (
        <div className={classWidth}>
            <div className="flex items-center justify-between w-full px-5">
                <div className="flex items-center justify-center gap-3">
                    <p className="text-[#1565c0]">{setIcon(iconTitle)}</p>
                    <p className="text-black font-bold text-[24px]">{title}</p>
                </div>

                <div className="flex items-center justify-center gap-3">
                    {optionsComponents.showFilter && (
                        <>
                            <p>Disponibles</p>
                            <Switch onClick={change}/>
                        </>
                    )}

                    {optionsComponents.showSeachInput && (
                        <FormControl sx={{ width: "20vw" }} variant="outlined">
                            <InputLabel>Buscar</InputLabel>
                            <OutlinedInput
                                type="text"
                                onChange={filterValue}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                }
                                label="Buscar"
                            />
                        </FormControl>
                    )}

                    {optionsComponents.showAddBtn && (
                        <IconButton onClick={addNew}>
                            <AddIcon color="primary" />
                        </IconButton>
                    )}
                </div>
            </div>

            <div className="tableScroll">
                <TableContainer component={Paper} className="table">
                    <Table stickyHeader>
                        <TableHead sx={{ background: "#1565c0" }}>
                            <TableRow>
                                {columns.map((col: ColumnDef, ind: number) => (
                                    <StyledTableCell key={ind}>{col.header}</StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataFilter
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                    <TableRow key={index} sx={{ background: "#e5e7eb" }}>
                                        {columns.map((ro: ColumnDef, key: number) => (
                                            <TableCell key={key} sx={{ width: ro.width ? ro.width : 100 }}>
                                                {ro.type == "string" ? row[ro.column] : ""}
                                                {ro.type == "price" ? row[ro.column] + ".00$" : ""} 
                                                {ro.type == "date" ? row[ro.column] : ""}
                                                {ro.type == "boolean" ? setIcon(row[ro.column]) : ""}
                                                {ro.type == "icon" && (
                                                    <IconButton
                                                        className="editBtn"
                                                        onClick={() => sendData(row, ro.action)}
                                                    >
                                                        {setIcon(ro.column)}
                                                    </IconButton>
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <div className="flex items-center justify-end w-full">
                {dataFilter.length > 5 && (
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        component="div"
                        count={dataFilter.length}
                        rowsPerPage={rowsPerPage}
                        labelRowsPerPage={"Paginas"}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
            </div>
        </div>
    );
};

// TableComponents.propTypes = {
//     tableConfig: PropTypes.object,
// }
