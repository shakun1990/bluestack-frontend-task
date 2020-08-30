import React, {useState} from "react";
import {    
    makeStyles,
    TableRow,    
    TableContainer,
    TableCell,    
    Modal,   
    Typography
} from "@material-ui/core";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return {top: `${top}%`, left: `${left}%`, transform: `translate(-${top}%, -${left}%)`};
}

const useStyles = makeStyles((theme) => ({
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
    }
}));


export const MaterialUIModal = (props) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);    

    return (
        <div>
            <Modal open={
                    props.isOpen
                }
                onClose={
                    props.onClose
                }
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                <div style={modalStyle}
                    className={
                        classes.paper
                }>
                    <span style={
                        {
                            float: "left",
                            paddingRight: "8px"
                        }
                    }>
                        {
                        < img
                        alt = "thumbnail"
                        src = {
                            require(`./assets/${
                                props.thumbnail
                            }`)
                        }
                        className = "img-responsive"
                        />
                    } </span>
                    <span> 
                        <Typography gutterBottom variant="button">{props.campaignName}</Typography>
                        <br/> 
                        <Typography gutterBottom variant="caption">{props.region} </Typography>
                    </span>
                    <br/>
                    <br/>
                    <br/>
                    <h2 id="simple-modal-title">
                    <b>{props.title}</b>
                    </h2>
                    <TableContainer>
                        <TableRow>
                            <TableCell className={
                                classes.popTableCell
                            }>
                                1 Week - 1 Month
                            </TableCell>
                            <TableCell className={
                                classes.popPriceTableCell
                            }>$100</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={
                                classes.popTableCell
                            }>6 Month</TableCell>
                            <TableCell className={
                                classes.popPriceTableCell
                            }>$500</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={
                                classes.popTableCell
                            }>1 Year</TableCell>
                            <TableCell className={
                                classes.popPriceTableCell
                            }>$900</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}
                                align="center"
                                className={
                                    classes.popButtonWraper
                                }
                                style={
                                    {width: "100%"}
                            }>
                                <button className={
                                        classes.popButton
                                    }
                                    type="button"
                                    onClick={
                                        props.onClose
                                }>
                                    Close
                                </button>
                            </TableCell>
                        </TableRow>
                    </TableContainer>
                </div>
            </Modal>
        </div>
    );


}
