import React from 'react'
import Slider from 'react-animated-slider'
import 'react-animated-slider/build/horizontal.css';
import '../Style/SliderStyle.css';

const mainPageSlider = ({quotes}) =>
    <Slider style="height:100%">
        {quotes.map((quote, index) =>
            <div className="quotes" key={index}>
                <h2 className="actualQuote">{quote.quote}</h2>
                <h4 className="told">{quote.said}</h4>
            </div>)}
    </Slider>


export default mainPageSlider