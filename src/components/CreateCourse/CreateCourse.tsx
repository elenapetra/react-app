import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'common/Button/Button';
import { AuthorItem } from './components/AuthorItem/AuthorItem';
import { Input } from 'common/Input/Input';
import { getCourseDuration } from 'helpers/getCourseDuration';
import { v4 as uuid } from 'uuid';
import { AuthorData, FormData } from 'helpers/Types';
import './CreateCourse.css';
import { formatCreationDate } from 'helpers/formatCreationDate';

export const CreateCourse = ({
  authorList,
  updateCourses,
  updateAuthors,
}: any) => {
  const initialValues = { title: '', description: '', duration: 0 };
  const [formData, setFormData] = useState(initialValues);
  const [courseAuthors, setCourseAuthors] = useState<
    { id: string; name: string }[]
  >([]);
  const [authorsList, setAuthorsList] = useState(authorList);
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState({
    title: '',
    description: '',
    duration: '',
  });
  const [authorError, setAuthorError] = useState('');
  const responseFormBody: FormData = {
    id: '',
    title: '',
    description: '',
    duration: '',
    creationDate: new Date().toDateString(),
    authors: [],
  };
  const navigate = useNavigate();
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
      !result.duration.length
    ) {
      responseFormBody.id = uuid();
      responseFormBody.title = formData.title;
      responseFormBody.description = formData.description;
      responseFormBody.duration = String(formData.duration);
      responseFormBody.creationDate = formatCreationDate(new Date().toString());
      responseFormBody.authors = courseAuthors.map((a) => {
        return a.id;
      });
      updateCourses(responseFormBody);
      navigate('/courses');
    }
  };

  const addToList = (e: any) => {
    e.preventDefault();
    if (name) {
      const doesNameExist = authorsList.some(
        (author: AuthorData) => author.name === name
      );
      if (doesNameExist) {
        setAuthorError('Author with this name already exists!');
        return;
      }
      const newAuthor = { id: uuid(), name };
      setAuthorsList([...authorsList, newAuthor]);
      updateAuthors(newAuthor);
      setName('');
    } else {
      setAuthorError('');
    }
  };

  const handleAddButton = (author: { id: string; name: string }) => {
    const newAuthorsList = authorsList.filter((item: any) => {
      return item.id !== author.id;
    });
    setAuthorsList(newAuthorsList);
    setCourseAuthors([...courseAuthors, author]);
  };

  const handleDeleteButton = (author: { id: string; name: string }) => {
    const newCourseList = courseAuthors.filter((item) => {
      return item.id !== author.id;
    });
    setAuthorsList([...authorsList, author]);
    setCourseAuthors(newCourseList);
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
    if (formData.duration == 0) {
      errors.duration = 'Duration is required';
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
                </div>{' '}
              </div>{' '}
              {authorError && <p className='author-error'>{authorError}</p>}
            </div>

            <div className='course-authors'>
              <h2>Course Authors:</h2>
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
                {authorsList.map((author: any) => (
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
            updateCourses(null);
            navigate('/courses');
            window.location.reload();
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
