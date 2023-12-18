import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Courses } from './components/Courses/Courses';
import { Header } from './components/Header/Header';
import { CourseInfo } from 'components/CourseInfo/CourseInfo';
import { Registration } from 'components/Registration/Registration';
import { Login } from 'components/Login/Login';
import { CreateCourse } from 'components/CreateCourse/CreateCourse';
import { useFetchAppData } from 'helpers/fetchData';

import './App.css';

function App() {
  const token = localStorage.getItem('token');
  useFetchAppData();

  return (
    <div className='App'>
      <div className='main'>
        <BrowserRouter>
          <div className='header'>
            <Header />
          </div>
          <Routes>
            <Route
              path='/'
              element={
                token ? <Navigate to='/courses' /> : <Navigate to='/login' />
              }
            />
            <Route path='/courses/add' element={<CreateCourse />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/login' element={<Login />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/courses/:courseId' element={<CourseInfo />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
