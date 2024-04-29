function throttle(callback, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        callback(...args);
    };
}
function SearchFunction(event, location) {
    location.document.querySelector(location)
    let value = event.target.value;
    axios.get("search", {
        params: {
            value: value
        }
    })
        .then(response => {
            // Handle the response
        })
        .catch(error => {
            // Handle errors
        });


}

throttle(SearchFunction, 500)