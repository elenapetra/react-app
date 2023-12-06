import { Button } from '../../common/Button/Button';

export const EmptyCourseList = () => {
  return (
    <div className='empty-list-container'>
      <h2>Course List is Empty</h2>
      <p>Please use "Add New Course" button to add your first course</p>
      <Button
        buttonText='ADD NEW COURSE'
        onClick={() => (window.location.href = '/courses/add')}
        style={{
          width: '233px',
          height: '50px',
        }}
      />
    </div>
  );
};
