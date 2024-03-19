import React, { useState } from 'react';
import Inventory from './components/Inventory/Inventory';
import Switch from 'react-switch';
import './App.css'
const App = () => {
  const [mode, setMode] = useState('admin'); 

  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'admin' ? 'user' : 'admin'));
  };

  return (
    <div className='App'>
      <label className='flex-item'>
        <span className='mode-change'>Admin</span>
        <Switch
          checked={mode === 'user'}
          onChange={toggleMode}
          onColor="#99CA3B"
          onHandleColor="#6A9120"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch"
          id="material-switch"
        />
        <span className='mode-change'>User</span>
      </label>
      <Inventory mode={mode}/>
    </div>
  );
};

export default App;
