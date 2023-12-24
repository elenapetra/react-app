import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'helpers/hooks';
import Button from 'common/Button/Button';
import { AuthorItem } from './components/AuthorItem/AuthorItem';
import { Input } from 'common/Input/Input';
import { getCourseDuration } from 'helpers/getCourseDuration';
import { AuthorData, CourseData } from 'helpers/Types';
import { useAppSelector } from 'helpers/hooks';
import { getAuthors } from 'store/selectors';
import { addAuthorThunk } from 'store/authors/thunk';
import './CourseForm.css';

export const CourseForm = ({ course, onSubmit }: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const storeAuthors = useAppSelector(getAuthors);
  const [formData, setFormData] = useState({
    id: course.id,
    title: course.title,
    description: course.description,
    duration: course.duration,
    creationDate: course.creationDate,
  });

  const [courseAuthors, setCourseAuthors] = useState<AuthorData[]>([]);
  const [authorsList, setAuthorsList] = useState<AuthorData[]>([]);
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState({
    title: '',
    description: '',
    duration: '',
  });
  const [authorError, setAuthorError] = useState('');
  const [courseAuthorsError, setCourseAuthorsError] = useState('');

  useEffect(() => {
    setCourseAuthors((prevState) => {
      return [
        ...prevState,
        ...storeAuthors.filter((author) => course.authors.includes(author.id)),
      ];
    });
    setAuthorsList((prevState) => {
      const prevStateIds = prevState.map((a) => a.id);
      return [
        ...prevState,
        ...storeAuthors.filter(
          (author) =>
            !course.authors.includes(author.id) &&
            !prevStateIds.includes(author.id)
        ),
      ];
    });
  }, [storeAuthors]);

  const handleInputFields = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validation(formData);
    setErrorMessage(result);
    if (
      !result.title.length &&
      !result.description.length &&
      !result.duration.length &&
      courseAuthors.length
    ) {
      const newCourseFormBody: CourseData = {
        id: formData.id,
        title: formData.title,
        description: formData.description,
        duration: Number(formData.duration),
        creationDate: formData.creationDate,
        authors: courseAuthors.map((a) => {
          return a.id;
        }),
      };

      onSubmit(newCourseFormBody);
    }
    if (courseAuthors.length === 0) {
      setCourseAuthorsError('Please add at least an author.');
    }
  };

  const addToList = (e: any) => {
    e.preventDefault();
    if (name.length >= 2) {
      const doesNameExist = storeAuthors.some(
        (author: AuthorData) => author.name === name
      );
      if (doesNameExist) {
        setAuthorError('Author with this name already exists!');
      } else {
        setAuthorError('');
        const newAuthor = { name, id: '' };
        dispatch(addAuthorThunk(newAuthor));
        setName('');
      }
    } else {
      setAuthorError('Name should have at least 2 characters.');
    }
  };

  const handleAddButton = (author: { id: string; name: string }) => {
    setAuthorsList((prevState) =>
      prevState.filter((item: AuthorData) => item.id !== author.id)
    );
    setCourseAuthors([...courseAuthors, author]);
  };

  const handleDeleteButton = (author: AuthorData) => {
    setCourseAuthors((prevState) =>
      prevState.filter((item) => {
        return item.id !== author.id;
      })
    );
    setAuthorsList((prevState) => [...prevState, author]);
  };

  const validation = (formData: {
    title: string;
    description: string;
    duration: number;
  }) => {
    const errors = {
      title: '',
      description: '',
      duration: '',
    };
    if (formData.title.length < 2) {
      errors.title = 'Title should have at least 2 characters.';
    }
    if (formData.description.length < 2) {
      errors.description = 'Descriptions should have at least 2 characters.';
    }
    if (formData.duration === 0) {
      errors.duration = 'Duration is required.';
    }
    return errors;
  };

  return (
    <div className='create-course-wrapper'>
      <h3 className='create-course-title'>Course Edit/Create Page</h3>
      <div className='form-wrapper'>
        <form onSubmit={handleSubmit} id='myform'>
          <div className='title-description-duration'>
            <h2>Main info</h2>
            <Input
              className='title-field'
              labelText='Title'
              type='text'
              required
              name='title'
              value={formData.title}
              onChange={handleInputFields}
            />
            {errorMessage.title && (
              <p className='title-error'>{errorMessage.title}</p>
            )}
            <div className='description-textarea'>
              <h3>Description </h3>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleInputFields}
                cols={90}
                rows={8}
                className='description-field'
                placeholder='Input text'
              />
              {errorMessage.description && (
                <p className='description-error'>{errorMessage.description}</p>
              )}
            </div>
            <div>
              <h2>Duration</h2>
              <div className='duration-input-display'>
                <Input
                  type='number'
                  labelText='Duration'
                  required
                  name='duration'
                  onChange={handleInputFields}
                  value={formData.duration}
                  className='duration-field'
                  min='0'
                />
                <span className='duration-display'>
                  <strong> {getCourseDuration(formData.duration)}</strong> hours
                </span>
              </div>
              {errorMessage.duration && (
                <p className='duration-error'>{errorMessage.duration}</p>
              )}
            </div>
          </div>
          <div className='author-container'>
            <div className='create-author'>
              <h2>Authors</h2>
              <div className='create-author-input-btn'>
                <Input
                  type='string'
                  labelText='Author name'
                  required
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    setName(e.target.value);
                  }}
                  name='name'
                  className='author-name-field'
                />
                <div className='create-author-btn'>
                  <Button
                    onClick={addToList}
                    label='CREATE AUTHOR'
                    size='large'
                  />
                </div>
              </div>
              {authorError && <p className='author-error'>{authorError}</p>}
            </div>

            <div className='course-authors'>
              <h2>Course Authors:</h2>
              {courseAuthors.length === 0 && (
                <p className='author-error'>{courseAuthorsError}</p>
              )}
              <div className='author-item'>
                {courseAuthors.map((author) => {
                  return (
                    <AuthorItem
                      key={author.id}
                      authorName={author.name}
                      buttonText='DELETE'
                      onClick={(e: any) => {
                        e.preventDefault();
                        handleDeleteButton(author);
                      }}
                    />
                  );
                })}
              </div>
            </div>
            <div className='authors-list'>
              <h3>Authors List</h3>
              <div className='author-item'>
                {authorsList.map((author: AuthorData) => (
                  <AuthorItem
                    key={author.id}
                    authorName={author.name}
                    buttonText='ADD'
                    onClick={(e: any) => {
                      e.preventDefault();
                      handleAddButton(author);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className='form-btns'>
        <Button
          onClick={(e: any) => {
            e.preventDefault();
            navigate('/courses');
          }}
          label='CANCEL'
          className='cancel-btn'
          size='large'
        />
        <Button
          form='myform'
          label='CREATE COURSE'
          type='submit'
          className='submit-btn'
          size='large'
        />
      </div>
    </div>
  );
};
