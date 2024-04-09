//Doctor register form
console.log("kii");
document.querySelector('#add-btn').addEventListener('click', function (e) {
    console.log("hiii");
    document.querySelector('.form-container').classList.toggle("active")
})
document.querySelector(".form-container>span").addEventListener('click', function (e){
    document.querySelector('.form-container').classList.remove("active")

})