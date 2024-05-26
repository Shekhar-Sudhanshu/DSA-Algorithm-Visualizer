let arr = [20, 30, 35, 10, 22, 12, 2];
let sort_btn = document.querySelector("#sort");
let random_btn = document.querySelector("#randomize");
let bar_container = document.querySelector(".bars");
let input_field = document.querySelector(".arrInput");
let terminal = document.querySelector("#terminal");
let method = document.querySelector("#select_sort");


let k=0;
arr.forEach((e)=>{
    let emt = document.createElement("div");
    emt.classList.add("bar");
    emt.style.height = (e*12)+"px";
    emt.innerText = e;
    emt.setAttribute("id", 'bar'+k);
    k++;
    bar_container.appendChild(emt);
})


function getInput(){
    let val = input_field.value;
    let arr = val.split(' ');
    let intArr = [];
    for(let i of arr){
        if(i=='') continue;
        intArr.push(parseInt(i));
    }
    return intArr;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function createRandomNums(min, max){
    return Math.floor(Math.random() * (max-min) + min);
}

function generateArray(){
    let arr = new Array();
    for(let i=0;i<10;i++){
        arr.push(createRandomNums(10, 30));
    }
    return arr;
}

function createBars(arr){
    let i=0;
    arr.forEach((e)=>{
        let emt = document.createElement("div");
        emt.classList.add("bar");
        emt.style.height = (e*12)+"px";
        emt.innerText = e;
        emt.setAttribute("id", 'bar'+i);
        i++;
        bar_container.appendChild(emt);
    })
}

const removeTerminal = () => {
    terminal.innerText = "";
    terminal.classList.remove("terminal");
}

const wait = (time) => {
    return new Promise(resolve => setTimeout(resolve, time))
}

const disable_buttons = () => {
    random_btn.setAttribute("disabled", "disabled");
    sort_btn.setAttribute("disabled", "disabled");
}

const enable_buttons = () => {
    random_btn.removeAttribute("disabled");
    sort_btn.removeAttribute("disabled");
}

async function bubbleSort(val){
    disable_buttons()
    
    for(let i=0;i<val.length;i++){
        for(let j=0;j<val.length-i-1;j++){
            await wait(200);
            let id1 = "bar"+(j);
            let id2 = "bar"+(j+1);
            let bar1 = document.getElementById(id1);
            let bar2 = document.getElementById(id2);
            
            bar1.style.backgroundColor = "black";
            bar2.style.backgroundColor = "black";

            bar1.style.color = "white";
            bar2.style.color = "white";

            if(val[j]>val[j+1]){
                
                terminal.innerText = (`${terminal.innerText}\nArray - ${val}\n${val[j]} > ${val[j+1]} -- Swap 🔁\n`);

                let temp = val[j];
                val[j] = val[j+1];
                val[j+1] = temp;

                let num1 = bar1.innerText;
                let num2 = bar2.innerText;

                bar1.innerText = num2;
                bar2.innerText = num1;

                let h1 = bar1.style.height;
                let h2 = bar2.style.height;

                bar1.style.height = h2;
                bar2.style.height = h1;
            }
            else if(val[j]<val[j+1]){
                terminal.innerText = (`${terminal.innerText}\nArray - ${val}\n${val[j]} < ${val[j+1]} -- No Swap\n`);
            }
            else{
                terminal.innerText = (`${terminal.innerText}\nArray - ${val}\n${val[j]} = ${val[j+1]} -- No Swap\n`);
            }
        }
        let newArray = val.slice(0, val.length-i);
        if(newArray[newArray.length-1] == Math.max(...newArray)){
            let lastid = "bar"+(val.length-i-1);
            let lastbar = document.getElementById(lastid);
            lastbar.style.backgroundColor = "green";
            lastbar.style.color = "white";
            newArray = val.slice(0, val.length-i-1);
        }
    }

    terminal.innerText = (`${terminal.innerText}\nSorted Array - ${val}\n`)

    enable_buttons()

}

async function selection_sort(val){
    disable_buttons()

    for(let i=0;i<=val.length-2;i++){
        let min_ind = i
        for(let j=i;j<=val.length-1;j++){
            if(val[j]<val[min_ind]){
                min_ind = j
            }
        }
        let id1 = "bar"+i;
        let id2 = "bar"+min_ind;
        let bar1 = document.getElementById(id1);
        let bar2 = document.getElementById(id2);

        if(min_ind!=i){
            terminal.innerText = (`${terminal.innerText}\nArray - ${val}\nMinimum element - ${val[min_ind]}\n🔁 Swapping ${val[i]} and ${val[min_ind]}\n`)
        }
        else if(min_ind==i){
            terminal.innerText = (`${terminal.innerText}\nMinimum element - ${val[min_ind]}\nSame as the initial element of the unsorted array\nArray - ${val}\n`)
        }
        
        bar2.classList.add("bounce");
        bar1.classList.add("bounce");
        await wait(1200)
        bar2.classList.remove("bounce");
        bar1.classList.remove("bounce");

        let temp = val[min_ind]
        val[min_ind] = val[i]
        val[i] = temp

        let num1 = bar1.innerText;
        bar1.innerText = bar2.innerText;
        bar2.innerText = num1;

        let h1 = bar1.style.height;
        bar1.style.height = bar2.style.height;
        bar2.style.height = h1;

        bar1.style.backgroundColor = "green";
        bar1.style.color = "white";
        
    }
    terminal.innerText = (`${terminal.innerText}\nSorted Array - ${val}\n`)
    await wait(500)
    let lastid = "bar"+(val.length-1);
    let lastbar = document.getElementById(lastid);
    lastbar.style.backgroundColor = "green";
    lastbar.style.color = "white";

    enable_buttons()
}


async function insertion_sort(val){
    disable_buttons()
    for(let i=0;i<val.length;i++){
        let j=i;

        let id = "bar"+i;
        document.getElementById(id).classList.add("bounce");
        await wait(800);
        document.getElementById(id).classList.remove("bounce");

        terminal.innerText = terminal.innerText + `\n------------------------\nFor i = ${i}\n`

        if(i==0){
            terminal.innerText = terminal.innerText + `\nNo need to Swap\n`
        }

        if(arr[j-1]<arr[j]){
            terminal.innerText = terminal.innerText + `\n${arr[j-1]} < ${arr[j]}\n No need to Swap\n`
        }

        while(j>0 && arr[j]<arr[j-1]){
            await wait(800);
            terminal.innerText = terminal.innerText + `\n${arr[j-1]} > ${arr[j]}\n Swapping\n`

            let temp = arr[j];
            arr[j] = arr[j-1];
            arr[j-1] = temp;

            let id1 = "bar"+j;
            let id2 = "bar"+(j-1);

            let bar1 = document.getElementById(id1);
            let bar2 = document.getElementById(id2);

            let num1 = bar1.innerText;
            bar1.innerText = bar2.innerText;
            bar2.innerText = num1;

            let h1 = bar1.style.height;
            bar1.style.height = bar2.style.height;
            bar2.style.height = h1;
            
            j--;
        }
    }
    for(let i=0;i<val.length;i++){
        let id = "bar"+i;
        document.getElementById(id).style.backgroundColor = "green";
        document.getElementById(id).style.color = "white";
        await wait(200);
    }
    enable_buttons()
}


method.addEventListener("change", ()=>{
    removeTerminal();
    removeAllChildNodes(bar_container);
    let new_arr = arr.sort(()=>Math.random()-0.5) 
    createBars(new_arr);
    input_field.value = new_arr.toString().replaceAll(',', ' ') 

    let heading = document.querySelector("h1");
    if(method.value === "bubble_sort"){
        heading.innerText = "Visualize Bubble Sort"
    }
    if(method.value === "selection_sort"){
        heading.innerText = "Visualize Selection Sort"
    }
    if(method.value === "insertion_sort"){
        heading.innerText = "Visualize Insertion Sort"
    }
})

input_field.addEventListener("change", ()=>{
    removeTerminal();
    removeAllChildNodes(bar_container);
    arr = getInput();
    createBars(arr);
})

random_btn.addEventListener("click", ()=>{
    removeTerminal();
    removeAllChildNodes(bar_container);
    arr = generateArray();

    let input = arr.toString();
    input_field.value = input.replaceAll(',', ' ');
    createBars(arr);
})

sort_btn.addEventListener("click", ()=>{
    removeAllChildNodes(bar_container)
    createBars(arr)
    terminal.innerText = "Terminal\n-----------";
    terminal.classList.add("terminal");

    if(method.value === "bubble_sort"){
        bubbleSort(arr);
    }
    if(method.value === "selection_sort"){
        selection_sort(arr);
    }
    if(method.value === "insertion_sort"){
        insertion_sort(arr);
    }
})