var numbersQuantity = 10;
var averageQuantity = 3;
var x = document.querySelector("#xNumber");
var y = document.querySelector("#yNumber");
var newNumberList = document.querySelector("#newNumber");
let numbersList = [3,18, 6, 21, 9, 24, 12, 33, 15, 27, 36, 30];
let averageList = [];
let whiteList;

function calculateAverage ()
{
    setNumbers();
    document.querySelector("#list").innerHTML = "[" + numbersList + "]";    
    validate();
    getWantedNumbers();
    while(canCalculate())
    {
        calcAverage_pushNumber();
        whiteList.shift();
    }
    writeOnConsole();
    document.querySelector("#result").innerHTML = "[" + averageList + "]";
}

function canCalculate ()
{   
    return whiteList.length > averageQuantity-1; 
}

function calcAverage_pushNumber ()
{
    var sum = 0;
    for(var i = 0; i < averageQuantity; i++) 
    {
        var currentNumber = i;
        sum += whiteList[currentNumber];
    }
    averageList.push(sum / averageQuantity);

}

function getWantedNumbers ()
{
    whiteList = numbersList.slice(0, numbersQuantity);
}

function  validate ()
{
    if(numbersList == null || typeof(numbersList) != "object") throw new Error("Lista Inválida");
    if(numbersQuantity == null || typeof(numbersQuantity) != "number") throw new Error("Quantia de Números Inválida");
    if(averageQuantity == null || typeof(averageQuantity) != "number") throw new Error("Número da Média Inválido");

    if(numbersQuantity > numbersList.length) throw new Error("Quantia de Números maior do que os presentes na Lista");
    if(numbersQuantity < averageQuantity) throw new Error("Quantia de Números menor do que a Média");
    if(averageQuantity > numbersList.length) throw new Error("Média maior do que a Lista");
}

function writeOnConsole ()
{
    console.clear();
    console.log("X: " + numbersQuantity);
    console.log("Y: " + averageQuantity);
    console.log("Lista original: " + numbersList);
    console.log("Lista de médias: " + averageList);
}

function setNumbers() 
{
    var numberX = parseInt(x.value);
    var numberY = parseInt(y.value);
    var numberList = parseInt(newNumberList.value);
    
    calculateNewNumbers(numberX, numberY, numberList);

    averageList = [];
    whiteList = [];
}

function calculateNewNumbers(numberX, numberY, numberList)
{
    if(!isNaN(numberX)) numbersQuantity = numberX; else numbersQuantity = 10;
    if(!isNaN(numberY)) averageQuantity = numberY; else averageQuantity = 3;
    if(!isNaN(numberList)) numbersList.push(numberList); 
    if(numbersList == null && typeof(numbersList) != "object") numbersList = [3,18, 6, 21, 9, 24, 12, 33, 15, 27, 36, 30];
}

function resetList()
{
    numbersList = [];
}
