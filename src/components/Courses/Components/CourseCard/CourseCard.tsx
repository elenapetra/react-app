import { useNavigate } from 'react-router-dom';
import { getCourseDuration } from '../../../../helpers/getCourseDuration';
import Button from 'common/Button/Button';
import { formatCreationDate } from '../../../../helpers/formatCreationDate';
import { ICourseCard, AuthorData } from 'helpers/Types';
import {
  DeleteOutlined as DeleteOutlinedIcon,
  CreateOutlined as CreateOutlinedIcon,
} from '@mui/icons-material';
import './CourseCard.css';
import { useDispatch } from 'react-redux';
import { deleteCourseAction } from 'store/courses/actions';

export const CourseCard = ({ course, authors }: ICourseCard) => {
  const navigate = useNavigate();
  const courseAuthors = authors.filter((a) => course.authors.includes(a.id));

  const onCourseClick = (courseId: String) => {
    navigate(`/courses/${courseId}`);
  };
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    dispatch(deleteCourseAction(course.id));
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
            <span>
              {courseAuthors
                .map((author: AuthorData) => author.name)
                .join(', ')}
            </span>
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
            label='SHOW COURSE'
            onClick={() => onCourseClick(course.id)}
            size='medium'
            className='show-course-button'
          />
          <Button
            onClick={handleDeleteClick}
            size='very-small'
            label={<DeleteOutlinedIcon className='trash-icon' />}
            className='trash-btn'
            customWidth={true}
          />
          <Button
            onClick={() => console.log('edit')}
            size='very-small'
            label={<CreateOutlinedIcon className='edit-icon' />}
            className='edit-btn'
            customWidth={true}
          />
        </div>
      </div>
    </div>
  );
};
