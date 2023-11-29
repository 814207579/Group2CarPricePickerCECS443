const _ = require('lodash');
const $ = require("jquery");
const fs = require("fs");

const data = require("./../data/car-models.json");

/*
_.forEach(data,function(carTypes) {
    console.log("Make:", carTypes.brand)
    process.stdout.write("Models: ")
    let printString = "";
    _.forEach(carTypes.models, function(modelName) {
        printString+= modelName + ", "
    })
    printString.trimEnd()
    console.log(printString, "\n")
})*/

function getMakes() {
    let returnArr = []
    _.forEach(data, function(carTypes) {
        returnArr.push(carTypes.brand)
    })

    return returnArr
}

function getModels(make) {
    let returnArr = []
    _.forEach(data, function(carTypes) {
        if (carTypes.brand === make) {
            returnArr.push(carTypes.models)
        }
    })

    return returnArr
}

window.createMakeSelect = function createMakeSelect(documentID) {
    const data = getMakes()
    const selectElement = document.getElementById(documentID)
    _.forEach(data, function(make) {
        let option = document.createElement("option")
        option.val = make
        option.innerHTML = make
        selectElement.add(option)
    })
}

window.updateSecondaryOptions = function updateSecondaryOptions(documentID, inputModel) {
    //Clear out the previous option set first
    $("#" + documentID).empty()
    const data = getModels(inputModel)
    const selectElement = document.getElementById(documentID)
    _.forEach(data.toString().split(","), function(model) {
        let option = document.createElement("option")
        option.val = model
        option.innerHTML = model
        selectElement.add(option)
    })
}

window.updateLogo = function updateLogo(documentID, inputModel) {
    //regex to replace all " " with -
    $("#" + documentID).attr('src', "https://car-logos.org/wp-content/uploads/2022/08/" + inputModel.replace(/ /g, '-').toLowerCase() + ".png")
}

window.saveJsonData = function saveJsonData(data, jsonFileName) {
    fs.writeFile(jsonFileName, data, function() {
    });
}