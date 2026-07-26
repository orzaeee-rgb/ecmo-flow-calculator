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
  <div class="report-header">
    <h2>ECMO Flow Calculator</h2>
    <div class="report-subtitle">
      Body Surface Area × Cardiac Index
    </div>
  </div>
`;

result += "<p><b>Height:</b> " + height + " cm</p>";
result += "<p><b>Weight:</b> " + weight + " kg</p>";
result += "<p><b>BSA:</b> " + bsa.toFixed(2) + " m²</p>";
result += `<p><b>ECMO Machine:</b> ${ecmoMachine}</p>`;

    result += "</table>";

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
