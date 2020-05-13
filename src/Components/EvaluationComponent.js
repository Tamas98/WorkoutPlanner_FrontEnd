import React from 'react'
import MaterialTable from 'material-table'
import Error from "./ErrorComponent";
import Icon from '@material-ui/core'
import '../Style/MealAndExerciseStyle.css';
import '../Style/EvaluationStyle.css';
import '../Style/popUpTables.css';
import LineChart from "react-linechart";
import '../../node_modules/react-linechart/dist/styles.css';
import {hide} from "canvasjs/src/helpers/utils";


class EvaluationComponent extends React.Component{

    state = { days : [],
        meals: [],
        exercises: [],
        lineData: [],
        labels:[],
        selectedDay: {},
        hidden: true,
        columns: [
            { title: 'Date', field: 'date' },
            { title: 'Intake', field: 'intake', type:'numeric'},
            { title: 'Burn', field: 'burn',type:'numeric' },
            { title: 'Result', field: 'result', type: 'numeric' },
        ],};

    componentDidMount(){
        fetch('http://localhost:8082/days',{method: 'GET'})
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    days: responseData
                });
                console.log(this.state.days)
            })
            .catch(() => <Error/>);


    }

    render(){

        let selectedDate = [];
        let currentYear = new Date().getFullYear()
        let data = [
            {
                color: "red",
                points: []
            }
        ];

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

        function hideDiagram(){
            document.getElementById("linechart").style.display = "none";
            this.setState({hidden:true})
        }

        function showDiagram(){
            let monthSelect = document.getElementById("monthSelect");
            let now = new Date()
            monthSelect.value = monthSelect.options[now.getMonth()].value
            document.getElementById("linechart").style.display ="block";
            this.setState({hidden: false})

            calculateDiagramData()
        }

        function calculateDiagramData(){

            let selectMonth = document.getElementById("monthSelect");
            let month = selectMonth.options[selectMonth.selectedIndex].value;

            fetch("http://localhost:8082/days/getMonthData?month="+month,{method:"POST"})
                .then(response => response.json())
                .then(response => response.forEach(dayData => data[0].points.push({x:dayData.date,y:dayData.result})))
                .then(response => this.setState({lineData: data}))
        }

        function getDailyMealsAndExercises(){
            document.getElementById("mealTable").style.display="block";
            let toSend = {"id":selectedDate.id}
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

        function deleteExerciseFromDay(id){
            fetch("http://localhost:8082/days/deleteExercise?id="+id+"&dateId="+this.state.selectedDay.id,{method:"DELETE"})
                .then(response => {
                    if(response.ok){
                        window.alert("Successfully deleted exercise from day")
                        let filteredExercises = this.state.exercises.filter((exercise) => exercise.id !== id)

                        this.setState({
                            exercises: filteredExercises
                        })

                        return response.json()
                    }else{
                        throw new Error("Unknown error")
                    }
                }).then(responseData => this.setState({days:responseData}))
                .catch(err => window.alert(err))
        }

        function deleteMealFromDay(id){
            fetch("http://localhost:8082/days/deleteMeal?id="+id+"&dateId="+this.state.selectedDay.id,{method:"DELETE"})
                .then(response => {
                    if(response.ok){
                        window.alert("Successfully deleted meal from day")
                        let filteredMeals = this.state.meals.filter((meal) => meal.id !== id)

                        this.setState({
                            meals: filteredMeals
                        })

                        return response.json()
                    }else{
                        throw new Error("Unknown error")
                    }
                }).then(responseData => this.setState({days:responseData}))
                .catch(err => window.alert(err))
        }

        deleteMealFromDay = deleteMealFromDay.bind(this)
        deleteExerciseFromDay = deleteExerciseFromDay.bind(this)
        getDailyMealsAndExercises = getDailyMealsAndExercises.bind(this);
        calculateDiagramData = calculateDiagramData.bind(this)
        hideDiagram = hideDiagram.bind(this)
        showDiagram = showDiagram.bind(this)

        return(
            <>
            <MaterialTable columns={this.state.columns} data={this.state.days} title="Days"
                           onRowClick={(event, rowData,togglePanel) => {
                               selectedDate = rowData;this.setState({selectedDay:rowData});getDailyMealsAndExercises()}
                           }/>

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
            ]} data={this.state.meals}
              actions={[{
                  icon:'delete',
                  tooltip:'Delete',
                  onClick: (event,rowData) => {
                      event.preventDefault()
                      deleteMealFromDay(rowData.id)
                  }
              }]}/>
                           </div>
                            <div id="exerciseTable">
                                <MaterialTable columns={[
                                {title: 'Type', field: 'type'},
                                {title: 'Name', field: 'name'},
                                {title: 'Difficulty', field: 'difficulty'},
                                {title: 'Burns', field: 'burn', type: 'numeric'},
                                    {title:'Reps',field:'reps',type:'numeric'}
                                    ]} data={this.state.exercises}
                                actions={[{
                                    icon:'delete',
                                    tooltip:'Delete',
                                    onClick: (event,rowData) => {
                                        event.preventDefault()
                                       deleteExerciseFromDay(rowData.id)
                                    }
                                }]}
                                />
                            </div>
                           </div>

                <div id="lineBox">
                    <button id="showDiagram" className="bg-dark text-danger font-weight-bold border-0 m-3 p-2" onClick={this.state.hidden ? showDiagram : hideDiagram}>{this.state.hidden ? "Show on diagram" : "Hide diagram"}</button>
                    <div id="linechart" style={{"display":"none"}}>
                        <form>
                            <select id="monthSelect" name="selectMonth" onChange={calculateDiagramData}>
                                <option value="1">{currentYear}.01</option>
                                <option value="2">{currentYear}.02</option>
                                <option value="3">{currentYear}.03</option>
                                <option value="4">{currentYear}.04</option>
                                <option value="5">{currentYear}.05</option>
                                <option value="6">{currentYear}.06</option>
                                <option value="7">{currentYear}.07</option>
                                <option value="8">{currentYear}.08</option>
                                <option value="9">{currentYear}.09</option>
                                <option value="10">{currentYear}.10</option>
                                <option value="11">{currentYear}.11</option>
                                <option value="12">{currentYear}.12</option>
                            </select>
                        </form>
                        <LineChart width={1000} xLabel="Date" yLabel="Result" isDate={true}
                            interpolate="linear" height={700} data={this.state.lineData}
                        />
                    </div>
                </div>
                           </>
                           )
    }
}

export default EvaluationComponent