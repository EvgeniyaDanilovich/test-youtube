import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Global } from './components/globalStyles';
import ThemeAppProvider from './components/App/providers/ThemeProvider/ThemeProvider';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        {/* <ThemeAppProvider> */}
            <ErrorBoundary>
                {/* <Global /> */}
                <App />
            </ErrorBoundary>
        {/* </ThemeAppProvider> */}
    </Provider>
);