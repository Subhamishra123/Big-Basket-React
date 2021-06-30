import React from 'react';
class Home extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <React.Fragment>
               <div className="landing-page">
                   <div className="wrapper">
                       <div className="animated zoomIn d-flex flex-column justify-content-center text-center align-items-center h-100">
                           <h3 className="display-4">Big Basket Application</h3>
                           <p className="text-mute">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias at, aut consectetur consequatur debitis dicta, ea eaque esse eveniet excepturi facere libero magnam maiores modi necessitatibus nesciunt numquam odit ratione sint suscipit tempora veritatis. Amet autem facere molestias quibusdam?</p>
                       </div>
                   </div>
               </div>
            </React.Fragment>
        );
    }

}
export default Home;
