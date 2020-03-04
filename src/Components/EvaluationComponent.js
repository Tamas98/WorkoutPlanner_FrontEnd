import React from 'react'
import MaterialTable from 'material-table'
import Error from "./ErrorComponent";
import Icon from '@material-ui/core'
import '../Style/Meals.css';

class EvaluationComponent extends React.Component{

    state = { days : [],
        columns: [
            { title: 'Date', field: 'date' },
            { title: 'Intake', field: 'intake', type:'numeric'},
            { title: 'Burn', field: 'burn',type:'numeric' },
            { title: 'Result', field: 'result', type: 'numeric' },
        ],};

    componentDidMount(){
        fetch('http://localhost:8082/api/days',{method: 'GET'})
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    days: responseData._embedded.days
                })
            }).catch(() => <Error/>);
    }

    render(){
        return(
            <MaterialTable columns={this.state.columns} data={this.state.days} title="Days"/>
        )
    }
}

export default EvaluationComponent