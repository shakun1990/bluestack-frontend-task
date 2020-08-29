import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme';
import { Tabs, Tab }  from '@material-ui/core';
import SimpleTabs from '../src/stories/SimpleTabs';

configure({ adapter : new Adapter() })

const mockData = {
  data : [
    {
      name: "Test Whatsapp",
      region: "US",
      createdOn: 1559807714999,
      price: "Price info of Test Whatsapp",
      csv: "Some CSV link for Whatsapp",
      report: "Some report link for Whatsapp",
      image_url:"Dashboard/Row/Thumb/Bitmap.png"
    },
    {
      name: "Super Jewels Quest",
      region: "CA, FR",
      createdOn: 1559806715124,
      price: "Price info of Super Jewels Quest",
      csv: "Some CSV link for Super Jewels Quest",
      report: "Some report link for Super Jewels Ques",
      image_url:"Dashboard/Row Copy 2-Row/Thumb/Bitmap.png"
    },
    {
      name: "Mole Slayer",
      region: "FR",
      createdOn: 1559806711124,
      price: "Price info of Mole Slayer",
      csv: "Some CSV link for Mole Slayer",
      report: "Some report link for Mole Slayer",
      image_url:"Dashboard/Row Copy 3-Row/Thumb/Bitmap.png"
    },
    {
      name: "Mancala Mix",
      region: "JP",
      createdOn: 1559806680124,
      price: "Price info of Mancala Mix",
      csv: "Some CSV link for Mancala Mix",
      report: "Some report link for Mancala Mix",
      image_url:"Dashboard/Row Copy 4-Row/Thumb/Bitmap.png"
    }
  ]
};


const initializeRowData = (rowData, index) => {
  const rowById = new Map();
  rowData.forEach((data) => {
      const row = {};
      row.rowId = index++;
      row.date = data.createdOn;
      row.campaignName = data.name;
      row.view = data.price;
      row.csv = data.csv;
      row.report = data.report;
      row.thumbnail = data.image_url;
      row.region = data.region;
      rowById.set(row.rowId, row);
  });
  return rowById;
}

jest.mock('react-i18next', () => ({
  //useTranslation: () => ({t: key => key}),  
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  }
}));


describe("Localization", () => {  
  it('should show Upcoming Campaigns as first tab when language is english', () => {
    let wrapper;
    wrapper = mount(<SimpleTabs rowsData={initializeRowData(mockData.data, 0)}></SimpleTabs>);    
    expect(wrapper.find(Tabs).find(Tab).first().text()).toBe('Upcoming Campaigns');
    wrapper.unmount();
  })

});


describe("Campaign Date change", () => {
    

  
});