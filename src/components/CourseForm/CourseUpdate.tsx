import { CourseForm } from './CourseForm';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'helpers/hooks';
import { CourseData } from 'helpers/Types';
import { getCourses } from 'store/selectors';
import { useAppDispatch } from 'helpers/hooks';
import { CourseType } from 'store/courses/types';
import { updateCourseThunk } from 'store/courses/thunk';

export const CourseUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const courseList = useAppSelector(getCourses);
  const courseBackend = courseList.find((c: CourseData) => c.id === courseId);
  if (!courseBackend) return <>Course not found</>;

  const onSubmit = (payload: CourseType) => {
    dispatch(updateCourseThunk(payload));
    navigate('/courses');
  };

  return <CourseForm course={courseBackend} onSubmit={onSubmit} />;
};
