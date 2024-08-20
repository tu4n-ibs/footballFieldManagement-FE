import './App.css';
import {Routes, Route} from 'react-router-dom';
import FootballPitches from './components/main/footballPitches';
import Login from './components/login/login';
import Register from './components/register/register';
import Tournaments from './components/Tournaments/tournaments';
import AdminHome from './components/admin/adminHome';
import LoginManagement from './components/login/loginManagement';
import RegisterManagement from './components/register/registerManagement';
import HomeOwner from './components/owner/homeOwner';
import ManageFileds from './components/owner/manageFileds';
import Football from './components/detail/football';
import InforManage from './components/inforManageFields/InforManage';
import HistoryUser from './components/history/history';
import { Header } from './component/header/header';
import { HomePage } from './component/home/home';
function App() {
  return (
    <>
    <Routes>
      <Route path='/san-bong' element={<FootballPitches/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/giai-dau' element={<Tournaments/>}></Route>
      <Route path='/admin' element={<AdminHome/>}></Route>
      <Route path='/login-management' element={<LoginManagement/>}></Route>
      <Route path='/register-management' element={<RegisterManagement/>}></Route>
      <Route path='/home-owner' element={<HomeOwner/>}></Route>
      <Route path='/quan-ly-san-bong' element={<ManageFileds/>}></Route>
      <Route path='/:id/detail-football' element={<Football/>}></Route>
      <Route path='/thong-tin' element={<InforManage/>}></Route>
      <Route path='/lich-su' element={<HistoryUser/>}></Route>
      <Route path='/header' element={<Header/>}></Route>
      <Route path='/' element={<HomePage/>}/>
    </Routes>
    </>
  );
}

export default App;
