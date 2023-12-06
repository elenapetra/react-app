import { useEffect, useState } from 'react';
import { mockedAuthorsList as authorsData } from 'helpers/constants';
import { Button } from 'common/Button/Button';
import { AuthorItem } from './components/AuthorItem/AuthorItem';
import { Input } from 'common/Input/Input';
import { getCourseDuration } from 'helpers/getCourseDuration';
import { v4 as uuid } from 'uuid';
import { FormData } from 'helpers/Types';
import './CreateCourse.css';
import { formatCreationDate } from 'helpers/formatCreationDate';

export const CreateCourse = () => {
  const initialValues = { title: '', description: '', duration: 0 };
  const [formData, setFormData] = useState(initialValues);
  const [courseAuthors, setCourseAuthors] = useState<
    { id: string; name: string }[]
  >([]);
  const [isSubmit, setIsSubmit] = useState(false);
  // const localStorageAuthorList = localStorage.getItem('newAuthorList');
  const [authorsList, setAuthorsList] = useState(authorsData);
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState({
    title: '',
    description: '',
    duration: '',
  });
  const responseFormBody: FormData = {
    id: '',
    title: '',
    description: '',
    duration: '',
    creationDate: new Date().toDateString(),
    authors: [],
  };
  //////////////////

  /////////////////
  const handleInputFields = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //////////////////////////////////

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    responseFormBody.id = uuid();
    responseFormBody.title = formData.title;
    responseFormBody.description = formData.description;
    responseFormBody.duration = String(formData.duration);
    responseFormBody.authors = courseAuthors.map((a) => {
      return a.id;
    });
    responseFormBody.creationDate = formatCreationDate(new Date().toString());
    localStorage.setItem('responseFormBody', JSON.stringify(responseFormBody));
    setErrorMessage(validation(formData));
    setIsSubmit(true);
  };
  useEffect(() => {
    if (
      Object.values(errorMessage.title).length === 0 &&
      Object.values(errorMessage.description).length === 0 &&
      Object.values(errorMessage.duration).length === 0 &&
      isSubmit
    ) {
      window.location.pathname = '/courses';
    } else console.log('Fix the form errors');
  }, [errorMessage]);
  ////////////ADD NEW AUTHOR//////////////////
  const addToList = (e: any) => {
    e.preventDefault();
    const newList = authorsList.concat({ id: uuid(), name });

    localStorage.setItem('newAuthorList', JSON.stringify(newList));
    const retrievedObject = localStorage.getItem('newAuthorList');
    if (retrievedObject) {
      const newAuthorsObject = JSON.parse(retrievedObject);
      setAuthorsList(newAuthorsObject);
    }
    setName('');
  };

  ///////////////ADD BUTTON//////////////
  const handleAddButton = (author: { id: string; name: string }) => {
    const newAuthorsList = authorsList.filter((item) => {
      return item.id !== author.id;
    });
    setAuthorsList(newAuthorsList);
    setCourseAuthors([...courseAuthors, author]);
  };

  ////////////////////DELETE BUTTON////////////
  const handleDeleteButton = (author: { id: string; name: string }) => {
    const newCourseList = courseAuthors.filter((item) => {
      return item.id !== author.id;
    });
    setAuthorsList([...authorsList, author]);
    setCourseAuthors(newCourseList);
  };

  ///////FORM VALIDATION////////////////
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
  ////////////////////////////////////////

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
                  style={{ width: '100px', height: '50px' }}
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
                    buttonText='CREATE AUTHOR'
                    style={{ width: '185px', height: '50px' }}
                  />
                </div>
              </div>
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
                      style={{ height: '50px', width: '70px' }}
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
                {authorsList.map((author) => (
                  <AuthorItem
                    key={author.id}
                    authorName={author.name}
                    buttonText='ADD'
                    style={{ height: '50px', width: '60px' }}
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
            window.location.href = '/courses';
          }}
          buttonText='CANCEL'
          style={{ width: '185px', height: '50px' }}
          className='cancel-btn'
        />
        <Button
          form='myform'
          style={{ width: '185px', height: '50px' }}
          buttonText='CREATE COURSE'
          type='submit'
          className='submit-btn'
        />
      </div>
    </div>
  );
};
