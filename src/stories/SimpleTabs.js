import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Tabs, Tab, Typography, Box, Button, ButtonGroup, AppBar, Toolbar  } from '@material-ui/core';
import { useTranslation, withTranslation } from 'react-i18next';
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
  },
  languageToolbar : {
    float : 'right'
  },
  heading : {
    fontWeight: 'bold',
    color: '#2B416C',
    paddingTop: '20px',
    paddingBottom: '10px',
  },
  header : {
    backgroundColor: '#1F2640',
  },
  logo : {
    paddingTop: '10px',
    paddingBottom: '10px',
    width : '15%'
  },
  logoWrapper : {
    paddingLeft : '3px'
  }
}));

function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { t, i18n } = useTranslation();

  const changeLanguage = lng => {
     i18n.changeLanguage(lng);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);   
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar variant="dense" className={classes.logoWrapper}>          
           <img className={classes.logo} src="https://cdn-www.bluestacks.com/bs-images/bs-logo-new.png"/> 
          <Typography variant="h6" color="inherit">            
          </Typography>
        </Toolbar>
      </AppBar> 
      <Typography variant="h4" gutterBottom className={classes.heading}>        
        {t ? t('Manage Campaigns') : 'Manage Campaigns'}
      </Typography>
      <ButtonGroup className={classes.languageToolbar} color="secondary" aria-label="outlined secondary button group">
        <Button onClick={() => changeLanguage('en')}>English</Button>
        <Button onClick={() => changeLanguage('de')}>German</Button>
      </ButtonGroup>     
      <Tabs id="bluestack-simpleTabs" classes={{ indicator: classes.indicator }}  value={value} onChange={handleChange} aria-label="simple tabs example">
        <Tab classes={{ selected: classes.selectedTab }} label={<span className={classes.label}>{t ? t('Upcoming Campaigns') : 'Upcoming Campaigns'}</span>} {...a11yProps(0)} />
        <Tab classes={{ selected: classes.selectedTab }} label={<span className={classes.label}>{t ? t('Live Campaigns') : 'Live Campaigns'}</span>} {...a11yProps(1)} />
        <Tab classes={{ selected: classes.selectedTab }} label={<span className={classes.label}>{t ? t('Past Campaigns') : 'Past Campaigns'}</span>} {...a11yProps(2)} />
      </Tabs>      
      <TabPanel value={value} index={0}>        
        <SimpleTable timeperiod="past" t={t} rowsData={props.rowsData}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SimpleTable timeperiod="present" t={t} rowsData={props.rowsData}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SimpleTable timeperiod="future" t={t} rowsData={props.rowsData}/>
      </TabPanel>
    </div>
  );
}

export default withTranslation()(SimpleTabs);
