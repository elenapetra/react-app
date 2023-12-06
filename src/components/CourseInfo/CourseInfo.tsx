import { useState, useEffect } from 'react';
import { Button } from '../../common/Button/Button';
import { AuthorData } from 'helpers/Types';
import { useParams } from 'react-router-dom';
import { mockedAuthorsList, mockedCoursesList } from 'helpers/constants';
import { formatCreationDate } from 'helpers/formatCreationDate';
import { getCourseDuration } from 'helpers/getCourseDuration';
import './CourseInfo.css';

export const CourseInfo = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const { courseId } = useParams();

  useEffect(() => {
    setCourses(mockedCoursesList);
  }, []);

  const course = courses.find((c) => c.id === courseId);
  if (!course) return <>Course not found</>;

  const authors = mockedAuthorsList.filter((a) =>
    course.authors.includes(a.id)
  );

  return (
    <div className='course-info-wrapper'>
      <h3 className='course-info-title'>{course.title}</h3>

      <div className='course-info'>
        <div className='left-column-course-info'>
          <div className='description-course-info'>
            <h3 className='description-title'>Description: </h3>
            {course.description}
          </div>
        </div>
        <div className='vertical-line'></div>
        <div className='right-column-course-info'>
          <div className='info-row'>
            <span className='title-row'>ID: </span>
            {course.id}
          </div>
          <div className='info-row'>
            <span className='title-row'>Duration: </span>{' '}
            {getCourseDuration(course.duration)}
          </div>
          <div className='info-row'>
            <span className='title-row'> Created: </span>
            {formatCreationDate(course.creationDate)}
          </div>
          <div className='info-row'>
            <span className='title-row'>Authors: </span>
            {authors.map((author: AuthorData, index: number) => {
              return (
                <span key={author.id}>
                  {author.name}
                  {index === authors.length - 1 ? '' : ', '}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div className='back-button'>
        <Button
          buttonText='BACK'
          onClick={() => {
            window.location.pathname = '/courses';
          }}
          style={{
            width: '185px',
            height: '50px',
          }}
        />
      </div>
    </div>
  );
};
