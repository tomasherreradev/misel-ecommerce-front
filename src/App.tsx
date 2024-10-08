import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/layout/Layout';
import LayoutSimple from './components/layout/LayoutSimple';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ConfirmAccount from './pages/ConfirmAccount';

import ProtectedRoute from './hooks/useProtectedRoutes';
import Dashboard from './pages/Admin/Dashboard';
import Products from './pages/Admin/Products';
import AddProducts from './pages/Admin/ProductsPages/AddProducts';
import EditProduct from './pages/Admin/ProductsPages/EditProducts';

function App() {
  return (

    <AuthProvider>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/login" element={<LayoutSimple><Login /></LayoutSimple>} />
          <Route path="/signup" element={<LayoutSimple><Register /></LayoutSimple>} />
          <Route path="/confirm/:token" element={<LayoutSimple><ConfirmAccount /></LayoutSimple>} />

          {/* admin routes */}
          <Route path="/admin" element={<ProtectedRoute><LayoutSimple><Dashboard /></LayoutSimple></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute><LayoutSimple><Products /></LayoutSimple></ProtectedRoute>} />
          <Route path="/admin/products/add" element={<ProtectedRoute><LayoutSimple><AddProducts /></LayoutSimple></ProtectedRoute>} />
          <Route path="/admin/products/edit/:id" element={<ProtectedRoute><LayoutSimple><EditProduct /></LayoutSimple></ProtectedRoute>} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
