import React, { useState, useEffect } from "react";
import {
    withStyles,
    makeStyles,
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Modal,
    Table,
    Paper,
    TableRowColumn
} from "@material-ui/core";
import moment from "moment";
import { MaterialUIPickers } from "./MaterialUIPickers"
import { MaterialUIModal } from "./MaterialUIModal"

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#F1F1F4",
        color: "#556789",
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    body: {
        fontSize: 14
    }
}))(TableCell);

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700
    },
    paper: {
        position: "absolute",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    },
    popTableCell: {
        flexGrow: 1,
        borderBottom: "none",
        paddingLeft: "0px",
        paddingRight: "40px"
    },
    popButton: {
        border: "1px solid #000"
    },
    popButtonWraper: {
        borderBottom: "none"
    },
    popPriceTableCell: {
        borderBottom: "none"
    },
    tableCell : {
        padding : '0',
        borderBottom: "none"       
    }
}));

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return { top: `${top}%`, left: `${left}%`, transform: `translate(-${top}%, -${left}%)` };
}

export default function SimpleTable(props) {
    const classes = useStyles();
    const [rowData, setRowData] = useState(props.rowsData);     
    const [isModalOpen, setIsModalOpen] = useState({ modalId: "" });  
    const [isCalenderOpen, setIsCalenderOpen] = useState({ calenderId: "" });

    useEffect(() => {
        setRowData(props.rowsData);
    }, [props.rowsData]);

    const handleOpen = (event) => {
        setIsModalOpen({ [event.target.id]: true });
    };

    const handleCalenderOpen = (event) => {          
        setIsCalenderOpen({ [event.target.id]: true });        
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleCalenderClose = (elementId) => {        
        setIsCalenderOpen({ [elementId]: false });        
    }

    const getSelectedDate = (elementId, elementValue) => {
        const newCampaignListing = new Map(rowData);
        const currentRow = newCampaignListing.get(elementId);
        if(currentRow) {
            currentRow['date'] = elementValue.valueOf();
            newCampaignListing.set(elementId, currentRow);
            setRowData(newCampaignListing);
        }
    }
    
    const timePeriod = (date) => {
        let status;
        switch (props.timeperiod) {
            case "past": 
                status = moment().diff(date, "days") > 0;
                break;
            case "present":
                status = moment().diff(date, "days") === 0;                
                break;
            case "future":
                status = moment().diff(date, "days") < 0;
                break;    
            default: 
                break;
        }
        return status;
    };

    return (
        <TableContainer component={Paper}>
            <Table className={
                classes.table
            }
                aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell> {
                            props.t ? props.t("Date") : "Date"
                        } </StyledTableCell>
                        <StyledTableCell> {
                            props.t ? props.t("Campaign") : "Campaign"
                        } </StyledTableCell>
                        <StyledTableCell> {
                            props.t ? props.t("View") : "View"
                        } </StyledTableCell>
                        <StyledTableCell> {
                            props.t ? props.t("Actions") : "Actions"
                        } </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody> {
                    Array.from(rowData.values()).filter((row) => timePeriod(row.date)).map((row) => (
                        <TableRow key={
                            "row-" + row.rowId
                        }>
                            <TableCell style={
                                { whiteSpace: "pre-line" }
                            }>
                                {
                                    moment(row.date).format("MMM Y, D")
                                }
                                <br />
                                <i>{
                                    moment(row.date).fromNow()
                                }</i>                                
                            </TableCell>
                            <TableCell>
                                <TableRow>
                                <TableCell className={classes.tableCell} style={ { paddingRight: "10px" } }> 
                                        <TableRow>                                  
                                            <TableCell className={classes.tableCell} style={{ paddingRight: "8px" }}>
                                                {
                                                    
                                                    < img
                                                        alt="thumbnail"
                                                        width="50px"
                                                        src={
                                                            require(`./assets/${
                                                                row.thumbnail
                                                                }`)
                                                        }
                                                        className="img-responsive"
                                                    />
                                                } 
                                            </TableCell>
                                            <TableCell className={classes.tableCell} >
                                            {row.campaignName} 
                                            <br />
                                    <i>{
                                        row.region
                                    }</i>
                                            </TableCell>
                                    </TableRow>                               
                                </TableCell>
                                </TableRow>                                
                            </TableCell>
                            <TableCell>                                
                                <TableRow style={{cursor: "pointer"}}
                                    onClick={
                                        (event) => handleOpen(event)
                                    }>
                                    <TableCell className={classes.tableCell}>
                                        <span style={
                                            {                                                 
                                                paddingRight: "8px"
                                            }
                                        }>
                                            {
                                                < img
                                                    alt="viewpricing"
                                                    width="35px"
                                                    src={
                                                        require(`./assets/Price.png`)
                                                    }
                                                    className="img-responsive"
                                                />
                                            } </span>
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        <span id={
                                            'modal' + row.rowId
                                        }>
                                        {
                                            props.t ? props.t("View Pricing") : "View Pricing"
                                        }
                                        </span>                                        
                                    </TableCell>
                                

                                    <MaterialUIModal key={
                                        'modal' + row.rowId
                                    }
                                        isOpen={
                                            isModalOpen['modal' + row.rowId]
                                        }
                                        onClose={handleClose}
                                        thumbnail={
                                            row.thumbnail
                                        }
                                        campaignName={
                                            row.campaignName
                                        }
                                        region={
                                            row.region
                                        }
                                        title={
                                            props.t ? props.t("Pricing") : "Pricing"
                                        } 
                                        />
                                        </TableRow>
                            </TableCell>
                            <TableCell>
                            <TableRow>
                                <TableCell className={classes.tableCell} style={ { paddingRight: "35px" } }> 
                                        <TableRow>                                  
                                            <TableCell className={classes.tableCell} style={{ paddingRight: "8px" }}>
                                                {
                                                    
                                                    < img
                                                        alt="Report"
                                                        width="30px"
                                                        src={
                                                            require(`./assets/file.png`)
                                                        }
                                                        className="img-responsive"
                                                    />
                                                } 
                                            </TableCell>
                                            <TableCell className={classes.tableCell} >
                                            CSV
                                            </TableCell>
                                    </TableRow>                               
                                </TableCell>
                                <TableCell className={classes.tableCell} style={ { paddingRight: "35px" } }> 
                                        <TableRow>                                  
                                            <TableCell className={classes.tableCell} style={{ paddingRight: "8px" }}>
                                                {
                                                    
                                                    < img
                                                        alt="Report"
                                                        width="30px"
                                                        src={
                                                            require(`./assets/statistics-report.png`)
                                                        }
                                                        className="img-responsive"
                                                    />
                                                } 
                                            </TableCell>
                                            <TableCell className={classes.tableCell} >                                                 
                                            {
                                               props.t ? props.t("Report") : "Report"
                                            }  
                                            </TableCell>
                                    </TableRow>                               
                                </TableCell>   
                                <TableCell className={classes.tableCell}> 
                                        <TableRow>                                  
                                            <TableCell className={classes.tableCell} style={{ paddingRight: "8px" }}>
                                                {
                                                    
                                                    < img
                                                        alt="Schedule Again"
                                                        width="30px"
                                                        src={
                                                            require(`./assets/calendar.png`)
                                                        }
                                                        className="img-responsive"
                                                    />
                                                } 
                                            </TableCell>
                                            <TableCell style={{cursor: "pointer"}} className={classes.tableCell} 
                                                onClick={
                                                    (event) => handleCalenderOpen(event)
                                                }
                                                id={'calender' + row.rowId}
                                            >                                                
                                                {
                                                   props.t ? props.t("Schedule Again") : "Schedule Again"
                                                }     
                                            </TableCell>
                                            <TableCell className={classes.tableCell}>
                                                <MaterialUIPickers 
                                                key={
                                                    'calender' + row.rowId
                                                }
                                                id={row.rowId}
                                                closeCalender={handleCalenderClose}
                                                selectedData={getSelectedDate}
                                                isOpen={
                                                    isCalenderOpen['calender' + row.rowId] ? isCalenderOpen['calender' + row.rowId] : false
                                                }
                                                />
                                            </TableCell>
                                    </TableRow>                               
                                </TableCell>
                            </TableRow>
                            </TableCell>
                        </TableRow>
                    ))
                } </TableBody>
            </Table>
        </TableContainer>
    );
}
