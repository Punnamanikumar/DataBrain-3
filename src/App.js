import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [userInput, setUserInput] = useState("");
  useEffect(() => {
    axios
      .get("https://reqres.in/api/users")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const deleteUser = (id, first_name) => {
    var newUserData = data.filter((user) => user.id !== id);
    setData(newUserData);
    alert("Are You sure to Delete " + first_name + " User.");
  };
  const handelSubmit = () => {
    const check = data.some(
      (user) =>
        user.first_name.toLowerCase() === userInput.toLowerCase() ||
        user.last_name.toLowerCase() === userInput.toLowerCase()
    );
    console.log(check);
    if (userInput.length !== 0) {
      if (check === true) {
        alert("User Already Exits " + userInput.toUpperCase());
      } else {
        alert("OOPS !! No User Found with Name : " + userInput);
      }
    } else {
      alert("Please Give Input to Search.");
    }
  };
  return (
    <div className="App">
      <center>
        <h1>Task - 3 API Operations</h1>
        <div className="box">
          <input onChange={(e) => setUserInput(e.target.value)} placeholder="Search User"/>
          <input type="submit" onClick={handelSubmit} /><br />
          {data.map((res) => (
            <div className="data" key={res.id}>
              <span>{res.first_name} {res.last_name}</span>
              <button onClick={() => deleteUser(res.id, res.first_name)}>Delete</button>
            </div>
          ))}
        </div>
      </center>
    </div>
  );
}

export default App;
