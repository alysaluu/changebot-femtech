console.log("from foreground")

const dict = { 'NEW YORK': [['Sen. Richard Shelby', 'Sen.Shelby@opencongress.org'], ['Sen. Jeff Sessions', 'Sen.Sessions@opencongress.org'], ['Rep. Bradley Byrne', 'Rep.Byrne@opencongress.org'], ['Rep. Terri Sewell', 'Rep.Sewell@opencongress.org'], ['Rep. Gary Palmer', 'Rep.Palmer@opencongress.org'], ['Rep. Mike Rogers', 'Rep.Mikerogers@opencongress.org'], ['Rep. Martha Roby', 'Rep.Roby@opencongress.org'], ['Rep. Mo Brooks', 'Rep.Brooks@opencongress.org'], ['Rep. Robert Aderholt', 'Rep.Aderholt@opencongress.org']] };

function createButton() {
    const first = document.createElement('button');
    first.innerText = "Send to My Rep/Sen";
    first.id = "sendCodeButton";
    first.classList.add("sendCodeButton");

    first.addEventListener('click', () => {
        let questionTitle = document.querySelector('.mtl').innerText;
        let content = document.getElementsByClassName("rte js-description-content")[0].innerText.replace(/[0-9]+\n/g, '');
        let location = window.location.href;
        popupWindow(questionTitle, content, location, "800px", "600px");
    });

    return first;
}

setTimeout(function () {
    if (!document.querySelector('#sendCodeButton')) {
        document.querySelector('.sc-AxheI').appendChild(createButton());
    }
}, 2000)


chrome.storage.sync.get("firstName", function (data) {
    // console.log(data.destination)
    firstName = data.firstName;
    console.log(firstName);
    return firstName;
})

chrome.storage.sync.get("lastName", function (data) {
    // console.log(data.destination)
    lastName = data.lastName;
    console.log(lastName);
    return lastName;
})

chrome.storage.sync.get("state", function (data) {
    // console.log(data.destination)
    state = data.state.toUpperCase();
    email = dict[state][0][1];
    repName = dict[state][0][0];
    console.log(email, state);
    return email;
})


function popupWindow(questionTitle, content, w, h) {

    url = `https://mail.google.com/mail/u/0/?view=cm&ui=2&tf=0&fs=1&to=${email}&su=` + questionTitle + "&body=" + encodeURIComponent("Dear " + repName + ',' + '\n\n'

    + `My name is ${firstName} and I am a concerned citizen who resides in your region. I feel strongly about this cause and have attached a description of a petition I support:`

    + '\n' + location + '\r\n\r\n' + content + '\n\n' + "Sincerely," + '\n' + firstName + ' ' + lastName);
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    var win = window.open(url, 'Title', 'toolbar = no, location = no, directories = no, status = no, menubar = no, scrollbars = no, resizable = no, copyhistory = no, width = ' + w + ', height = ' + h + ', top = ' + top + ', left = ' + left);
    win.focus();
}


