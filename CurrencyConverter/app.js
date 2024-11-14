let BaseUrl = "https://latest.currency-api.pages.dev/v1/currencies"


let dropdowns = document.querySelectorAll(".dropdown select")
let btn = document.querySelector("form button")
let fromCurr = document.querySelector(".from select")
let toCurr = document.querySelector(".to select")
let msg =document.querySelector(".msg")

window.addEventListener("load", ()=>{ // when window will load then it will automatically show convertion of 1USD to INR
   updateExchangeRate()
})

// making the list of all the currency codes in the select element
for (let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement('option')
        newOption.innerText=currCode
        newOption.value = currCode
        select.append(newOption)
        if(select.name ==="from" && currCode === "USD"){
            newOption.selected = "selected"
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected"
        }
    }

    select.addEventListener("change" , (evt)=>{
        updateFlag(evt.target)//passing the select element
    })
}

const updateFlag = (element)=>{
    let currCode = element.value // taking the value of selected currency from the option element(Currency which you selected in the browser will return it's value)
    let newimg = element.parentElement.firstElementChild //selecting the img tag to update the flag
    currCode = countryList[currCode] // storing the country code in the currCode variable
    newimg.src=`https://flagsapi.com/${currCode}/flat/64.png` //Changing the flag according to the country selected
}

btn.addEventListener("click",  (evt)=>{
    evt.preventDefault()
    updateExchangeRate()

})

//Logic when i will click on button
async function updateExchangeRate(){
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value
    
    if(amtVal === "" || amtVal<1){
        amtVal=1
        amount.value="1"
    }
   
    let NewfromCurr = fromCurr.value.toLowerCase()
    let NewtoCurr = toCurr.value.toLowerCase()
    const URL = `${BaseUrl}/${NewfromCurr}.json`
 
    let response = await fetch(URL)
    let data = await response.json()
    let rate = data[NewfromCurr][NewtoCurr]
    let finalamount = amtVal * rate
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalamount} ${toCurr.value}`
}