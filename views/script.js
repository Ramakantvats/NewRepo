const container = document.querySelector(".container")
const LoginLink = document.querySelector(".SignIn-Link")
const RegisterLink = document.querySelector(".SignUp-Link")
RegisterLink.addEventListener("click",()=>{
    container.classList.add("active")
})
LoginLink.addEventListener("click",()=>{
    container.classList.remove("active")
})