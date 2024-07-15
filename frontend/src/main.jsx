import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// react router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routerInfo from '@router/index';
const router = createBrowserRouter(routerInfo);

// react-queray
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
);
