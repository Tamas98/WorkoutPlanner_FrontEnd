import React from 'react'
import MainSlider from '../Elements/mainPageSlider'

class homeComponent extends React.Component{

    render(){
        return(
            <>
                <MainSlider quotes={this.props.quotes}/>
            </>
        )
    }
}

export default homeComponent