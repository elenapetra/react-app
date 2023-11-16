import { Button } from '../../common/Button/Button';
import { CourseInfoProps, AuthorDataProps } from 'helpers/Types';
import { formatCreationDate } from 'helpers/formatCreationDate';
import { getCourseDuration } from 'helpers/getCourseDuration';
import './CourseInfo.css';

export const CourseInfo = (props: CourseInfoProps) => {
  const { course, authorData, setCurrentCourse } = props;
  const authors = authorData.filter((a) => course.authors.includes(a.id));

  return (
    <div className='container'>
      <div className='title'>{course.title}</div>
      <div className='course-info'>
        <div className='left-column'>
          <div className='description'>
            <h3>Description: </h3>
            {course.description}
          </div>
        </div>
        <div className='vertical-line'></div>
        <div className='right-column'>
          <div className='id'>
            <span>ID: </span>
            {course.id}
          </div>
          <div className='duration'>
            <span>Duration: </span> {getCourseDuration(course.duration)}
          </div>
          <div className='creation-date'>
            <span> Created: </span>

            {formatCreationDate(course.creationDate)}
          </div>
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
        </div>{' '}
      </div>
      <div className='back-button'>
        <Button
          buttonText='BACK'
          onClick={() => setCurrentCourse(null)}
          style={{
            width: '185px',
            height: '50px',
          }}
        />
      </div>
    </div>
  );
};
