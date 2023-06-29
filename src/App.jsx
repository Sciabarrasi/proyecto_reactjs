import './App.css'
import Header from './components/header'
import ItemListContainer from './components/main/ItemListContainer'

function App() {

  return (
      <div>
        <Header />
        <ItemListContainer greeting="Compra realizada"/>
      </div>
  )
}

export default App