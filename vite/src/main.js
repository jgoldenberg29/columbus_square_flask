import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux'
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { AccessibilityProvider } from "./context/accessibility.jsx"
import { LoginProvider } from "./context/login.jsx"
import { FormProvider } from './context/form.jsx';
import { NavigationProvider } from './context/navigation';
import configureStore from "./store";
import { CalendarProvider } from './context/calendar';

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
