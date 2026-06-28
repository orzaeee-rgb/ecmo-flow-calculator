function calculateBSA(height, weight) {
    return Math.sqrt((height * weight) / 3600);
}

function calculateFlow(bsa, ci, percent) {
    return bsa * ci * (percent / 100);
}

function calculateECMO() {

    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);

    if (height <= 0 || weight <= 0) {
        alert("กรุณากรอกข้อมูลให้ถูกต้อง");
        return;
    }

    // Mosteller BSA formula
    const bsa = calculateBSA(height, weight);

    const cardiacIndexes = [2.4, 2.6, 2.8];

    let result = "<h2>Result</h2>";
    result += "<p>BSA = " + bsa.toFixed(2) + " m²</p>";

    result += `
    <table class="result-table">
    <tr>
        <th>% Flow</th>
        <th>CI 2.4</th>
        <th>CI 2.6</th>
        <th>CI 2.8</th>
    </tr>
    `;

    for (let percent = 10; percent <= 100; percent += 10) {

        result += "<tr>";

        result += "<td>" + percent + "%</td>";

        cardiacIndexes.forEach(function(ci){

            const flow = calculateFlow(bsa, ci, percent);

            result += "<td>" + flow.toFixed(2) + "</td>";

        });

        result += "</tr>";
    }

    result += "</table>";

    document.getElementById("result").innerHTML = result;

}
 
function exportExcel() {

    let table = document.querySelector("table");

        if(!table){
        alert("กรุณาคำนวณก่อน");
        return;
    }

    let workbook = XLSX.utils.table_to_book(table);

    XLSX.writeFile(
        workbook,
        "ECMO_Flow_Calculator.xlsx"
    );

    alert("Export Excel สำเร็จ");
}   //

document.getElementById("btnCalculate")
    .addEventListener("click", calculateECMO);

document.getElementById("btnExport")
    .addEventListener("click", exportExcel);
