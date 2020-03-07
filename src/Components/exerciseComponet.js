import React from 'react';
import MaterialTable from 'material-table'
import '../Style/Meals.css'



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
        fetch('http://localhost:8082/api/exercises',{method: 'GET'})
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    exercises: responseData._embedded.exercises,
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
                }}).then(response => console.log(response.text()))
                .catch(err => console.error(err));


            document.getElementById("addToDateForm").reset()
            close()

        }

        function close(){
            document.getElementById("graybackground").style.display = "none";
        }

        function openForm() {
            document.getElementById("myForm").style.display = "block";
            document.getElementById("open").style.display="none";
            document.getElementById("close").style.display="block";
        }

        function closeForm() {
            document.getElementById("myForm").style.display = "none";
            document.getElementById("open").style.display="block";
            document.getElementById("close").style.display="none";
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

            fetch('http://localhost:8082/api/exercises' , {method:"POST",body:JSON.stringify(exercise),headers: {
                    'Content-Type': 'application/json'
                }}).then(response => response.json())
                .catch(err => console.error(err));

            this.setState((prevState) => {
                return{exercises: [...prevState.exercises,exercise]}
            })

            document.getElementById("newExerciseForm").reset()

            closeForm()
        }

        function display(id){
            document.getElementById("id").value = id;
            document.getElementById("date").valueAsDate = new Date();
            document.getElementById("graybackground").style.display = "flex";
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
                    <form onSubmit={addNew} id="newExerciseForm" method="post" className="form">
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