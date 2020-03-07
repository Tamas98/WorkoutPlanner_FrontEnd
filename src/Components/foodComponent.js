import React from 'react';
import MaterialTable from 'material-table'
import '../Style/Meals.css'
import Error from './ErrorComponent';

class foodComponent extends React.Component{

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
        fetch('http://localhost:8082/api/meals',{method: 'GET'})
        .then(response => response.json())
        .then(responseData => {
            this.setState({
                meals: responseData._embedded.meals
            })
        }).catch(() => <Error/>);
    }

    render(){

        let choosenFood;

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

            fetch('http://localhost:8082/api/meals' , {method:"POST",body:JSON.stringify(meal),headers: {
                    'Content-Type': 'application/json'
                }}).then(response => response.json())
                .catch(err => console.error(err));

            this.setState((prevState) => {
                return{meals: [...prevState.meals,meal]}
            })

            document.getElementById("newMealForm").reset()
        }

        function addToDate(event){
            event.preventDefault();

            console.log(choosenFood)

            let date = document.getElementById("date").value;
            let eaten = document.getElementById("eaten").value;
            let id = document.getElementById("id").value;


            let body = {
                "meal":choosenFood,
                "date": date,
                "eaten": eaten,
                "id":id
            }

            let day ={
                "date":date,
                "intake":eaten,
                "burn": 0,
                "result": 0,
                "meals": [choosenFood],
                "exercises": []
            }

            fetch('http://localhost:8082/days/mealAdd' , {method:"POST",body:JSON.stringify(body),headers: {
                'Content-Type': 'application/json'
            }}).then(response => console.log(response.text()))
                .catch(err => console.error(err));


            document.getElementById("addToDateForm").reset()
            close()

        }

        function display(id){
            document.getElementById("id").value = id;
            document.getElementById("date").valueAsDate = new Date();
            document.getElementById("graybackground").style.display = "flex";
        }

        addNew = addNew.bind(this)

        return(
            <>
                {this.state.meals.length > 0 ?
                <>
                    <div id="graybackground">
                        <div id="popupForm">
                            <button id="cancel" onClick={close}>X</button>
                            <form id="addToDateForm"  onSubmit={addToDate} method="put" action="?addMeal">
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
                        <form id="newMealForm" onSubmit={addNew} method="post" className="form">
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

                            <input className="btn" type="submit" value="Submit" onClick={closeForm}/><br></br>
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
                            choosenFood = rowData
                            display(this.state.meals.indexOf(rowData)+1);
                        }
                    }]}
                    />
                </> : <Error/> }
            </>
        )
    }
}

export default foodComponent;