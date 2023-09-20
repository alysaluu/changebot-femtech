const destination = document.querySelector("#form");

let firstName = "";
let lastName = "";
let state = "";

destination.addEventListener("submit", (e) => {
    // e.preventDefault();
    console.log("inside event listener");
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    state = document.getElementById("state").value;

    const obj = {
        "firstName": firstName,
        "lastName": lastName,
        "state": state
    }

    chrome.storage.sync.set(obj, function () {
        const alert = document.createElement("b")
        alert.append("Success!")
        document.querySelector("body").append(alert)
        alert.style.color = "rbg(7,7,6)"
    })

})
