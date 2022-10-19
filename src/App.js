import './App.css';
import Login from './Components/Login'
import DeviceInfo from './Components/DeviceInfo'
import DeviceList from './Components/DeviceList'
import { Route, Routes } from 'react-router-dom'


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/devicelist' element={<DeviceList />}></Route>
        <Route path='/deviceinfo' element={<DeviceInfo />}></Route>
      </Routes>
    </div>
  );
}

export default App;
