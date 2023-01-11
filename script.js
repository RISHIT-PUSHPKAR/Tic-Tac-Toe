"use strict"


/*------------------------- ELEMENT SELECTION --------------------*/ 
const imageX = document.querySelector('.x-img');
const imageO = document.querySelector('.o-img');

const s1 = document.querySelector('.square-1'); 
const s2 = document.querySelector('.square-2'); 
const s3 = document.querySelector('.square-3'); 
const s4 = document.querySelector('.square-4'); 
const s5 = document.querySelector('.square-5'); 
const s6 = document.querySelector('.square-6'); 
const s7 = document.querySelector('.square-7'); 
const s8 = document.querySelector('.square-8'); 
const s9 = document.querySelector('.square-9');

const WinnerPage = document.querySelector('.cover');
const WinnerIcon = document.querySelector('#winner');
const finalStatePage = document.querySelector("#final-state");

const xScore = document.querySelector('.x-score');
const oScore = document.querySelector('.o-score');

const resetBtn = document.querySelector('.restart-btn');


/*-------------------- LOGIC IMPLEMENTATION ----------------*/
resetBtn.addEventListener('click',resetFunction);

let resultArray_x =[];
let resultArray_o =[];
const winingCondition_array = [[1,5,9],[1,2,3],[1,4,7],[3,6,9],[7,8,9],[3,5,7],[4,5,6],[2,5,8]];

let turn = true;

xScore.textContent = 0;
oScore.textContent = 0;

let array_of_squares = document.querySelectorAll('.square');

array_of_squares.forEach(sqr => {
    sqr.addEventListener('click',clickFunc,{once:true})})
    



/*------------------------- LOGICAL FUNCTIONS---------------------*/

function clickFunc(e){
    let currSquare = e.target;
    let currTurn = turn ? imageX:imageO;
    displayTurn(currSquare,currTurn);
    winCheck(currSquare,turn,resultArray_x,resultArray_o);
    turn = !turn;
}

function winCheck(currSquare,turn,resultArray_x,resultArray_o){
    let position = Number(currSquare.id);
    turn? resultArray_x.push(position) : resultArray_o.push(position);

    console.log("o :",resultArray_o,"x :",resultArray_x)
    console.log(resultArray_o.length+resultArray_x.length)
    // console.log("x :",resultArray_x)
    // console.log("this is array x :",resultArray_x)
    // resultArray_o.length>=5 || resultArray_x.length>=5
    if(resultArray_o.length>2 || resultArray_x.length>2){
        for(let i = 0;i<winingCondition_array.length;i++){

            let ow =winingCondition_array[i].every(ele => resultArray_o.includes(ele));
            console.log('ow :',ow)
            let xw = winingCondition_array[i].every(ele => resultArray_x.includes(ele));
            console.log('xw :',xw)
        
            if( resultArray_o.length + resultArray_x.length ==9){
                if(xw==false && ow==false){
                    console.log('draw');
                    resetFunc()
                    WinnerIcon.textContent = "Draw";
                    WinnerIcon.style.color = "white";
                    finalStatePage.textContent = "";
                    setTimeout(displayCover,1000);
                    WinnerPage.classList.remove("hidden")                    
                    break;
                }else if(xw){
                    console.log('x wins')
                    let curr_sc = Number(xScore.textContent);
                    curr_sc += 1;
                    xScore.textContent = curr_sc;
                    resetFunc()
                    WinnerIcon.textContent = "X";
                    WinnerIcon.style.color = "red";
                    finalStatePage.textContent = "wins";   
                    setTimeout(displayCover,1000);
                    WinnerPage.classList.remove("hidden")                    
                    break;
                }
                else if(ow){
                    console.log('o wins');
                    let curr_sc = Number(oScore.textContent);
                    curr_sc += 1;
                    oScore.textContent = curr_sc;
                    resetFunc()
                    WinnerIcon.textContent = "X";
                    WinnerIcon.style.color = "red";
                    finalStatePage.textContent = "wins"; 
                    setTimeout(displayCover,1000);
                    WinnerPage.classList.remove("hidden")
                    break;
                }
                // break;
            }else if(xw){
                let curr_sc = Number(xScore.textContent);
                curr_sc += 1;
                xScore.textContent = curr_sc;
                console.log('x wins')
                resetFunc() 
                WinnerIcon.textContent = "X";
                WinnerIcon.style.color = "red";
                finalStatePage.textContent = "wins"; 
                setTimeout(displayCover,1000);
                WinnerPage.classList.remove("hidden")
                break;
            }else if(ow){
                console.log('o wins')
                let curr_sc = Number(oScore.textContent);
                curr_sc += 1;
                oScore.textContent = curr_sc;
                resetFunc()
                WinnerIcon.textContent = "O";
                WinnerIcon.style.color = "blue"; 
                finalStatePage.textContent = "wins";
                setTimeout(displayCover,1000);
                WinnerPage.classList.remove("hidden")
                    break;
            }
        }
        



        
    }
}

function displayCover(){
    WinnerPage.classList.add("hidden")
}


function displayTurn(currSquare,currTurn){ 
    array_of_squares.forEach(s=>s.classList.remove(turn?'hov-b':'hov-r'))
    let currTurnClone = currTurn.cloneNode(true);
    currTurnClone.classList.remove('hidden');
    currSquare.append(currTurnClone);
    currSquare.classList.add('hov-over')
    array_of_squares.forEach(s=>s.classList.add(turn?'hov-b':'hov-r'))
    array_of_squares.forEach(s=>s.classList.remove(!turn?'hov-b':'hov-r'))
}

function resetFunc(){
    for(let i=0;i<array_of_squares.length;i++){
        array_of_squares[i].innerHTML = '';
        array_of_squares[i].style.cursor ='pointer';
        array_of_squares[i].classList.remove('hov-over');
        resultArray_x.length = 0;
        resultArray_o.length = 0;

    }

    array_of_squares.forEach(sqr => {
        sqr.addEventListener('click',clickFunc,{once:true});

    })
    
}

function resetFunction(){
    for(let i=0;i<array_of_squares.length;i++){
        array_of_squares[i].innerHTML = '';
        array_of_squares[i].style.cursor ='pointer';
        array_of_squares[i].classList.remove('hov-over');
        resultArray_x.length = 0;
        resultArray_o.length = 0;
        xScore.textContent = 0;
        oScore.textContent = 0;

    }

    array_of_squares.forEach(sqr => {
        sqr.addEventListener('click',clickFunc,{once:true});

    })
    
}

