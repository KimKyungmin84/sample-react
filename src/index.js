import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
import CatchedErrorBoundary from "./common/components/error/components/CatchedErrorBoundary";
import { RecoilRoot } from 'recoil';


export const queryClient = new QueryClient();

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
