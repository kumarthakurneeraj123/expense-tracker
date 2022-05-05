import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import AuthContextProvider from './store/Auth-Context';
import DataProvider from './store/data-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<AuthContextProvider>
<DataProvider>
<BrowserRouter>
    <App />
</BrowserRouter>
</DataProvider>
</AuthContextProvider>
);
