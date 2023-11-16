import { getCourseDuration } from '../../../../helpers/getCourseDuration';
import { Button } from 'common/Button/Button';
import { formatCreationDate } from '../../../../helpers/formatCreationDate';
import { CourseCardProps, AuthorDataProps } from 'helpers/Types';
import {
  DeleteOutlined as DeleteOutlinedIcon,
  CreateOutlined as CreateOutlinedIcon,
} from '@mui/icons-material';
import './CourseCard.css';
import '@fontsource/open-sans';

export const CourseCard = ({
  course,
  authorData,
  onCourseClick,
}: CourseCardProps) => {
  const authors = authorData.filter((a) => course.authors.includes(a.id));
  return (
    <div className='main-container'>
      <div className='title'>{course.title}</div>
      <div className='description'>{course.description}</div>
      <div className='course-info-data'>
        <div className='authors'>
          <span>Authors: </span>
          {authors.map((author: AuthorDataProps, index: number) => {
            return (
              <span>
                {author.name}
                {index === authors.length - 1 ? '' : ', '}
              </span>
            );
          })}
        </div>
        <div className='duration'>
          <span> Duration:</span> {getCourseDuration(course.duration)}
        </div>
        <div className='created'>
          <span>Created:</span> {formatCreationDate(course.creationDate)}
        </div>
      </div>
      <div className='right-buttons'>
        <Button
          buttonText='SHOW COURSE'
          onClick={onCourseClick}
          style={{
            width: '180px',
            height: '50px',
          }}
        />
        <button className='trash-btn'>
          <DeleteOutlinedIcon className='trash-icon' />
        </button>
        <button style={{ backgroundColor: '#007298' }} className='edit-btn'>
          <CreateOutlinedIcon className='edit-icon' />
        </button>
      </div>
    </div>
  );
};
