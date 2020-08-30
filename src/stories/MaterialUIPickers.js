import 'date-fns';
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import MomentUtils from "@date-io/moment";
import {MuiPickersUtilsProvider, DateTimePicker} from '@material-ui/pickers';

const datePickerProperties = {
    views: ["date"],
    orientation: "landscape",
    variant: "inline",
    isToolbarEnabled: false,
    inputProps: {
        disableunderline: "true"
    },
    format: "M/D/YYYY",
    isAutoOkEnabled: true
};

export const MaterialUIPickers = (props) => {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    
    const handleDateChange = (calenderId, date) => {        
        setSelectedDate(date);
        props.selectedData(calenderId, date);
    };

    return (         
            <Grid container justify="space-around">
               <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DateTimePicker 
                     style={{ display: "none" }}                     
                     id={"calender" + props.id}
                      inputProps={datePickerProperties.inputProps}
                      disableunderline="true"
                      value={selectedDate}
                      onChange={(value) =>
                        handleDateChange(props.id, value)
                      }
                      open={props.isOpen}
                      onClose={() => props.closeCalender("calender" + props.id)}
                      isAutoOkEnabled={datePickerProperties.isAutoOkEnabled}
                    />
                  </MuiPickersUtilsProvider>
            </Grid>
    );
}
