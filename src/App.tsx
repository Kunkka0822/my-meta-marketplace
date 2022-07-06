import React from 'react';
import Card from './components/Card';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import StoreInfo from './components/StoreInfo';

function App() {
  return (
    <div className=''>
      <Navbar />
      <div className='flex'>
        <SearchBar />
        <div className='flex flex-col gap-[32px] mt-[64px] sm:ml-[280px] p-[32px]'>
          <StoreInfo />
          <div className='flex flex-wrap gap-[16px] justify-center'>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>        
      </div>
    </div>
  );
}

export default App;
