//Doctor register form
document.querySelector('#add-btn').addEventListener('click', function (e) {
    document.querySelector('.form-container').classList.toggle("active")
})
document.querySelector(".form-container>span").addEventListener('click', function (e) {
    document.querySelector('.form-container').classList.remove("active")
})

const showDropdown = () => {
    document.querySelector("#dropdown").classList.toggle("active")
}
document.querySelector("#add-doctors").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = document.getElementById('add-doctors');
    const formData = new FormData(form);
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const checkedValues = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkedValues.push(checkbox.value);
        }
    });
    console.log(checkedValues);
    if (checkedValues.length === 0 ) {
        alert('Please select days')
    }
    const data = { ...jsonData, days: checkedValues }
    console.log(data);
    axios.post("/admin/newdoctors", data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
        console.log(response.data);
    }).catch(error => {console.log(error);})
})