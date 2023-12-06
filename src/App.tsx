import './App.css';
import { Courses } from './components/Courses/Courses';
import { Header } from './components/Header/Header';
import { CourseInfo } from 'components/CourseInfo/CourseInfo';
import { Registration } from 'components/Registration/Registration';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from 'components/Login/Login';
import { Navigate } from 'react-router-dom';
import { CreateCourse } from 'components/CreateCourse/CreateCourse';

function App() {
  const token = localStorage.getItem('token');

  return (
    <div className='App'>
      <div className='header'>
        <Header />
      </div>
      <div className='main'>
        <BrowserRouter>
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
