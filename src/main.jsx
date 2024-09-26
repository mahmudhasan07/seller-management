import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom"
import Registration from './Components/Auth/Registration.jsx'
import LogIn from './Components/Auth/LogIn.jsx'
import ContextAPI from './Components/ContextAPI/ContextAPI.jsx'
import Admin from './Components/Panel/Admin/Admin.jsx'
import OrderPdf from './Components/Panel/Seller/OrderPdf.jsx'
import Home from './Components/Home/Home.jsx'
import Form from './Components/Panel/Seller/Form.jsx'
import PrivateSeller from './Components/PrivateRoute/PrivateSeller.jsx'
import PrivateAdmin from './Components/PrivateRoute/PrivateAdmin.jsx'
import SellerApprove from './Components/Panel/Admin/SellerApprove.jsx'
import Seller from './Components/Panel/Seller/Seller.jsx'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute.jsx'
import SellReport from './Components/Panel/Admin/SellReport.jsx'
import TotalSell from './Components/Panel/Seller/TotalSell.jsx'



const queryClient = new QueryClient()

const routes = createBrowserRouter(
  [
    {
      path: '/',
      element: <PrivateRoute><App /></PrivateRoute>,
    },
    {
      path: '/seller',
      element: <Seller></Seller>,
      children: [
        {
          path: '/seller',
          element: <PrivateSeller><Form></Form></PrivateSeller>
        },
        {
          path: '/seller/sells',
          element : <TotalSell></TotalSell>
        }
      ]
    },
    {
      path: '/admin',
      element: <Admin></Admin>,
      children: [
        {
          path: '/admin',
          element: <PrivateAdmin><SellerApprove></SellerApprove></PrivateAdmin>
        },
        {
          path: '/admin/sellreport',
          element : <SellReport></SellReport>
        }
      ]
    },
    {
      path: '/registration',
      element: <Registration></Registration>
    },
    {
      path: '/login',
      element: <LogIn></LogIn>
    },
    {
      path: '/orderpdf/:id',
      element: <PrivateSeller><OrderPdf></OrderPdf></PrivateSeller>
    },
    {
      path : '/selldetails/:id',
      element : <PrivateAdmin><OrderPdf></OrderPdf></PrivateAdmin>
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextAPI>
        <RouterProvider router={routes}>
          <App></App>
        </RouterProvider>
      </ContextAPI>
    </QueryClientProvider>
  </StrictMode>,
)
