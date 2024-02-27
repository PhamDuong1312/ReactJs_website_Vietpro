import React from "react";
import store from "./reduxSetup/store.js"
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./shared/components/layout/Header";
import Slider from "./shared/components/layout/Slider";
import Home from "./pages/Home";
import Sidebar from "./shared/components/layout/Sidebar";
import Footer from "./shared/components/layout/Footer";
import Menu from "./shared/components/layout/Menu";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import ProductDetails from "./pages/ProductDetails";
import Success from "./pages/Success";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import { getCategories } from "./services/Api";
const App = () => {
  const [categorys, setCategorys] = React.useState([]);
  React.useEffect(() => {
    getCategories({}).then(({ data }) => setCategorys(data.data.docs));
  }, [])
  return (

    <Provider store={store}>
      <BrowserRouter>
        <Header />

        {/*	Body	*/}
        <div id="body">
          <div className="container">
            <Menu item={categorys} />
            <div className="row">
              <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                {/*	Slider	*/}
                <Slider />
                {/*	End Slider	*/}
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/category/:uid" element={<Category />} />
                  <Route path="/productdetails-:uid" element={<ProductDetails />} />
                  <Route path="/cart/buy" element={<Success />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>

              </div>
              <Sidebar />
            </div>
          </div>
        </div>
        {/*	End Body	*/}
        <Footer />
        {/*	End Footer	*/}
      </BrowserRouter>
    </Provider>
  )
}

export default App;
