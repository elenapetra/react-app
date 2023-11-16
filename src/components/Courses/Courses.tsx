import React, { Fragment } from 'react';
import { useState } from 'react';
import { CourseCard } from './Components/CourseCard/CourseCard';
import { SearchBar } from './Components/SearchBar/SearchBar';
import { EmptyCourseList } from '../EmptyCourseList/EmptyCourseList';
import { CourseDataProps, CoursesProps } from 'helpers/Types';

export const Courses = (props: CoursesProps) => {
  const { courseData, authorData, setCurrentCourse } = props;

  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className='main-container'>
      {courseData.length >= 1 ? (
        <Fragment>
          <SearchBar>
            <input
              style={{
                width: '564px',
                height: '50px',
                fontSize: '20px',
              }}
              onChange={handleChange}
              value={searchTerm}
              type='text'
              placeholder='Input text'
            />
          </SearchBar>

          {courseData
            .filter((item: CourseDataProps) => {
              return searchTerm.toLowerCase() === ''
                ? item
                : item.title.toLowerCase().includes(searchTerm) ||
                    item.id.toLowerCase().includes(searchTerm);
            })
            .map((item: CourseDataProps) => (
              <CourseCard
                course={item}
                onCourseClick={() => setCurrentCourse(item)}
                authorData={authorData}
              />
            ))}
        </Fragment>
      ) : (
        <EmptyCourseList />
      )}
    </div>
  );
};
