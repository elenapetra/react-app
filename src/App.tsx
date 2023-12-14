import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Courses } from './components/Courses/Courses';
import { Header } from './components/Header/Header';
import { CourseInfo } from 'components/CourseInfo/CourseInfo';
import { Registration } from 'components/Registration/Registration';
import { Login } from 'components/Login/Login';
import { CreateCourse } from 'components/CreateCourse/CreateCourse';
import { mockedAuthorsList, mockedCoursesList } from 'helpers/constants';
import { AuthorData, CourseData } from 'helpers/Types';

function App() {
  const token = localStorage.getItem('token');

  const [authorList, setAuthorList] = useState(mockedAuthorsList);
  const [courseList, setCourseList] = useState<CourseData[]>(mockedCoursesList);

  const updateCourses = (newCourse: CourseData) => {
    setCourseList((courseList) => [...courseList, newCourse]);
  };
  const updateAuthors = (newAuthor: AuthorData) => {
    setAuthorList((authorList) => [...authorList, newAuthor]);
  };

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
            <Route
              path='/courses/add'
              element={
                <CreateCourse
                  updateAuthors={updateAuthors}
                  updateCourses={updateCourses}
                  authorList={authorList}
                  courseList={courseList}
                />
              }
            />
            <Route path='/registration' element={<Registration />} />
            <Route path='/login' element={<Login />} />
            <Route
              path='/courses'
              element={
                <Courses authorList={authorList} courseList={courseList} />
              }
            />
            <Route
              path='/courses/:courseId'
              element={
                <CourseInfo authorList={authorList} courseList={courseList} />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
