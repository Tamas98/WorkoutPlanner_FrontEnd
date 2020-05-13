import Error from "../Components/ErrorComponent";

export function openForm() {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("open").style.display="none";
    document.getElementById("close").style.display="block";
}

export function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("open").style.display="block";
    document.getElementById("close").style.display="none";
    document.getElementById("newElementForm").reset();
}

export function display(id){
    document.getElementById("id").value = id;
    document.getElementById("date").valueAsDate = new Date();
    document.getElementById("graybackground").style.display = "flex";
}

export function close(){
    document.getElementById("graybackground").style.display = "none";
}

export function getAnswersMeaning(answer){
    if(answer === "Modified"){
        window.alert("Day successfully modified")
    }else if(answer === "New"){
        window.alert("New Day successfully created")
    }else{
        throw new Error("Unknown Error occurred");
    }
}