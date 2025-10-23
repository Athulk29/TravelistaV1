import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/slices/user-slice';
import FlightList from './pages/Flight-data';
import HotelList from './pages/Hotel-Data';

function App() {


  const { user } = useSelector((state) => state.user)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkAuth())
  }, [])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: user?.id ? <Home /> : <Navigate to={'/signin'} /> },
        { path: '/flight', element: user?.id ? <FlightList /> : <Navigate to={'/signin'} /> },
        { path: '/hotel', element: user?.id ? <HotelList /> : <Navigate to={'/signin'} /> }
      ]
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/signin',
      element: user?._id ? <Navigate to={'/'} /> : <Login />
    }
  ])

  return (

    <>
      <RouterProvider router={router} />
      <Toaster />
    </>

  );
}

export default App;
