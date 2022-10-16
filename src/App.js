//import './App.css';
import React, { createContext } from 'react';
import './scss/app.scss';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import { useState } from 'react';
//import pizzas from './assets/pizzas.json';
//console.log(pizzas);

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');

  // console.log(searchValue, 'change');
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Main searchValue={searchValue} />}></Route>
            <Route path="cart" element={<Cart />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
