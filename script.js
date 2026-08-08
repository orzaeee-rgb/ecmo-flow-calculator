/*
 * Goal ECMO Flow Calculator
 *
 * Copyright (c) 2026 Paveeporn S.
 *
 * Licensed under the MIT License.
 */

function calculateBSA(height, weight) {
    return Math.sqrt((height * weight) / 3600);
}

function calculateFlow(bsa, ci, percent) {
    return bsa * ci * (percent / 100);
}

function calculateECMO() {

    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const ecmoMachine = document.getElementById("ecmoMachine").value;

    if (height <= 0 || weight <= 0) {
        alert("กรุณากรอกข้อมูลให้ถูกต้อง");
        return;
    } 
    
    if (ecmoMachine === "") {
        alert("กรุณาเลือกเครื่อง ECMO");
        return;
    }

    // Mosteller BSA formula
    const bsa = calculateBSA(height, weight);

    saveHistory(height, weight, bsa, ecmoMachine);

    const cardiacIndexes = [2.4, 2.6, 2.8];

    let result = `
    <div class="report-header">
        <h2>Goal ECMO Flow Calculator</h2>
    </div>

    <div class="report-cards">

    <div class="info-card">
        <span>Height</span>
        <strong>${height} cm</strong>
    </div>

    <div class="info-card">
        <span>Weight</span>
        <strong>${weight} kg</strong>
    </div>

    <div class="info-card">
        <span>BSA</span>
        <strong>${bsa.toFixed(2)} m²</strong>
    </div>

    <div class="info-card">
        <span>ECMO Machine</span>
        <strong>${ecmoMachine}</strong>
    </div>

</div>
`;

result += `
<table class="result-table">
    <thead>
        <tr>
            <th>Flow %</th>
            <th>CI 2.4</th>
            <th>CI 2.6</th>
            <th>CI 2.8</th>
        </tr>
    </thead>
    <tbody>
`;

for (let percent = 10; percent <= 100; percent += 10) {
    result += `
        <tr>
            <td>${percent}%</td>
            <td>${calculateFlow(bsa, 2.4, percent).toFixed(2)}</td>
            <td>${calculateFlow(bsa, 2.6, percent).toFixed(2)}</td>
            <td>${calculateFlow(bsa, 2.8, percent).toFixed(2)}</td>
        </tr>
    `;
}

result += `
    </tbody>
</table>
`;

    document.getElementById("result").innerHTML = result;

}
 
function printResult() {

    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const ecmoMachine = document.getElementById("ecmoMachine").value;

    if (height === "" || weight === "") {
        alert("กรุณากรอก Height และ Weight");
        return;
    }

    if (ecmoMachine === "") {
        alert("กรุณาเลือกเครื่อง ECMO");
        return;
    }

    calculateECMO();
    window.print();

}

document.getElementById("btnCalculate")
    .addEventListener("click", calculateECMO);

document.getElementById("btnPrint")
    .addEventListener("click", printResult);

function saveHistory(height, weight, bsa, machine){

    const history =
        JSON.parse(localStorage.getItem("ecmoHistory")) || [];

    history.push({
        datetime: new Date().toLocaleString(),
        height: height,
        weight: weight,
        bsa: bsa.toFixed(2),
        machine: machine
    });

    localStorage.setItem(
        "ecmoHistory",
        JSON.stringify(history)
    );

}
