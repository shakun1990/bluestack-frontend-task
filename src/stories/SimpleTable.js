import React, {useState, useEffect} from 'react';
import { withStyles, makeStyles, TableRow, TableHead, TableContainer, TableCell, TableBody, Modal, Table, Paper } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#F1F1F4',
    color: '#556789',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const datePickerProperties = {
  views: ['date'],
  orientation : 'landscape',
  variant: 'inline',
  isToolbarEnabled : false,
  inputProps : {disableunderline : "true"},
  format: 'M/D/YYYY',
  isAutoOkEnabled : true
}

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function SimpleTable(props) {
  const classes = useStyles();
  const [rowData, setRowData] = useState(props.rowsData);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [info,setInfo] = useState({ fieldname:'', fieldvalue:'' });
  useEffect(() => {
    setRowData(props.rowsData);
  }, [props.rowsData])  

  const handleOpen = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleDateChange = (dateName, dateValue) => {   
    setInfo({...info, fieldname: dateName, fieldvalue: dateValue })
  }
  

  const body = (campaignName, region, thumbnail) => {
    return (
    <div style={modalStyle} className={classes.paper}>
      <span style={{float: 'left', paddingRight : '8px'}}>{<img src={require(`./assets/${thumbnail}`)}  className="img-responsive" />}</span>
      <span>{campaignName} <br/> {region}</span>
      <br/>
      <br/>
      <br/>
      <br/>
      <h2 id="simple-modal-title"><b>Pricing</b></h2>
      <span id="simple-modal-description">
         1 Week - 1 Month - $100<br/>
         6 Month - $500<br/>
         1 Year  - $900<br/>
      </span>
      <button type="button" onClick={handleClose}>
        Close
      </button>
    </div>
    );
  };

  const timeperiod = (date) => {
    let status;
    switch (props.timeperiod) {
      case "past":
        status = moment().diff(date, 'days') > 0
      break;
      case "present":
        status = moment().diff(date, 'days') === 0
      break;
      default:
        status = moment().diff(date, 'days') < 0
      break;
    }
    return status;    
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Campaign</StyledTableCell>
            <StyledTableCell>View</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from(rowData.values())
              .filter((row) => timeperiod(row.date))
              .map((row) =>               
              <TableRow key={'row-'+ row.rowId}>
                  <StyledTableCell style={{whiteSpace: 'pre-line'}}>{moment(row.date).format('MMM Y, D')}<br/><i>{moment(row.date).fromNow()}</i></StyledTableCell>
                  <StyledTableCell>
                    <span style={{float: 'left', paddingRight : '8px'}}>{<img width="50px" src={require(`./assets/${row.thumbnail}`)}  className="img-responsive" />}</span>
                    <span>{row.campaignName} <br/> <i>{row.region}</i></span>
                  </StyledTableCell>
                  <StyledTableCell> 
                    <span style={{paddingRight : '30px', cursor : 'pointer'}} onClick={handleOpen.bind(this)}>
                        <span style={{ float: 'left', paddingRight : '8px'}}>
                          {<img width="35px" src={require(`./assets/Price.png`)} className="img-responsive" />}
                        </span>
                        View Pricing
                    </span> 
                    <Modal
                        id={'price-modal-'+ row.rowId}
                        open={isModalOpen}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                      >
                    {body(row.campaignName, row.region, row.thumbnail)}
                  </Modal>
                  </StyledTableCell>
                  <StyledTableCell>
                  <span style={{paddingRight : '35px'}}>
                    <span style={{float: 'left', paddingRight : '8px'}}>
                      {<img width="30px" src={require(`./assets/file.png`)} className="img-responsive" />}
                    </span>
                    CSV 
                  </span> 

                  <span style={{paddingRight : '35px'}}>
                    <span style={{paddingRight : '8px'}}>
                      {<img width="30px" src={require(`./assets/statistics-report.png`)} className="img-responsive" />}
                    </span>
                    Report 
                  </span> 

                  <span style={{paddingRight : '35px', cursor : 'pointer'}} onClick={() => setIsOpen(!isOpen)} >
                    <span style={{paddingRight : '8px'}}>
                      {<img width="30px" src={require(`./assets/calendar.png`)} className="img-responsive" />}
                    </span>
                    Schedule Again 
                  </span>               
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker style={{display : 'none'}} id={'date-picker-'+ row.rowId} inputProps={datePickerProperties.inputProps} disableunderline="true" value={info['date-picker-'+ row.rowId]} onChange={(value) => handleDateChange('date-picker-'+ row.rowId , value)} open={isOpen} onClose={()=> setIsOpen(false)} onOpen={()=> setIsOpen(true)}/>
                  </MuiPickersUtilsProvider>              
                  </StyledTableCell>
            </TableRow>             
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
