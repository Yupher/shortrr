import React from 'react'
import Header from './components/Header'
import NewUrl from './components/NewUrl'
import Links from './components/Links'
import './App.css'

const  App = () => {
  return (
    <div className="App">
      <Header />
      <NewUrl />
      <Links  />
    </div>
  );
}

export default App;
