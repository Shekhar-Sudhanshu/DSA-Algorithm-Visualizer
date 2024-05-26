const boxes = document.querySelector(".boxes")
const arrInput = document.querySelector(".arrInput");
const emtInput = document.querySelector(".emtInput");
const random_btn = document.querySelector("#randomize");
const search_btn = document.querySelector("#search");
const method = document.querySelector("#select_search");
const search_terminal = document.querySelector(".search_terminal");

let arr = [20, 30, 35, 10, 22, 12, 2];
let emt = 12;

boxes.style.padding = "30px";

const createBoxes = (arr) => {
    let i=0;
    arr.forEach((e) => {
        let div = document.createElement("div");
        div.classList.add("bar");
        div.innerText = e;
        div.style.height = "50px"
        div.setAttribute("id", "box"+i);
        i++;
        boxes.appendChild(div);
    });
}
createBoxes(arr);

const getArrInput = () => {
    let val = arrInput.value;
    let arr = val.split(' ');
    let intArr = [];
    for(let i of arr){
        if(i=='') continue;
        intArr.push(parseInt(i));
    }
    return intArr;
}

const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const removeTerminal = () => {
    search_terminal.innerText = ""
}

const generateRandomNumbers = (min, max) => {
    return Math.floor(Math.random() * (max-min) + min)
}

const generateRandomInputArray = () => {
    let arr = [];
    for(let i=0;i<10;i++){
        arr.push(generateRandomNumbers(1, 50))
    }
    return arr;
}

const generateRandomElement = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
}

const wait = (time) => {
    return new Promise(resolve => setTimeout(resolve, time))
}

const disable_buttons = () => {
    random_btn.setAttribute("disabled", "disabled");
    search_btn.setAttribute("disabled", "disabled");
}

const enable_buttons = () => {
    random_btn.removeAttribute("disabled");
    search_btn.removeAttribute("disabled");
}

const linear_search = async(arr, emt) => {
    disable_buttons()
    let found = 0
    for(let i=0;i<arr.length;i++){
        await wait(200);
        let id = "box"+i
        let box = document.getElementById(id)
        box.classList.add("bounce");
        if(arr[i]==emt){
            box.style.backgroundColor = "green"
            box.style.color = "white"
            found = 1
            search_terminal.innerText = "Element Found at index "+i
            break;
        }
    }
    await wait(200)
    if(found === 0){
        search_terminal.innerText = "Element Not Found!"
    }
    await wait(500)
    enable_buttons()
}

const binary_search = async(arr, emt) => {
    disable_buttons()
    let low = 0, high = arr.length-1;
    let found = 0
    await wait(500);

    while(low<=high){
        let low_id = "box"+low
        let high_id = "box"+high
        document.getElementById(low_id).classList.add("bounce")
        document.getElementById(high_id).classList.add("bounce")
        await wait(1000);
        document.getElementById(low_id).classList.remove("bounce")
        document.getElementById(high_id).classList.remove("bounce")
        
        await wait(500);
        let mid = parseInt(low + (high-low)/2);
        search_terminal.innerText = `low = ${low} & high = ${high}\nMid = ${low} + (${high} - ${low})/2 = ${mid}\nMid Element = ${arr[mid]}\n`

        let mid_id = "box"+mid;
        document.getElementById(mid_id).style.backgroundColor = "black"
        document.getElementById(mid_id).style.color = "white"

        await wait(500)
        document.getElementById(mid_id).style.backgroundColor = "white"
        document.getElementById(mid_id).style.color = "black"

        if(emt==arr[mid]){
            search_terminal.innerText = search_terminal.innerText + `Mid Element = Element to Found\n${arr[mid]} = ${emt}\nElement Found!\n`
            let id = "box"+mid;
            document.getElementById(id).style.backgroundColor = "green"
            document.getElementById(id).style.color = "white"
            found = 1
            break;
        }
        else if(emt>arr[mid]){
            search_terminal.innerText = search_terminal.innerText + `Mid Element < Element to Found\n${arr[mid]} < ${emt}\nlow = mid+1\n`
            low = mid+1;
        }
        else if(emt<arr[mid]){
            search_terminal.innerText = search_terminal.innerText + `Mid Element > Element to Found\n${arr[mid]} > ${emt}\nhigh = mid-1\n`
            high = mid-1;
        }
    }
    await wait(200)
    if(found === 0){
        search_terminal.innerText = "Element Not Found!"
    }
    enable_buttons()
}

method.addEventListener("change", ()=>{
    removeTerminal();
    removeAllChildNodes(boxes);
    search_terminal.innerText = "";

    let heading = document.querySelector("h1")
    if(method.value === "linear_search"){
        heading.innerText = "Visualize Linear Search"
        let new_arr = arr.sort(()=>Math.random()-0.5)
        emt = generateRandomElement(new_arr)
        createBoxes(new_arr)
        arrInput.value = new_arr.toString().replaceAll(',',' ')
        emtInput.value = emt
    }
    if(method.value === "binary_search"){
        heading.innerText = "Visualize Binary Search"
        let new_arr = arr.sort(function(a,b) {return a-b})
        emt = generateRandomElement(new_arr)
        createBoxes(new_arr)
        arrInput.value = new_arr.toString().replaceAll(',',' ')
        emtInput.value = emt
    }
})

arrInput.addEventListener("change", ()=>{
    removeTerminal()
    removeAllChildNodes(boxes)
    arr = getArrInput()
    createBoxes(arr)
})

emtInput.addEventListener("change", ()=>{
    removeTerminal()
    removeAllChildNodes(boxes)
    emt = emtInput.value
    createBoxes(arr)
})

random_btn.addEventListener("click", ()=>{
    search_terminal.innerText = ""
    arr = generateRandomInputArray()
    emt = generateRandomElement(arr)
    
    if(method.value==="binary_search"){
        let random_arr_str = arr.sort(function(a,b){return a-b}).toString();  
        arrInput.value = random_arr_str.replaceAll(',',' ');
    }

    if(method.value === "linear_search"){
        let random_arr_str = arr.toString();    
        arrInput.value = random_arr_str.replaceAll(',',' ');
    }

    emtInput.value = emt;

    removeAllChildNodes(boxes);
    createBoxes(arr);
})

search_btn.addEventListener("click", ()=>{
    removeTerminal()
    removeAllChildNodes(boxes)
    createBoxes(arr)
    if(method.value==="linear_search"){
        linear_search(arr, emt);
    }
    if(method.value==="binary_search"){
        binary_search(arr, emt);
    }
})