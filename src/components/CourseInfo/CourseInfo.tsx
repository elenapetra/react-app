import Button from 'common/Button/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseDuration } from 'helpers/getCourseDuration';
import { getCourses, getAuthors } from 'store/selectors';
import { useAppSelector } from 'helpers/hooks';
import { CourseData, AuthorData } from 'helpers/Types';
import { formatCreationDate } from 'helpers/formatCreationDate';
import './CourseInfo.css';

export const CourseInfo = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const courseList = useAppSelector(getCourses);
  const authorList = useAppSelector(getAuthors);

  const course = courseList.find((c: CourseData) => c.id === courseId);
  if (!course) return <>Course not found</>;

  const authors = authorList.filter((a: AuthorData) =>
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
          size='large'
          label='BACK'
          onClick={() => {
            navigate('/courses');
          }}
        />
      </div>
    </div>
  );
};
