import './index.css';

import App from './App.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './EchoSetup.ts';
import {Provider} from 'react-redux';
import {store} from '@/actions/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>
);
