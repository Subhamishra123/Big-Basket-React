import React from 'react';
import Axios from 'axios';
class ProductList extends React.Component{
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
        Axios.get(dataUrl).then(response=>{
            this.setState({
                ...this.state,
                products:response.data
            })
        }).catch(error=>{
            this.setState({
                ...this.state,
                errorMessage:error
            })
        });
    };

    render() {
        return (
            <React.Fragment>
               <div className="container mt-3">
                <div className="row">
                    <div className="col animated zoomIn">
                        <p className="h3 text-success">Products Page</p>
                        <p className="lead px-2" >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi culpa cumque dicta dolorem doloremque eius enim ex itaque iure labore, minus molestias porro possimus repellendus soluta temporibus tenetur vel voluptates!</p>
                    </div>
                </div>
                   <div className="row">

                           {
                               this.state.products.length>0?
                                   <React.Fragment>
                                       {
                                           this.state.products.map(product=>{
                                               return(
                                                   <div className="col-md-3 animated jello delay-1s">
                                                   <div className="card">
                                                       <div className="card-header">
                                                           <img src={product.image} height="100" width="150" alt=""/>
                                                       </div>
                                                       <div className="card-body">
                                                           <ul className="list-group">
                                                               <li className="list-group-item">
                                                                   Product Name:{product.name}
                                                               </li>
                                                               <li className="list-group-item">
                                                                   Price:{product.price}
                                                               </li>
                                                               <li className="list-group-item">
                                                                   Qty:{product.qty}
                                                               </li>
                                                               <li className="list-group-item">
                                                                   Product Info:{product.info}
                                                               </li>
                                                           </ul>
                                                       </div>
                                                   </div>
                                                   </div>
                                               )
                                           })
                                       }
                                   </React.Fragment>:
                                   <div className="text-center">
                                       <p className="h4 text-danger">----------No Products To Display----------</p>
                                   </div>
                           }
                       </div>
                   </div>

            </React.Fragment>
        );
    }

}
export default ProductList;
