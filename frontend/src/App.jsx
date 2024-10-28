import { Router } from 'react-router-dom' 
import './App.css'
import Header from './components/Header'
import Predict from './pages/Predict'
function App() {

  return (
    
    <>
      <div className = "App">
        <Header />
        <Predict />
      </div>
    </>
  )
}

export default App
