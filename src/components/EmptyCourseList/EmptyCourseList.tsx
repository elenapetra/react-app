import Button from 'common/Button/Button';
import { useNavigate } from 'react-router-dom';
import './EmptyCourseList.css';

export const EmptyCourseList = () => {
  const navigate = useNavigate();

  return (
    <div className='empty-list-container'>
      <h2 className='empty-list-container-title'>Your List is Empty</h2>
      <p>Please use "Add New Course" button to add your first course</p>
      <Button
        label='ADD NEW COURSE'
        onClick={() => navigate('/courses/add')}
        size='super-large'
      />
    </div>
  );
};
