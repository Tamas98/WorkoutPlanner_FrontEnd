import React from 'react';
import MaterialTable from 'material-table'
import '../Style/MealAndExerciseStyle.css'
import Error from './ErrorComponent';
import {openForm,closeForm,close,display,getAnswersMeaning} from "../Elements/FunctionHolder";

export default class mealComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            meals: [],
            columns: [
                {title: 'Type', field: 'type'},
                {title: 'Name', field: 'name'},
                {title: 'Calories', field: 'calories', type: 'numeric'},
                {title: 'Fat', field: 'fat', type: 'numeric'},
                {title: 'Carbohydrates', field: 'carbos', type: 'numeric'},
                {title: 'Sugar', field: 'sugar', type: 'numeric'},
                {title: 'Protein', field: 'protein', type: 'numeric'},
                {title: 'Salt', field: 'salt', type: 'numeric'},
            ],
        };
    }

    componentDidMount(){
        fetch('http://localhost:8082/meals',{method: 'GET'})
        .then(response => response.json())
        .then(responseData => {
            this.setState({
                meals: responseData
            })
        }).catch((error) => <Error error={error}/>);
    }

    render(){

        let chosenFood;
        function addNew(event){

            event.preventDefault()

            let name = document.getElementById("newName").value;
            let select = document.getElementById("newType");
            let type = select.options[select.selectedIndex].text;
            let cals = document.getElementById("newCals").value;
            let fat = document.getElementById("newFat").value;
            let carbos = document.getElementById("newCarbos").value;
            let sugar = document.getElementById("newSugar").value;
            let protein = document.getElementById("newProtein").value;
            let salt = document.getElementById("newSalt").value;

            let meal ={
                "name": name,
                "type": type,
                "calories": cals,
                "fat": fat,
                "carbos": carbos,
                "sugar": sugar,
                "protein": protein,
                "salt": salt
            }

            fetch('http://localhost:8082/meals' , {method:"POST",body:JSON.stringify(meal),headers: {
                    'Content-Type': 'application/json'
                }}).then(response => {
                    if(response.ok){
                        window.alert("New Meal successfully added to database");
                        this.setState((prevState) => {
                            return {meals: [...prevState.meals,meal]}
                        })
                        closeForm()
                    }else{
                        throw new Error(response.statusCode);
                    }
            })
                .catch(err =>
                    window.alert("Food already exists in database")
                );
        }

        function addToDate(chosenFood) {

            let date = document.getElementById("date").value;
            let eaten = document.getElementById("eaten").value;
            let id = document.getElementById("id").value;

            let body = {
                "meal": chosenFood,
                "date": date,
                "eaten": eaten,
                "id": id
            }

            fetch('http://localhost:8082/days/mealAdd', {
                method: "POST", body: JSON.stringify(body), headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.text())
                .then(answer =>{
                    getAnswersMeaning(answer)
                })
                .catch(err => window.alert(err));


            document.getElementById("addToDateForm").reset()
            close()

        }

        addNew = addNew.bind(this)


        return(
            <>
                <>
                    <div id="graybackground">
                        <div id="popupForm">
                            <button id="cancel" onClick={close}>X</button>
                            <form id="addToDateForm"  onSubmit={(e) => {e.preventDefault();addToDate(chosenFood)}} method="put" action="?addMeal">
                                <input id="id" type="numeric" name="id" placeholder="ID"/>
                                <input id="eaten" type="number" name="eaten" placeholder="Eaten amount" required step="0.01"
                                       min="0"/>
                                <input id="date" type="date" name="date" required/>
                                <input type="submit" value="Submit"/>
                            </form>
                        </div>
                    </div>

                    <button id="open" className="open-button" onClick={openForm}>Add new meal</button>

                    <div className="form-popup" id="myForm">
                        <form id="newElementForm" onSubmit={addNew} method="post" className="form">
                            <h2>Type macros in 100g</h2>

                            <input id="newName" required type="text" name="name" placeholder="Food name"/><br></br>
                            <select id="newType">
                                <option>Chicken</option>
                                <option>Pork</option>
                                <option>Turkey</option>
                                <option>Beef</option>
                                <option>Fruit</option>
                                <option>Vegetable</option>
                            </select>
                            <input  id="newCals"required step="any" min="0" type="number" name="calories"
                                   placeholder="Calories"/><br></br>
                            <input id="newFat" required step="any" min="0" type="number" name="fat" placeholder="Fat"/><br></br>
                            <input id="newCarbos" required step="any" min="0" type="number" name="carbos" placeholder="Carbohydrates"/><br></br>
                            <input id="newSugar" required step="any" min="0" type="number" name="sugar" placeholder="Sugar"/><br></br>
                            <input id="newProtein" required step="any" min="0" type="number" name="protein" placeholder="Protein"/><br></br>
                            <input id="newSalt" required step="any" min="0" type="number" name="salt" placeholder="Salt"/><br></br>

                            <input className="btn" type="submit" value="Submit"/><br></br>
                            <button type="button" id="close" className="btn cancel" onClick={closeForm}>Close</button>
                        </form>
                    </div>

                    <MaterialTable
                    columns={this.state.columns}
                    title="Meals"
                    data={this.state.meals}
                    actions={[{
                        icon: 'add_circle',
                        tooltip: 'Add to date',
                        onClick: (event, rowData) => {
                            chosenFood = rowData
                            display(rowData.id);
                        }
                    }]}
                    />
                </> }
            </>
        )
    }
}

