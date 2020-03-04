import React from 'react'
import Slider from 'react-animated-slider'
import 'react-animated-slider/build/horizontal.css';
import '../Style/Slider.css';

class mainPageSlider extends React.Component{
   
    render(){
        return(
            <Slider style="height:100%">
                {this.props.quotes.map((quote, index) => 
                <div className="quotes" key={index}>
                    <h2 className="actualQuote">{quote.quote}</h2>
                    <h4 className="said">{quote.said}</h4>
                </div>)}
            </Slider>
        );
    }
}

export default mainPageSlider