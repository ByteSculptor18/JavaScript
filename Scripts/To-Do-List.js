const arr = [];
function addElement(){
    const element = document.querySelector(".js-input");
    const val = element.value;
    if (!val) return;
    arr.push(val);
    console.log(arr);
    element.value = '';
    Render();

}
function Render(){
    const val = document.querySelector(".js-tasks");
    let print = "";
    for(let i = 0; i < arr.length; i++){
        print += `<p>
        ${i + 1}. ${arr[i]} <button onclick="
        removeElement(${i})">Remove</button>
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
                return "Enter Key";
            }
}