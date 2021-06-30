import React from 'react';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';
class CreateProduct extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            product:{
                name:'',
                image:'',
                price:null,
                qty:null,
                info:''
            },
            isSubmitted:false
        }
    }
    updateInput=(event)=>{
      this.setState({
          product:{
              ...this.state.product,
              [event.target.name]:event.target.value
          }
      })
    };
    updateImage=async (event)=>{
      let imageFile=event.target.files[0];
      let base64Image=await this.convertBase64String(imageFile);
      this.setState({
          product:{
              ...this.state.product,
              image:base64Image
          }
      })
    };
    convertBase64String=(imageFile)=>{
      return new Promise((resolve, reject) => {
          let fileReader=new FileReader();
          fileReader.readAsDataURL(imageFile);
          fileReader.addEventListener('load',()=>{
              if(fileReader.result){
                  resolve(fileReader.result);
              }
              else{
                  reject('Error Occured');
              }
          })
      });
    };
    createProduct=(event)=>{
        event.preventDefault();
        let dataUrl='http://127.0.0.1:5000/api/product';
        Axios.post(dataUrl,this.state.product).then((response)=>{
            this.setState({
                ...this.state,
                isSubmitted:true
            })
        }).catch((error)=>{
            console.error(error);
        });
    };

    render() {
        return (
            <React.Fragment>
                {
                    this.state.isSubmitted?<Redirect to="/products/admin"/>:null
                }

               <div className="container mt-3">
                   <div className="row">
                       <div className="col animated zoomIn">
                           <p className="h3 text-success">Create New Product</p>
                           <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aspernatur dignissimos enim, eos eum eveniet fuga inventore iusto magnam officiis placeat porro quae quasi quidem quisquam recusandae reprehenderit unde veritatis?</p>
                       </div>
                   </div>
                   <div className="row">
                       <div className="col-md-4">
                           <div className="card animated jello delay-1s">
                               <div className="card-header bg-success text-white">
                                   <p className="lead">New Product</p>
                               </div>
                               <div className="card-body rgba-green-light">
                                   <form onSubmit={this.createProduct}>
                                       <div className="form-group">
                                           <input
                                               name="name"
                                               value={this.state.product.name}
                                               onChange={this.updateInput}
                                               required type="text" className="form-control" placeholder="Product Name"/>
                                       </div>
                                       <div className="form-group">
                                           <div className="custom-file">
                                               <input

                                                   onChange={this.updateImage}
                                                   type="file" className="custom-file-input" id="validatedCustomFile"
                                                      required/>

                                                   <label className="custom-file-label" htmlFor="validatedCustomFile">
                                                       {
                                                           this.state.product.image?<img src={this.state.product.image} height="30" width="30"/>:'Choose File'
                                                       }
                                                   </label>
                                           </div>
                                       </div>
                                       <div className="form-group">
                                           <input
                                               name="price"
                                               value={this.state.product.price}
                                               onChange={this.updateInput}
                                               required type="number" className="form-control" placeholder="Product Price"/>
                                       </div>
                                       <div className="form-group">
                                           <input
                                               name="qty"
                                               value={this.state.product.qty}
                                               onChange={this.updateInput}
                                               required  type="number" className="form-control" placeholder="Product Quantity"/>
                                       </div>
                                       <div className="form-group">
                                           <textarea
                                               name="info"
                                               value={this.state.product.info}
                                               onChange={this.updateInput}
                                               required rows="4" className="form-control" placeholder="Product-info"/>
                                       </div>
                                       <div>
                                           <input type="submit" className="btn btn-success btn-sm" value="Create"/>
                                       </div>
                                   </form>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
                <div style={{marginBottom:"100px"}}></div>
            </React.Fragment>
        );
    }

}
export default CreateProduct;
