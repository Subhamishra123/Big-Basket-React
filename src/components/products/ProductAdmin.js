import React from 'react';
import {Link} from "react-router-dom";
import Axios from 'axios';
class ProductAdmin extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            products:[],
            errorMessage:''
        }
    }
    componentDidMount() {
        this.getAllProducts();
    }
    getAllProducts=()=>{
        let dataUrl='http://127.0.0.1:5000/api/products';
        Axios.get(dataUrl).then((response)=>{
            this.setState({
                ...this.state,
                products:response.data
            })
        }).catch(error=>{
            this.setState({
                ...this.state,
                error:error
            })
        });
    };
    deleteProduct=(prodId)=>{
        let dataUrl=`http://127.0.0.1:5000/api/product/${prodId}`;
        Axios.delete(dataUrl).then((response)=>{
            this.getAllProducts();
        }).catch(error=>{
            console.error(error);
        });
    };

    render() {
        return (
            <React.Fragment>
               <div className="container mt-3">
                   <div className="row">
                       <div className="col animated zoomIn">
                           <p className="h3 text-success">Product Details</p>
                           <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A consectetur cum error, facilis incidunt laudantium repellendus rerum unde ut. Cumque fugit id, impedit minus nobis non odio placeat quam vero?
                           </p>
                            <Link to="/products/create" className="btn btn-success btn-sm">Create Product</Link>
                       </div>
                   </div>
                   <div className="row mt-3">
                       <div className="col animated jello delay-1s">
                           <table className="table table-hover table-striped table-success text-center">
                               <thead className="bg-dark text-white">
                               <tr>
                                   <th>SNO</th>
                                   <th>Product</th>
                                   <th>Name</th>
                                   <th>Price</th>
                                   <th>Qty</th>
                                   <th>Actions</th>
                               </tr>
                               </thead>
                               <tbody>
                               {
                                   this.state.products.length>0?
                                       <React.Fragment>
                                           {
                                               this.state.products.map(product=>{
                                                   return(
                                                       <tr key={product._id}>
                                                           <td>{product._id}</td>
                                                           <td>
                                                               <img src={product.image} height="20" width="20" alt=""/>
                                                           </td>
                                                           <td>{product.name}</td>
                                                           <td>{product.price}</td>
                                                           <td>{product.qty}</td>

                                                           <td>
                                                               <Link to={`/products/${product._id}`} className="btn btn-secondary btn-sm">Update</Link>
                                                               <button onClick={this.deleteProduct.bind(this,product._id)} className="btn btn-danger btn-sm">Delete</button>
                                                           </td>
                                                       </tr>
                                                   )
                                               })
                                           }
                                       </React.Fragment>:
                                       <React.Fragment>
                                           <tr>
                                               <td colSpan="6" className="text-danger">------------No Products To Display-----------------</td>
                                           </tr>
                                       </React.Fragment>
                               }
                               </tbody>
                           </table>
                       </div>
                   </div>
               </div>
            </React.Fragment>
        );
    }

}
export default ProductAdmin;
