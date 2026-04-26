const arr = [];

function addElement(){
    const inputEl = document.querySelector(".js-input");
    const dateEl = document.querySelector(".js-date");

    const name = inputEl.value;
    const date = dateEl.value;

    if (!name) return;
    if (!date) return;

    arr.push({
        name: name,
        date: date
    });

    inputEl.value = '';
    dateEl.value = '';

    Render();
}

function Render(){
    const val = document.querySelector(".js-tasks");

    let print = "";

    for(let i = 0; i < arr.length; i++){
        const todoObject = arr[i];

        print += `
        <p>
            ${i + 1}. ${todoObject.name} (${todoObject.date || "No date"})
            <button onclick="removeElement(${i})">Remove</button>
        </p>`;
    }

    val.innerHTML = print;
}

function removeElement(index){
    arr.splice(index, 1);
    Render();
}

function Type(value) {
    if (value === "Enter") {
        addElement();
    }
}