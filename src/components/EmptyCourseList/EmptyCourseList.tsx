import Button from 'common/Button/Button';
import { useNavigate } from 'react-router-dom';
import './EmptyCourseList.css';
import { getUserRole } from 'store/selectors';
import { useAppSelector } from 'helpers/hooks';

export const EmptyCourseList = () => {
  const navigate = useNavigate();
  const userRole = useAppSelector(getUserRole);

  return (
    <div className='empty-list-container'>
      <h2 className='empty-list-container-title'>Your List is Empty</h2>

      {userRole === 'admin' ? (
        <>
          <p>Please use "Add New Course" button to add your first course</p>
          <Button
            label='ADD NEW COURSE'
            onClick={() => navigate('/courses/add')}
            size='super-large'
          />
        </>
      ) : (
        <p>
          You don't have permissions to create a course. Please log in as ADMIN
        </p>
      )}
    </div>
  );
};
