import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import { createMuiTheme } from './theme/theme'
import HomeScreen from "./screens/homeScreen/HomeScreen"
import SignInScreen from './screens/SignInScreen/SignInScreen'
import ActivateAccountScreen from './screens/activateAccountScreen/ActivateAccountScreen'
import ChefDashBoardScreen from './screens/chefDashboardScreen/ChefDashBoardScreen'
import FarmProduceScreen from './screens/farmProduceScreen/FarmProduceScreen'
import AboutScreen from './screens/aboutScreen/AboutScreen'
import VendorDashboardScreen from './screens/vendorDashboardScreen/VendorDashboardScreen'
import CustomerDashboardScreen from './screens/customerDashBoardScreen/CustomerDashboardScreen'
import CheckoutScreen from './screens/checkoutScreen/CheckoutScreen'
import FishProductsScreen from './screens/fishProductsScreen/FishProductsScreen'
import CookedProductsScreen from './screens/cookedProductsScreen/CookedProductsScreen'
import PoultryProductsScreen from './screens/poultryProductsScreen/PoultryProductsScreen'
import ChefsScreen from './screens/chefsScreen/ChefsScreen'
import Faqs from './components/homeScreen/Faqs';
// import { useAuth } from './utils/AuthContext';
import AllProductScreen from './screens/showAllProducts/ShowAllProductsScreen'
import ProductDetailScreen from './screens/productDetailScreen/ProductDetailScreen';

import BookNowForm from './components/chefs/BookNowForm';
import ChefDetailScreen from './screens/chefsScreen/ChefDetailScreen'
import ContactScreen from './screens/ContactScreen/ContactScreen';
import Cart from './components/homeScreen/ShoppingCart';
import WishList from './screens/vendorDashboardScreen/WishList';
import Checkout from './components/Order/Checkout'
// import CheckoutPage from './components/CheckoutPage/CheckoutPage';

// Admin routes
import AdminDashboardScreen from './screens/adminScreens/AdminDashboardScreen'
import ChefAdminScreen from './screens/adminScreens/ChefAdminScreen'
import VendorAdminScreen from './screens/adminScreens/VendorAdminScreen'
import AdminCustomerScreen from './screens/adminScreens/AdminCustomerScreen'
import TransactionsScreen from './screens/adminScreens/TransactionsScreen'
import AdminProfileScreen from './screens/adminScreens/AdminProfileScreen'
// End of admin routes

// utills section
import Root from './utils/Root'
import AdminRoot from './utils/AdminRoot'
import { RequireAuth, useIsAuthenticated, useAuthUser } from 'react-auth-kit'
import AdminProducts from './screens/adminScreens/AdminProducts'

const AppRouter = () => {
  const custom_theme = createMuiTheme()
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const role = authUser()?.role || '';
  console.log('role is', role)
  // const cat = 'admin'

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={
        isAuthenticated() && role === 'admin' ? <AdminRoot /> : <Root />}>
        <Route index element={<HomeScreen />} />
        <Route path='/login' element={<SignInScreen />} />
        <Route path='/activate' element={<ActivateAccountScreen />} />
        <Route path="/chef-dashboard" element={
          <RequireAuth loginPath={'/'}>
            <ChefDashBoardScreen />
          </RequireAuth>
        } />
        <Route path='/chefs' element={<ChefsScreen />} />
        <Route path='/chefs/:id' element={<ChefDetailScreen />} />
        <Route path='/vendor-dashboard' element={
          <RequireAuth loginPath={'/'}>
            <VendorDashboardScreen />
          </RequireAuth>
        } />
        <Route path='/customer-dashboard' element={
          <RequireAuth loginPath={'/'}>
            <CustomerDashboardScreen />
          </RequireAuth>
        } />
        <Route path='/farm-produce' element={<FarmProduceScreen />} />
        <Route path='/fish-products' element={<FishProductsScreen />} />
        <Route path='/poultry-products' element={<PoultryProductsScreen />} />
        <Route path='/cooked-food' element={<CookedProductsScreen />} />

        <Route path='/products' element={<AllProductScreen />} />
        <Route path='/products/:id' element={<ProductDetailScreen />} />
        <Route path="/book-now" element={<BookNowForm open={undefined} onClose={undefined} />} />

        <Route path='/wishlist' element={<WishList />}></Route>
        <Route path='/shopping-cart' element={<Cart />}></Route>
        <Route path='faqs' element={<Faqs />}></Route>
        <Route path='checkout-page' element={<Checkout />}></Route>

        {/* <Route path='/checkout' element={<CheckoutScreen />} /> */}
        <Route path='/about' element={<AboutScreen />} />
        <Route path='/contact' element={<ContactScreen />} />

        {/* Admin routes */}
        <Route path='/admin' element={
          <RequireAuth loginPath={'/'}>
            <AdminDashboardScreen />
          </RequireAuth>
        } />
        <Route path='/admin/chefs' element={
          <RequireAuth loginPath={'/'}>
            <ChefAdminScreen />
          </RequireAuth>
        } />
        <Route path='/admin/vendors' element={
          <RequireAuth loginPath={'/'}>
            <VendorAdminScreen />
          </RequireAuth>
        } />
        <Route path='/admin/users' element={
          <RequireAuth loginPath={'/'}>
            <AdminCustomerScreen />
          </RequireAuth>
        } />
        <Route path='/admin/products' element={
          <RequireAuth loginPath={'/'}>
            <AdminProducts />
          </RequireAuth>
        } />
        <Route path='/admin/transactions' element={
          <RequireAuth loginPath={'/'}>
            <TransactionsScreen />
          </RequireAuth>
        } />
        <Route path='/admin/profile' element={
          <RequireAuth loginPath={'/'}>
            <AdminProfileScreen />
          </RequireAuth>
        } />


      </Route>
    )
  )
  return (
    <ThemeProvider theme={custom_theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}



export default AppRouter