import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SimpleTable from './SimpleTable';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box paddingTop={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1, 
    backgroundColor: theme.palette.background.paper,
  },
  indicator: {
    backgroundColor: '#83A515',
  },
  selectedTab : {
    color: '#83A515',
    fontWeight: 'bold',
  },
  label: {    
    fontWeight: 'inherit',
    fontSize: '16px',
    textTransform: 'none'
  }
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>      
      <Tabs classes={{ indicator: classes.indicator }}  value={value} onChange={handleChange} aria-label="simple tabs example">
        <Tab classes={{ selected: classes.selectedTab }} label={<span className={classes.label}>Upcoming Campaigns</span>} {...a11yProps(0)} />
        <Tab classes={{ selected: classes.selectedTab }} label={<span className={classes.label}>Live Campaigns</span>} {...a11yProps(1)} />
        <Tab classes={{ selected: classes.selectedTab }} label={<span className={classes.label}>Past Campaigns</span>} {...a11yProps(2)} />
      </Tabs>      
      <TabPanel value={value} index={0}>        
        <SimpleTable rowsData={props.rowsData}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SimpleTable rowsData={props.rowsData}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SimpleTable rowsData={props.rowsData}/>
      </TabPanel>
    </div>
  );
}
