import React from 'react';
import MaterialTable from 'material-table'
import '../Style/Meals.css'
import Error from './ErrorComponent';

class foodComponent extends React.Component{

    state = { meals : [],
            columns: [
                { title: 'Type', field: 'type' },
                { title: 'Name', field: 'name' },
                { title: 'Calories', field: 'calories',type:'numeric' },
                { title: 'Fat', field: 'fat', type: 'numeric' },
                { title: 'Carbohydrates', field: 'carbos', type: 'numeric' },
                { title: 'Sugar', field: 'sugar', type: 'numeric' },
                { title: 'Protein', field: 'protein', type: 'numeric' },
                { title: 'Salt', field: 'salt', type: 'numeric' },
            ],};

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
        }

        function addToDate(event){
            event.preventDefault();

            let id = document.getElementById("id").value;
            let date = document.getElementById("date").value;
            let eaten = document.getElementById("eaten").value;

            const formData = new FormData();
            formData.append("id",id);
            formData.append("date",date);
            formData.append("eaten",eaten);

            fetch('http://localhost:8082/api/meals',{method:'PUT',body:formData}).then(response => response.json());

            /*fetch('http://localhost:8082/api/meals' , {method:"PUT",body:JSON.stringify({
                    "id": id,
                    "date":date,
                    "eaten":eaten
                })}).then(response => response.json())
                .catch(err => console.error(err));*/

        }

        function display(id){
            document.getElementById("id").value = id;
            document.getElementById("date").valueAsDate = new Date();
            document.getElementById("graybackground").style.display = "flex";
        }

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
                        <form  onSubmit={addNew} method="post" className="form">
                            <h2>Type macros in 100g</h2>

                            <input required type="text" name="name" placeholder="Food name"/><br></br>
                            <input required step="any" min="0" type="number" name="calories"
                                   placeholder="Calories"/><br></br>
                            <input required step="any" min="0" type="number" name="fat" placeholder="Fat"/><br></br>
                            <input required step="any" min="0" type="number" name="carbos" placeholder="Carbohydrates"/><br></br>
                            <input required step="any" min="0" type="number" name="sugar" placeholder="Sugar"/><br></br>
                            <input required step="any" min="0" type="number" name="protein" placeholder="Protein"/><br></br>
                            <input required step="any" min="0" type="number" name="salt" placeholder="Salt"/><br></br>

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