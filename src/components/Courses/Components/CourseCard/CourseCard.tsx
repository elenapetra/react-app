import { getCourseDuration } from '../../../../helpers/getCourseDuration';
import { Button } from 'common/Button/Button';
import { formatCreationDate } from '../../../../helpers/formatCreationDate';
import { ICourseCard, AuthorData } from 'helpers/Types';
import {
  DeleteOutlined as DeleteOutlinedIcon,
  CreateOutlined as CreateOutlinedIcon,
} from '@mui/icons-material';
import './CourseCard.css';

export const CourseCard = ({ course, authorsData }: ICourseCard) => {
  const authors = authorsData.filter((a) => course.authors?.includes(a.id));
  const localStorageAuthorList = localStorage.getItem('newAuthorList');
  let authorsUpdated;
  if (localStorageAuthorList) {
    let newAuthorsObject = JSON.parse(localStorageAuthorList);
    authorsUpdated = newAuthorsObject.filter((a: any) =>
      course.authors?.includes(a.id)
    );
  }

  const onCourseClick = (courseId: String) => {
    window.location.pathname = `/courses/${courseId}`;
  };
  return (
    <div className='course-card-wrapper'>
      <div className='course-card-left-column'>
        <h3 className='course-card-title'>{course.title}</h3>
        <div className='course-card-description'>{course.description}</div>
      </div>
      <div className='course-card-right-column'>
        <div className='course-card-rows'>
          <div className='course-card-row'>
            <span>Authors: </span>
            {(authorsUpdated ?? authors)
              .map((author: AuthorData) => author.name)
              .join(', ')}
          </div>
          <div className='course-card-row'>
            <span> Duration:</span> {getCourseDuration(course.duration)}
          </div>
          <div className='course-card-row'>
            <span>Created:</span> {formatCreationDate(course.creationDate)}
          </div>
        </div>
        <div className='right-buttons'>
          <Button
            buttonText='SHOW COURSE'
            onClick={() => onCourseClick(course.id)}
            style={{
              width: '180px',
              height: '50px',
            }}
            className='show-course-button'
          />
          <button className='trash-btn'>
            <DeleteOutlinedIcon className='trash-icon' />
          </button>
          <button style={{ backgroundColor: '#007298' }} className='edit-btn'>
            <CreateOutlinedIcon className='edit-icon' />
          </button>{' '}
        </div>
      </div>
    </div>
  );
};
