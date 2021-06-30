
import React, {Fragment} from "react";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Navbar from "./components/navbar/Navbar";
import CreateProduct from "./components/products/CreateProduct";
import Home from "./components/home/Home";
import ProductAdmin from "./components/products/ProductAdmin";
import ProductList from "./components/products/ProductList";
import UpdateProduct from "./components/products/UpdateProduct";
class App extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Fragment>
                <Router>
                    <Navbar/>
                    <Switch>
                        <Route exact path="/products/create" component={CreateProduct}/>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/products/admin" component={ProductAdmin}/>
                        <Route exact path="/products/list" component={ProductList}/>
                        <Route exact path="/products/:id"  component={UpdateProduct}/>
                    </Switch>
                </Router>
                {/*<div style={{marginBottom: "100px"}}></div>*/}
            </Fragment>
        );
    }
}
export default App;
