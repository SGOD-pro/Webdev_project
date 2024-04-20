

const form = document.querySelector(".forms")
const userForm = document.querySelector(".forms .student")
const adminForm = document.querySelector(".forms .admin")
let c = 0
function ShowToast(error, type) {
    var parent = document.getElementById('toast-div');
    parent.style.display = "block"
    let toast = document.createElement("div")
    toast.style.opacity = "1"
    toast.innerHTML = ` <div class="my-toast rounded-2 bg-${type} text-${type} p-2 my-1 py-1 border border-${type} bg-opacity-25 flex gap-2 items-center">
${error}
<span class="material-symbols-outlined text-lg">
    disabled_by_default
    </span>
</div>`
    parent.appendChild(toast)
    setTimeout(() => {
        parent.removeChild(toast)
    }, 4000 + c * 1000);
    c += 1
}
const user = () => {
    form.classList.remove("hidden")
    adminForm.classList.add("hidden")
    userForm.classList.remove("hidden")
}
const admin = () => {
    form.classList.remove("hidden")
    userForm.classList.add("hidden")
    adminForm.classList.remove("hidden")
}

document.getElementById("form-close").addEventListener("click", () => {
    form.classList.add("hidden")
    if (!adminForm.classList.contains("hidden")) {
        adminForm.classList.add("hidden")
    }
    if (!userForm.classList.contains("hidden")) {
        userForm.classList.add("hidden")
    }
})
const student = document.querySelector(".forms .student")
const showLogin = () => {
    student.style.transform = "translateX(-0%)"
}
const showSignup = () => {
    student.style.transform = "translateX(-100%)"
}

// const toastLiveExample = document.querySelector('#page1')
// console.log(toastLiveExample);
// const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

//Routes
const signupForm = document.getElementById('userSignup');

signupForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataJSON = {};
    const btn = document.getElementById("user-register-btn")


    for (const [key, value] of formData.entries()) {
        formDataJSON[key] = value;
    }
    console.log(formDataJSON);

    if (!formDataJSON.fullname.trim()) {
        //alert("Please enter your fullname.");
        ShowToast("Please enter your fullname.", "warning")
        return false;
    }

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(formDataJSON.phoneNumber)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }

    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!emailPattern.test(formDataJSON.email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (formDataJSON.password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }
    btn.setAttribute("disabled", true);
    axios.post("/users/register", formDataJSON)
        .then((response) => {
            window.location.href = "/users";
        }).catch((error) => {
            console.log(error.response.data);
            console.log(error.response.status);
        }).finally(() => {
            console.log("jiii");
            btn.removeAttribute("disabled");
        });
});

const loginForm = document.getElementById('userLogin');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const btn = document.getElementById("user-login-btn")
    btn.setAttribute("disabled", true);
    console.log("hii");
    const formData = new FormData(event.target);

    const formDataJSON = {};
    for (const [key, value] of formData.entries()) {
        formDataJSON[key] = value;
    }
    const { email, password } = formDataJSON;
    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }
    axios.post("/users/login", formDataJSON)
        .then(() => {
            window.location.href = "/users";
        }).catch((error) => {
            console.log(error.response.data);
            console.log(error.response.status);
        }).finally(() => {
            btn.removeAttribute("disabled");
        });
});



document.querySelector(".admin form").addEventListener("submit", function (e) {
    e.preventDefault();
    let formData = new FormData(e.target)
    const btn = document.getElementById("admin-login-btn")
    const formDataJSON = {};
    for (const [key, value] of formData.entries()) {
        formDataJSON[key] = value;
    }
    const { email, password } = formDataJSON;
    console.log(formDataJSON);
    btn.setAttribute("disabled", true);
    axios.post("/admin/login", formDataJSON)
        .then((response) => {
            console.log(response);
            window.location.href = "/admin";

        })
        .catch((error) => {
            console.log(error.response.data);
            console.log(error.response.status);
        })
        .finally(() => {
            btn.removeAttribute("disabled");
        });
})