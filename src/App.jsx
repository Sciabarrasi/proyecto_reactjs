import './App.css';
import Header from './components/header';
import ItemListContainer from './components/main/ItemListContainer';
import Input from './components/input/inputIndex';
import { useState } from 'react';


function App() {
  const [task, setTask] = useState('');
  const [active, setActive] = useState('');


  const onChange = (event) =>{
    const value = event.target.value;
    setTask(value);
  }

  const onFocus = () =>{
    setActive(true);
  }
  const onBlur = () =>{
    setActive(false)
  }

  const inputClass = `container ${active ? 'active' : ''}`

  return (
      <div>
        <Header />
        <ItemListContainer greeting="Compra realizada"/>

        <div style={{width: '200px', padding: '1rem'}}>
          <Input placeholder="Add a new task" id='task' required={true} name="task name" onchange={onChange} onFocus={onFocus} onBlur={onBlur} className={inputClass}/>
        </div>

      </div>
  )
}

export default App