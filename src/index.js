import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.common.css';
import './index.css';
import './assets/contents.css';
import './assets/modal.css';
import 'realgrid/dist/realgrid-style.css'
import { BrowserRouter} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
import CatchedErrorBoundary from './common/components/error/components/CatchedErrorBoundary';
import { RecoilRoot } from 'recoil';


// export const queryClient = new QueryClient();
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
            refetchOnWindowFocus: false,
            suspense: false,
        },
    },
});

const root = ReactDOM.createRoot(
  document.getElementById('root'), {devtool:false}
);
root.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <BrowserRouter >
        <React.StrictMode>
          <CatchedErrorBoundary>
            <App />
          </CatchedErrorBoundary>
        </React.StrictMode>
      </BrowserRouter >
    </RecoilRoot>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
