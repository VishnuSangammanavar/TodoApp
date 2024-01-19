import React, { useEffect, useState } from 'react'
import List from './List';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditNoteIcon from '@mui/icons-material/EditNote';

function App() {
  
  const [items, setItems] = useState('')

  const [allItems, setallItems] = useState(
    JSON.parse(localStorage.getItem("todo-list")) || []);

  const [isEditItem, setIsEditItem] = useState(null)  

  const [toggle, setToggle] = useState(false)  

  const inputEvent = (event) => {
    setItems(event.target.value)
  }

  const displayItems = () => {
    if (!items) {
      alert("Enter the item")
    }

    else if (items && toggle) {
      setallItems(
        allItems.map((value) => {
          if (value.id === isEditItem) {
            return {...value, text:items}
          }
          return value
        })
      )

      setToggle(false)
      setItems("")
      setIsEditItem(null)
    }

    else {
      const inputData = { id: Date.now() + "" + Math.floor(Math.random() * 78), text: items }

      setallItems((previous) => {
        return [...previous, inputData];
      })
      // setallItems([...allItems, allInputData]);
      setItems("")
    }    
  }

  const deleteItem = (id) => {
    const updated = allItems.filter((value) => {
      return id!==value.id;
    })
    setallItems(updated)
  }

  const editItem = (id) => {
    const newEditItem = allItems.find((value) => {
      return value.id===id;
    })
    setToggle(true)
    setItems(newEditItem.text)
    setIsEditItem(id)
  }

  useEffect(() => {
    localStorage.setItem("todo-list", JSON.stringify(allItems));
  }, [allItems]);
 
  return (
    <section id='todo-list'>
      <div className="container py-5 d-flex flex-column align-items-center justify-content-center">
        <div className="main-container">
          <h1 className='text-center text-white'>Todo list</h1>
          <div className='d-flex gap-2 align-items-center justify-content-between input-field'>
            <input type="text" name="item" placeholder='Add a new task' value={items} onChange={inputEvent} autoComplete='off' />
            {toggle? 
            <div className="edit" onClick={displayItems}>
              <EditNoteIcon fontSize='large' />
            </div>
            :<div className="add" onClick={displayItems}>
              <button type='submit'>Add</button>
            </div>}
          </div>
          <div className='d-flex flex-column gap-3 align-items-center justify-content-center list-items'>
            {
              allItems.map((val) => {
                return (
                  <List text={val.text} key={val.id} id={val.id} deleteItem={deleteItem} editItem={editItem}/>
                )
              })
            }
          </div>
        </div>
        <button onClick={() => setallItems([])} className='delete-all'>Delete All</button>
      </div>
    </section>
  );
}

export default App;
