import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [option, setOption] = useState("");
    const handleOptionChange = (e) => {
        setOption(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .get("/download-excel", { params: { option } })
            .then((res) => {
                const blob = new Blob([res.data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                const url = window.URL.createObjectURL(blob);
                window.open(url);
            })
            .catch((err) => console.log(err));
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Select an option:
                    <select value={option} onChange={handleOptionChange}>
                        <option value="">-- Select an option --</option>
                        <option value="1">Admin</option>
                        <option value="2">User</option>
                        <option value="3">Random</option>
                    </select>
                </label>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default App;
