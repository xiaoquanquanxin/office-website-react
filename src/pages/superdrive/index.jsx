import {isValidatedPathName} from '@utils/common';
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AppRedux from '@store/reducers';
import App from './App';
import '@css/reset.less';

let store = createStore(AppRedux);
render(
    isValidatedPathName ?
        <Provider store={store}>
            <App/>
        </Provider>
        : '',
    document.getElementById('root'));
