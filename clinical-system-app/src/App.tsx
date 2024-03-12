import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { Login } from './pages/login/Login';
import { Layout } from './layout/Layout';
import { Home } from './pages/home/Home';
import { Services } from './pages/services/Services';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Login/>
  },
  {
    element: <Layout/>,
    children: [
      {
        path:'/home',
        element: <Home/>
      },
      {
        path:'/services',
        element: <Services/>
      },
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
