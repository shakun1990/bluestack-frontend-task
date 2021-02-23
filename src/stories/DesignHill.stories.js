import React from 'react';
import {State, Store} from '@sambego/storybook-state';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../config/i18n';
import Ashtapada from './Ashtapada';

export default {
  title: 'DesignHill'
};


export const AshtapadaStory = () => {
  let enteredN = prompt('Please enter value of N');
  let enteredY = prompt('Please enter value of Y');
  let enteredZ = prompt('Please enter value of Z');

  if(enteredN > 2000 || enteredN < 0) {
    enteredN = prompt('Please re-enter value of N');
  }
  if(enteredY > 4000000 || enteredY < 0) {
    enteredY = prompt('Please re-enter value of Y');
  }
  if(enteredZ > 5 || enteredZ < 0) {
    enteredZ = prompt('Please re-enter value of Z');
  }
  const store = new Store({
    n: enteredN,
    y: enteredY,
    z: enteredZ
  });

    return (
      <State store={store}>
        {state => (
            <I18nextProvider i18n={i18n}>
               <Ashtapada n={state.n} y={state.y} z={state.z}/>
            </I18nextProvider>
        )}
      </State>
    )
}


