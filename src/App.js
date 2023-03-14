import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import { FaAlignJustify } from "react-icons/fa";
import { type } from "@testing-library/user-event/dist/type";
import { clear } from "@testing-library/user-event/dist/clear";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || name.trim() == "") {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      // fdsg
    } else {
      showAlert(true, "success", "item added");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "list cleared");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");

    setList(
      list.filter((e) => {
        return e.id !== id;
      })
    );
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery Buds</h3>
        <div className="form-control">
          <input
            value={name}
            type="text"
            className="grocery"
            placeholder="e.g. - eggs"
            onChange={(e) => setName(e.target.value)}
          />
          <button className="submit-btn" type="submit">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} />
          <button className="clear-btn" onClick={clearList}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
