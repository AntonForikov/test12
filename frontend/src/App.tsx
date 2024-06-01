import Header from './components/Header/Header';
import Home from './containers/Home/Home';
import {Route, Routes} from 'react-router-dom';
import Register from './containers/User/Register';
import Login from './containers/User/Login';
import Container from '@mui/material/Container';
import {useAppSelector} from './app/hooks';
import {selectUser} from './store/user/userSlice';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AddImage from './containers/AddImage/AddImage';

function App() {
  const user = useAppSelector(selectUser);
  return (
    <>
      <header>
        <Header/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/newImage" element={
              <ProtectedRoute isAllowed={Boolean(user)}>
                <AddImage/>
              </ProtectedRoute>
            }/>
            <Route path="/userImages/:id" element={<Home userImages/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<h1>Not found</h1>}/>
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
