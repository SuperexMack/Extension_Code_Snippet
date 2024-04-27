function saveTheData(title, code) {
    chrome.storage.local.get("savedData", function (result) {
        let getTheData = result.savedData || [];

        getTheData.push({ title, code });

        chrome.storage.local.set({ "savedData": getTheData }, function () {
            console.log("Data saved successfully");
            saveToLocal();
        });
    });
}

// used to save the data

function saveToLocal() {
    chrome.storage.local.get("savedData", function (result) {
        let getTheData = result.savedData || [];
        displayData(getTheData);
    });
}

// used to display the data

function displayData(savedData) {
    let saveTheExistingData1 = document.querySelector(".saved-data-list1");
    // let saveTheExistingData2 = document.querySelector(".saved-data-list2");


    saveTheExistingData1.innerHTML = "";
    // saveTheExistingData2.innerHTML = "";

    savedData.forEach((item) => {
        let createElement1 = document.createElement("li");
        let createElement2 = document.createElement("li");
        let HrLine = document.createElement("hr");
        createElement1.innerText = "Title -----    " + item.title;
        createElement2.innerText = "Code -----     " + item.code;

        saveTheExistingData1.appendChild(createElement1);
        saveTheExistingData1.appendChild(createElement2);
        saveTheExistingData1.appendChild(HrLine);
    });
}

// used to clear the data

function clearData() {
    chrome.storage.local.remove("savedData", function () {
        console.log("Data has been cleared");
        saveToLocal();
    });
}


document.getElementById("paste-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.querySelector(".pasted-data1").value;
    const code = document.querySelector(".pasted-data2").value;
    saveTheData(title, code);
    saveToLocal();
})

// function to clear the data
document.addEventListener("DOMContentLoaded", function () {
    saveToLocal();
    document.getElementById("clear-button").addEventListener("click", function () {
        clearData();
    });
});
