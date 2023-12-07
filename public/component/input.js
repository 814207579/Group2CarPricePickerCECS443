document.getElementById('addCarForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Collect input values
    const carData = {
        trim: document.getElementById('trim').value,
        year: document.getElementById('year').value,
        make: document.getElementById('make').value,
        model: document.getElementById('model').value
    };

    // Convert car data to JSON string
    const carDataJson = JSON.stringify(carData);

    // Trigger download
    downloadObjectAsJson(carDataJson, "carData");
});

function downloadObjectAsJson(exportObj, exportName) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportObj);
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for Firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}