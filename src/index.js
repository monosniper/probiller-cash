import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from "./store";

import "./assets/css/blk-design-system-react.css";
import "./assets/css/nucleo-icons.css";
import "./assets/demo/demo.css";

const store = new Store();

export const Context = createContext({
    store
})

ReactDOM.render(
    <Context.Provider value={{store}}>
        <App />
    </Context.Provider>,
    document.getElementById('root')
);
