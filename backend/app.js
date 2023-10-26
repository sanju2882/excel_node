const express = require("express");
const mysql = require("mysql");
const Exceljs = require("exceljs");
const app = express();
app.use(express.json());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cron_db",
});
app.get("/download-excel", (req, res) => {
    const selectedRoll = req.query.option;
    const workbook = new Exceljs.Workbook();
    const worksheet = workbook.addWorksheet("data");
    const sql = "SELECT * FROM users WHERE roll=?;";
    db.query(sql, selectedRoll, (err, result) => {
        if (err) {
            console.log("error fetching data");
        }
        const headers = Object.keys(result[0]);
        worksheet.addRow(headers);
        result.forEach((row) => {
            const rowData = headers.map((header) => row[header]);
            worksheet.addRow(rowData);
        });
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=filtered-data.xlsx"
        );

        workbook.xlsx.write(res, () => {
            res.end();
        });
    });
});
app.listen(3000, () => {
    console.log("3000 running");
});
