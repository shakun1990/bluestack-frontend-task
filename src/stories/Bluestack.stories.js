import React from 'react';
import SimpleTabs from './SimpleTabs';
import {State, Store} from '@sambego/storybook-state';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../config/i18n';

export default {
  title: 'BlueStack'
};

const store = new Store({
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
      createdOn: 1598705179000,
      price: "Price info of Mole Slayer",
      csv: "Some CSV link for Mole Slayer",
      report: "Some report link for Mole Slayer",
      image_url:"Dashboard/Row Copy 3-Row/Thumb/Bitmap.png"
    },
    {
      name: "Mancala Mix",
      region: "JP",
      createdOn: 1598877979000,
      price: "Price info of Mancala Mix",
      csv: "Some CSV link for Mancala Mix",
      report: "Some report link for Mancala Mix",
      image_url:"Dashboard/Row Copy 4-Row/Thumb/Bitmap.png"
    },
    {
      name: "PUBG",
      region: "JP",
      createdOn: 1599050779000,
      price: "Price info of Mancala Mix",
      csv: "Some CSV link for Mancala Mix",
      report: "Some report link for Mancala Mix",
      image_url:"Dashboard/Row Copy 5-Row/Thumb/Bitmap.png"
    },
    {
      name: "Need For Speed",
      region: "JP",
      createdOn: 1599137179000,
      price: "Price info of Mancala Mix",
      csv: "Some CSV link for Mancala Mix",
      report: "Some report link for Mancala Mix",
      image_url:"Dashboard/Row Copy 6-Row/Thumb/Bitmap.png"
    }
  ]
});

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

export const CampaignStory = () => {
    return (
      <State store={store}>
        {state => (
            <I18nextProvider i18n={i18n}>
              <SimpleTabs someprop="shakun" rowsData={initializeRowData(state.data, 0)}/>
            </I18nextProvider>
        )}
      </State>
    )
}


