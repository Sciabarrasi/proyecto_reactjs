import './App.css';
import Header from './components/header';
import ItemListContainer from './components/main/ItemListContainer';
import Input from './components/input/inputIndex';
import Counter from './components/counter';
import Card from './components/products/card/productsIndex';
import { useState, useEffect } from 'react';


function App() {
  const [task, setTask] = useState('');
  const [active, setActive] = useState('');
  const [counter, setCounter] = useState(0);
  const [products, setProducts] = useState([]);

  const isValidCounter = counter > 0;

  const incrementCounter = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const decrementCounter = () => {
    if(isValidCounter) return;
    setCounter((prevCounter) => prevCounter - 1);
  };

  const onChange = (event) =>{
    const value = event.target.value;
    setTask(value);
  };

  const onFocus = () =>{
    setActive(true);
  }
  const onBlur = () =>{
    setActive(false)
  };

  const inputClass = `container ${active ? 'active' : ''}`

  useEffect(() =>{
    const getProducts = async () =>{
      try{
        const response = await fetch('https://64ae3a1cc85640541d4ca496.mockapi.io/products',{method: 'GET', headers: {'Content-Type': 'aplication/json',
        },
      });

      const data = await response.json();

      setProducts(data);
      } catch (error){
        console.log(error);
      }
    }
    getProducts();
  }, [])
  console.log({ products });

  return (
      <div>
        <Header />
        <ItemListContainer greeting="Compra realizada"/>
        <Counter counter={counter} onDecrementCounter={decrementCounter} onIncrementCounter={incrementCounter} isValidCounter={isValidCounter}/>
        <div>
          <Input placeholder="Add a new task" id='task' required={true} name="task name" onchange={onChange} onFocus={onFocus} onBlur={onBlur} className={inputClass}/>

          <div className='cardContainer'>
              {
                products.map((product) => (
                  <Card { ... product}/>
                ))
              }
          </div>

        </div>
      </div>
  )
}

export default App