import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { AccessibilityProvider } from "./context/accessibility.jsx"
import { LoginProvider } from "./context/login.jsx"
import { FormProvider } from './context/form.jsx';
import { NavigationProvider } from './context/navigation';
import configureStore from "./store";
import { CalendarProvider } from './context/calendar';

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <FormProvider>
      <AccessibilityProvider>
        <NavigationProvider>
          <LoginProvider>
            <CalendarProvider>
              <Provider store={store}>
                <App />
              </Provider>
            </CalendarProvider>
          </LoginProvider>
        </NavigationProvider>
      </AccessibilityProvider>
    </FormProvider>
  </React.StrictMode>
);
