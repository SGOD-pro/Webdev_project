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
    if (checkedValues.length === 0) {
        alert('Please select days')
    }
    if (jsonData.speciality === "null") {
        alert('Please select speciality')
    }
    if (jsonData.experience === "null") {
        alert('Please select speciality')
    }
    const data = { ...jsonData, days: checkedValues }
    console.log(data);
    const dr = document.getElementById("add-dr-btn");
    dr.setAttribute("disabled", true);
    dr.innerHTML = "Saving.. <i class='bx bx-loader bx-spin text-md'></i>"
    axios.post("/admin/newdoctors", data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
        console.log(response.data);
        window.location.href = "/admin";
    }).catch(error => {
        console.log(error.response.data);
        ShowToast(error.response.data, "danger")

        console.log(error.response.status);
    }).finally(() => {
            dr.removeAttribute("disabled");
            dr.innerHTML = "Submit"
        });
})

const logout = () => {
    axios.get("/admin/logout")
        .then((response) => {
            window.location.href = "/"

        }).catch((error) => {
            ShowToast(error.response.data, "danger")
        })
}
function deleteDoc(event) {
    const button = event.target;
    const id = button.getAttribute("data-id");
    console.log(id);
    axios.get(`/admin/deletedoctor/${id}`)
        .then((response) => {
            window.location.href = "/admin"
            console.log(response);
        }).catch((error) => {
            ShowToast(error.response.data, "danger")
        });
}
