const forms = document.querySelector(".forms")
const userForm = document.querySelector(".forms .student")
const adminForm = document.querySelector(".forms .admin")


const user = () => {
    forms.classList.remove("hidden")
    adminForm.classList.add("hidden")
    userForm.classList.remove("hidden")
}
const admin = () => {
    forms.classList.remove("hidden")
    userForm.classList.add("hidden")
    adminForm.classList.remove("hidden")
}

document.getElementById("form-close").addEventListener("click", () => {
    forms.classList.add("hidden")
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




//Routes
const signupForm = document.getElementById('userSignup');

signupForm.addEventListener('submit', function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataJSON = {};
    const btn = document.getElementById("user-register-btn")
    for (const [key, value] of formData.entries()) {
        formDataJSON[key] = value;
    }
    if (!formDataJSON.fullname.trim()) {
        alert("Please enter your fullname.");
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
            window.location.href = "/";
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
            window.location.href = "/";
        }).catch((error) => {
            console.log(error.response.data);
            console.log(error.response.status);
        }).finally(() => {
            btn.removeAttribute("disabled");
        });
});

const logout = () => {
    axios.post("/users/logout")
        .then(() => {
            window.location.href = "/";
        }).catch((error) => {
            alert("Something went wrong.");
        })
}


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
        })
        .catch((error) => {
            console.log(error.response.data);
            console.log(error.response.status);
        })
        .finally(() => {
            btn.removeAttribute("disabled");
        });
})