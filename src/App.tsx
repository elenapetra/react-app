import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Courses } from './components/Courses/Courses';
import { Header } from './components/Header/Header';
import { CourseInfo } from 'components/CourseInfo/CourseInfo';
import { Registration } from 'components/Registration/Registration';
import { Login } from 'components/Login/Login';
import { CreateCourse } from 'components/CreateCourse/CreateCourse';
import { AuthorData, CourseData } from 'helpers/Types';
import { fetchAndAddAuthors, fetchAndAddCourses } from 'services';
import { CourseType } from 'store/courses/types';
import { AuthorType } from 'store/authors/types';
import { getCourses, getAuthors } from 'store/selectors';
import './App.css';

function App() {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  const courses: CourseType[] = useSelector(getCourses);
  const authors: AuthorType[] = useSelector(getAuthors);

  const [courseList, setCourseList] = useState<CourseData[]>([]);
  const [authorList, setAuthorList] = useState<AuthorData[]>([]);

  const updateCourses = (newCourse: CourseData) => {
    setCourseList((courseList) => [...courseList, newCourse]);
  };
  const updateAuthors = (newAuthor: AuthorData) => {
    setAuthorList((authorList) => [...authorList, newAuthor]);
  };

  useEffect(() => {
    fetchAndAddCourses(dispatch);
    fetchAndAddAuthors(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setCourseList(courses);
    setAuthorList(authors);
  }, [courses, authors]);

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
