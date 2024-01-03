import { useAppDispatch } from 'helpers/hooks';
import { CourseForm } from './CourseForm';
import { addCourseThunk } from 'store/courses/thunk';
import { useNavigate } from 'react-router-dom';
import { CourseType } from 'store/courses/types';

export const CourseAdd = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const course = {
    id: '',
    title: '',
    description: '',
    duration: 0,
    creationDate: new Date().toString(),
    authors: [],
  };

  const onSubmit = (payload: CourseType) => {
    dispatch(addCourseThunk(payload));
    navigate('/courses');
  };

  return (
    <CourseForm
      course={course}
      onSubmit={onSubmit}
      buttonLabel='CREATE COURSE'
    />
  );
};
