import React from 'react';
import MaterialTable from 'material-table'
import '../Style/MealAndExerciseStyle.css'
import Error from "./ErrorComponent";
import {openForm,closeForm,close,display,getAnswersMeaning} from "../Elements/FunctionHolder";


class exerciseComponet extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            exercises: [],
            columns: [
                {title: 'Type', field: 'type'},
                {title: 'Name', field: 'name'},
                {title: 'Difficulty', field: 'difficulty'},
                {title: 'Burns', field: 'burn', type: 'numeric'},
            ],
        };
    }

    componentDidMount(){
        fetch('http://localhost:8082/exercises',{method: 'GET'})
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    exercises: responseData
                })
            }).catch(err => console.error(err));
    }

    render(){

        let choosenExercise;

        function addToDate(event){
            event.preventDefault();

            let date = document.getElementById("date").value;
            let reps = document.getElementById("reps").value;
            let id = document.getElementById("id").value;


            let body = {
                "exercise":choosenExercise,
                "date": date,
                "reps": reps,
                "id":id
            }

            fetch('http://localhost:8082/days/exerciseAdd' , {method:"POST",body:JSON.stringify(body),headers: {
                    'Content-Type': 'application/json'
                }}).then(response => response.text())
                .then(answer =>{
                   getAnswersMeaning(answer)
                })
                .catch(err => window.alert(err));


            document.getElementById("addToDateForm").reset()
            close()

        }

        function addNew(event){
            event.preventDefault();

            let name = document.getElementById("newName").value;
            let selectdiff = document.getElementById("selectDiff");
            let diff = selectdiff.options[selectdiff.selectedIndex].text;
            let selectType = document.getElementById("selectType");
            let type = selectType.options[selectType.selectedIndex].text;
            let burn = document.getElementById("newBurn").value;

            let exercise = {
                "name": name,
                "type": type,
                "difficulty": diff,
                "burn": burn
            }

            fetch('http://localhost:8082/exercises' , {method:"POST",body:JSON.stringify(exercise),headers: {
                    'Content-Type': 'application/json'
                }}).then(response => {
                if(response.ok){
                    window.alert("New exercise successfully added to database");
                    this.setState((prevState) => {
                        return {exercises: [...prevState.exercises,exercise]}
                    })
                    closeForm()
                }else{
                    throw new Error(response.statusCode);
                }
            })
                .catch(err =>
                    window.alert("Exercise already exists in database")
                );

            closeForm()
        }

        addNew = addNew.bind(this)

        return(
            <>
                <div id="graybackground">
                    <div id="popupForm">
                        <button id="cancel" onClick={close}>X</button>
                        <form id="addToDateForm" method="post" onSubmit={addToDate}>
                            <input id="id" type="number" name="id" placeholder="ID"/>
                            <input id="reps" type="number" name="reps" placeholder="Reps done" required step="0.01" min="0"/>
                            <input id="date" type="date" name="date" required/>
                            <input type="submit" value="Submit"/>
                        </form>
                    </div>
                </div>

                <button id="open" className="open-button" onClick={openForm}>Add new exercise</button>

                <div className="form-popup" id="myForm">
                    <form onSubmit={addNew} id="newElementForm" method="post" className="form">
                        <h2>Type data about the Exercise</h2>

                        <input id="newName" type="text" name="name" placeholder="Exercise name"/><br></br>
                        <input id="newBurn" type="number" name="burned" placeholder="Calories burn/rep"/><br></br>
                        <select id="selectType" name="type">
                            <option>Biceps</option>
                            <option>Triceps</option>
                            <option>Leg</option>
                            <option>ABS</option>
                            <option>Back</option>
                            <option>Chest</option>
                            <option>Other</option>
                        </select>
                        <select id="selectDiff" name="difficulty">
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>

                        <input className="btn" type="submit" value="Submit"/><br></br>
                        <button type="button" id="close" className="btn cancel" onClick={closeForm}>Close</button>
                    </form>
                </div>

                <MaterialTable
                    columns={this.state.columns}
                    title="Exercises"
                    data={this.state.exercises}
                    actions={[{
                        icon: 'add_circle',
                        tooltip: 'Add to date',
                        onClick: (event, rowData) => {
                            choosenExercise = rowData
                            display(this.state.exercises.indexOf(rowData)+1)
                        }
                    }]}
                />
            </>
        )
    }
}

export default exerciseComponet;