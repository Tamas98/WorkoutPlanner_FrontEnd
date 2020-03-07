import React from 'react'
import MaterialTable from 'material-table'
import Error from "./ErrorComponent";
import Icon from '@material-ui/core'
import '../Style/Meals.css';
import '../Style/popUpTables.css';

class EvaluationComponent extends React.Component{

    state = { days : [],
        meals: [],
        exercises: [],
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

        let selectedDate = [];

        function close(){
            document.getElementById("tables").style.display ="none";
            document.getElementById("mealTable").style.display = "none";
            document.getElementById("exerciseTable").style.display ="none";
        }

        function showMeals(){
            document.getElementById("mealTable").style.display = "block";
            document.getElementById("exerciseTable").style.display ="none";
        }

        function showExercises(){
            document.getElementById("mealTable").style.display = "none";
            document.getElementById("exerciseTable").style.display ="block";
        }


        function getDailyMeals(){
            document.getElementById("mealTable").style.display="block";
            let toSend = {"id":this.state.days.indexOf(selectedDate)+1}
            fetch('http://localhost:8082/days/getDayMeal',{method:"POST",headers: {
                    'Content-Type': "application/json"
                },body:JSON.stringify(toSend)})
                .then(response => response.json())
                .then(responseJson => this.setState({meals:responseJson}))
                .catch(err => console.error(err))

            fetch('http://localhost:8082/days/getDayExercises',{method:"POST",headers: {
                    'Content-Type': "application/json"
                },body:JSON.stringify(toSend)})
                .then(response => response.json())
                .then(responseJson => this.setState({exercises:responseJson}))
                .catch(err => console.error(err))

            document.getElementById("tables").style.display = "flex";
        }

        getDailyMeals = getDailyMeals.bind(this);

        return(
            <>
            <MaterialTable columns={this.state.columns} data={this.state.days} title="Days"
                           onRowClick={(event, rowData, togglePanel) => {selectedDate = rowData;getDailyMeals()}}/>

                           <div id="tables">
                               <div id="navButtons">
                                   <button data-toggle="button" className="tableNavButton btn-lg btn btn-dark text-light" onClick={showMeals}>Meals</button>
                                   <button data-toggle="button" className="tableNavButton btn-lg btn btn-dark text-light" onClick={showExercises}>Exercises</button>
                                   <button data-toggle="button" className="tableNavButton btn-lg btn btn-danger" onClick={close}>Close</button>
                               </div>
                           <div id="mealTable">
                           <MaterialTable columns={[
                {title: 'Type', field: 'type'},
                {title: 'Name', field: 'name'},
                {title: 'Calories', field: 'calories', type: 'numeric'},
                {title: 'Fat', field: 'fat', type: 'numeric'},
                {title: 'Carbohydrates', field: 'carbos', type: 'numeric'},
                {title: 'Sugar', field: 'sugar', type: 'numeric'},
                {title: 'Protein', field: 'protein', type: 'numeric'},
                {title: 'Salt', field: 'salt', type: 'numeric'},
                {title: "Eaten", field: 'eaten',type:'numeric'}
            ]} data={this.state.meals}/>
                           </div>
                            <div id="exerciseTable">
                                <MaterialTable columns={[
                                {title: 'Type', field: 'type'},
                                {title: 'Name', field: 'name'},
                                {title: 'Difficulty', field: 'difficulty'},
                                {title: 'Burns', field: 'burn', type: 'numeric'},
                                    {title:'Reps',field:'reps',type:'numeric'}
                                    ]} data={this.state.exercises}/>
                            </div>
                           </div>
                           </>
                           )
    }
}

export default EvaluationComponent