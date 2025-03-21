const API_URL = "http:/localhost:3000/items"

async function createOrUpdateItem(){
    const name = document.getElementById("name").value
    const description = document.getElementById("description").value
    if(editingID){
        await fetch(`${API_URL}/${editingID}`,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, description})
        })
        editingID = null
    } else {
        await fetch(`${API_URL}/${editingID}`,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, description})
        })
    }
}