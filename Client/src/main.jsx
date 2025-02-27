import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

import Hero from './pages/Hero/index.jsx';
import Blog from './pages/Blog'
import Contact from './pages/Contact/index.jsx'
import LetMeIn from './components/LetMeIn/index.jsx'
import BlogInput from './components/BlogInput/index.jsx'
import AdminPost from './components/AdminPost/index.jsx'
import EditPost from './components/EditPost/index.jsx'
import Dashboard from './pages/AdminDashboard/index.jsx'
import ProtectedRoute from './components/ProtectedRoute/index.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>woooops</h1>,
    children : [
      {
        index: true,
        element: <Hero />
      },
      {
        path: '/blog',
        element: <Blog />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/letmein',
        element: <LetMeIn/>
      },
      {
        path: '/blog-input',
        element: (
          <ProtectedRoute>
            <BlogInput />
          </ProtectedRoute>
      ),
      },
      {
        path: '/admin-post',
        element: (
          <ProtectedRoute>
            <AdminPost />
          </ProtectedRoute>
        ),
      },
      {
        path: '/editpost',
        element: (
          <ProtectedRoute>
            <EditPost />
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
     
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
 <RouterProvider router={router}/>
)
