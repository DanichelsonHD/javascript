var numbersQuantity = 10;
var averageQuantity = 3;
let numbersList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let averageList = [];
let whiteList;

calculateAverage();

function calculateAverage ()
{
    validate();
    getWantedNumbers();
    while(canCalculate())
    {
        calcAverage_pushNumber();
        whiteList.shift();
    }
    console.log(averageList);
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
}
