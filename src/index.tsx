import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from '@components/App/App';
import { store } from '@/store';
import ErrorBoundary from '@components/ErrorBoundary';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<Provider store={store}>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</Provider>
);
