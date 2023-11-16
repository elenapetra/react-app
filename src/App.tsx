import { useState } from 'react';
import './App.css';
import { Courses } from './components/Courses/Courses';
import { Header } from './components/Header/Header';
import { mockedAuthorsList, mockedCoursesList } from 'helpers/constants';
import { CourseInfo } from 'components/CourseInfo/CourseInfo';
import { CourseDataProps } from 'helpers/Types';

function App() {
  const [currentCourse, setCurrentCourse] = useState<CourseDataProps | null>(
    null
  );

  return (
    <div className='App'>
      <Header />
      {currentCourse !== null ? (
        <CourseInfo
          course={currentCourse}
          authorData={mockedAuthorsList}
          setCurrentCourse={setCurrentCourse}
        />
      ) : (
        <Courses
          setCurrentCourse={setCurrentCourse}
          courseData={mockedCoursesList}
          authorData={mockedAuthorsList}
        />
      )}
    </div>
  );
}

export default App;
