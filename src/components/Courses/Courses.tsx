import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseCard } from './Components/CourseCard/CourseCard';
import { SearchBar } from './Components/SearchBar/SearchBar';
import { EmptyCourseList } from '../EmptyCourseList/EmptyCourseList';
import { CourseData } from 'helpers/Types';
import Button from 'common/Button/Button';
import { useSelector } from 'react-redux';
import { getCourses, getAuthors } from 'store/selectors';
import './Courses.css';

export const Courses = () => {
  const courseList = useSelector(getCourses);
  const authorList = useSelector(getAuthors);

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const handleSearch = (term: string) => {
    const lowercaseSearchTerm = term.toLowerCase();
    setSearchTerm(lowercaseSearchTerm);
  };

  return (
    <div className='courses-component-wrapper'>
      {courseList.length ? (
        <div className='courses-wrapper'>
          <div className='search-bar-btn'>
            <SearchBar onSearch={handleSearch} />
            {token && (
              <Button
                label='ADD NEW COURSE'
                size='large'
                onClick={() => navigate('/courses/add')}
              />
            )}
          </div>
          <div className='courses-list-wrapper'>
            {courseList
              .filter((item: CourseData) => {
                return searchTerm === ''
                  ? item
                  : item.title.toLowerCase().includes(searchTerm) ||
                      item.id.toLowerCase().includes(searchTerm);
              })
              .map((item: CourseData) => (
                <CourseCard key={item.id} course={item} authors={authorList} />
              ))}
          </div>
        </div>
      ) : (
        <EmptyCourseList />
      )}
    </div>
  );
};
