import { useNavigate } from 'react-router-dom';
import { getCourseDuration } from '../../../../helpers/getCourseDuration';
import Button from 'common/Button/Button';
import { ICourseCard, AuthorData } from 'helpers/Types';
import {
  DeleteOutlined as DeleteOutlinedIcon,
  CreateOutlined as CreateOutlinedIcon,
} from '@mui/icons-material';
import './CourseCard.css';
import { useAppDispatch, useAppSelector } from 'helpers/hooks';
import { deleteCourseThunk } from 'store/courses/thunk';
import { getUserRole } from 'store/selectors';
import { formatCreationDate } from 'helpers/formatCreationDate';
import { Link } from 'react-router-dom';

export const CourseCard = ({ course, authors }: ICourseCard) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userRole = useAppSelector(getUserRole);
  const courseAuthors = authors.filter((a) => course.authors.includes(a.id));
  const onCourseClick = (courseId: String) => {
    navigate(`/courses/${courseId}`);
  };

  const handleDeleteClick = () => {
    dispatch(deleteCourseThunk(course.id));
  };
  const handleEditClick = () => {
    navigate(`/courses/update/${course.id}`);
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
          {userRole === 'admin' && (
            <>
              <Button
                onClick={handleDeleteClick}
                size='custom-btn'
                label={<DeleteOutlinedIcon className='trash-icon' />}
                className='trash-btn'
              />
              <Button
                onClick={handleEditClick}
                size='custom-btn'
                label={<CreateOutlinedIcon className='edit-icon' />}
                className='edit-btn'
                component={Link}
                to={`/courses/update/${course.id}`}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
