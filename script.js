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

    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;

    if (!height || !weight) {
        alert("กรุณากรอกข้อมูลให้ถูกต้อง");
        return;
    }

    const bsa = calculateBSA(Number(height), Number(weight));

    const data = [
        ["ECMO Flow Calculator"],
        [],
        ["Height (cm)", height],
        ["Weight (kg)", weight],
        ["BSA (m²)", bsa.toFixed(2)],
        [],
        ["% Flow","CI 2.4","CI 2.6","CI 2.8"]
    ];

    const cardiacIndexes = [2.4,2.6,2.8];

    for(let percent=10; percent<=100; percent+=10){

        let row = [percent + "%"];

        cardiacIndexes.forEach(function(ci){
            row.push(calculateFlow(bsa,ci,percent).toFixed(2));
        });

        data.push(row);
    }

    const worksheet = XLSX.utils.aoa_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "ECMO");

    XLSX.writeFile(workbook,"ECMO_Flow_Calculator.xlsx");

} //

document.getElementById("btnCalculate")
    .addEventListener("click", calculateECMO);

document.getElementById("btnExport")
    .addEventListener("click", exportExcel);
