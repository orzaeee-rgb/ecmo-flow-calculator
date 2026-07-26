/*
 * ECMO Flow Calculator
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

    const cardiacIndexes = [2.4, 2.6, 2.8];

    let result = `
`;

result += `
<div class="report-info">
    <div><b>Height:</b> ${height} cm</div>
    <div><b>Weight:</b> ${weight} kg</div>

    <div><b>BSA:</b> ${bsa.toFixed(2)} m²</div>
    <div><b>ECMO Machine:</b> ${ecmoMachine}</div>
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
