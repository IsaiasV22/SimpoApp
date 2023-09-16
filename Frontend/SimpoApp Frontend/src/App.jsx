import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header.jsx'
import Content from './components/Content.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [count, setCount] = useState(420);
  

  return (
    <div className='h-100'>
    <Header/>
    <Content count={count} />
    <Footer/>
    </div>
  )
}

export default App
