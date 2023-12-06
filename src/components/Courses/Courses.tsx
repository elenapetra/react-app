import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { CourseCard } from './Components/CourseCard/CourseCard';
import { SearchBar } from './Components/SearchBar/SearchBar';
import { EmptyCourseList } from '../EmptyCourseList/EmptyCourseList';
import { CourseData } from 'helpers/Types';
import {
  mockedAuthorsList as authorsData,
  mockedCoursesList as coursesData,
} from 'helpers/constants';
import { Button } from 'common/Button/Button';
import './Courses.css';

export const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newCourseList, setNewCourseList] = useState(coursesData);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const retrievedObject = localStorage.getItem('responseFormBody');
    if (retrievedObject) {
      const newObject = JSON.parse(retrievedObject);
      const newList = coursesData.concat(newObject);
      setNewCourseList(newList);
    }
  }, []);

  const handleChange = (e: any) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  return (
    <div className='courses-wrapper'>
      {newCourseList.length ? (
        <Fragment>
          <div className='search-bar-btn'>
            <SearchBar>
              <input
                className='search-bar-input'
                onChange={handleChange}
                value={searchTerm}
                type='text'
                placeholder='Input text'
              />
            </SearchBar>
            {token ? (
              <Button
                buttonText='ADD NEW COURSE'
                style={{
                  width: '140px',
                  height: '50px',
                }}
                onClick={() => (window.location.pathname = '/courses/add')}
              />
            ) : null}
          </div>
          <div className='courses-list-wrapper'>
            {newCourseList
              .filter((item: CourseData) => {
                return searchTerm === ''
                  ? item
                  : item.title.toLowerCase().includes(searchTerm) ||
                      item.id.toLowerCase().includes(searchTerm);
              })
              .map((item: CourseData, index: number) => (
                <CourseCard
                  key={item.id}
                  course={item}
                  authorsData={authorsData}
                />
              ))}
          </div>
        </Fragment>
      ) : (
        <EmptyCourseList />
      )}
    </div>
  );
};
