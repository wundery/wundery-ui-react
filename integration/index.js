import React from 'react';
import ReactDOM from 'react-dom';
import { Integration } from './components';

const mountPoint = document.body.appendChild(document.createElement('div'));
ReactDOM.render(<Integration />, mountPoint);
