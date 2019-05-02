import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'normalize.css';
import { App } from './components/App';

export const STORAGE_KEY = 'adverts';
export const PHONE_REGEXP = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm;

ReactDOM.render(<App />, document.getElementById('container'));