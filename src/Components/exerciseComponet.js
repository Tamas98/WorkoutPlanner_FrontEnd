import React from 'react';
import MaterialTable from 'material-table'
import '../Style/Meals.css'



class exerciseComponet extends React.Component{

    state = { exercises : [],
        columns: [
            { title: 'Type', field: 'type' },
            { title: 'Name', field: 'name' },
            { title: 'Difficulty', field: 'difficulty'},
            { title: 'Burns', field: 'burn', type: 'numeric' },
        ],};

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

        return(
            <>
                <div id="graybackground">
                    <div id="popupForm">
                        <button id="cancel" onClick="close()">X</button>
                        <form id="addToDateForm" method="post" action="?addExercise">
                            <input id="id" type="number" name="id" placeholder="ID"/>
                            <input type="number" name="reps" placeholder="Reps done" required step="0.01" min="0"/>
                            <input id="date" type="date" name="date" required/>
                            <input type="submit" value="Submit"/>
                        </form>
                    </div>
                </div>

                <button id="open" className="open-button" onClick={openForm}>Add new exercise</button>

                <div className="form-popup" id="myForm">
                    <form method="post" className="form">
                        <h2>Type data about the Exercise</h2>

                        <input type="text" name="name" placeholder="Exercise name"/><br></br>
                        <input type="number" name="burned" placeholder="Calories burn/rep"/><br></br>
                        <select name="difficulty">
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
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
                            console.log("Hello There")
                        }
                    }]}
                />
            </>
        )
    }
}

export default exerciseComponet;