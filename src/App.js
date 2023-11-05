import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid


let count = 1

const initialValue = {
  fname: "",
  lname: "",
  id: uuidv4(),

}

function App() {
  const [values, setValues] = useState(initialValue);
  const [alldata, setAlldata] = useState([]);
  const [receivedId, setReceivedId] = useState("");



  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
    // console.log("first")
  }

  const handlesubmit = () => {
    console.log(values)
    const newEntry = {
      ...values,
      id: uuidv4(),
    };
    setAlldata([...alldata, newEntry]);
    console.log(alldata)
    setValues({
      fname: '',
      lname: '',
      id: uuidv4(),
    })
  }

  const handleEdit = (e) => {
    console.log(e)
    setReceivedId(e.id);
    setValues({
      fname: e.fname,
      lname: e.lname,
      // id: uuidv4(),
    })
  }

  const handleUpdate = () => {
    console.log("Update")
    setValues({
      fname: '',
      lname: '',
      id: uuidv4(),
    })
    setReceivedId("")
  }

  const handleOk = () => {
    if (receivedId == "") {
      handlesubmit();
      alert("submit")
    }

    else {
      handleUpdate()
      alert("update")

    }
  }

  const handleDelete = (e) => {
    // console.log("delete")
    let clonedata = alldata
    clonedata = clonedata.filter((item) => item.id !== e)
    setAlldata(clonedata)
    console.log("deleted row with id :", e);
  }

  return (
    <div className="App">
      <input
        name='fname'
        placeholder='First Name'
        value={values.fname}
        onChange={handleChange} />
      <br></br>
      <input
        name='lname'
        placeholder='Last Name'
        value={values.lname}
        onChange={handleChange} />
      <br></br>
      <button onClick={handleOk}>SUBMIT</button>

      <table>
        <tr>
          <th>fname</th>
          <th>lname</th>
        </tr>
        {alldata.map((i) => {
          return (
            <tr key={i.id}>
              <td>{i.fname}</td>
              <td>{i.lname}</td>
              <td><button onClick={() => handleDelete(i.id)}>DELETE</button></td>
              <td><button onClick={() => handleEdit(i)}>Edit</button></td>
            </tr>
          )
        })}
      </table>
    </div >
  );
}

export default App;
