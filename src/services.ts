import { CourseType } from 'store/courses/types';
import { AuthorType } from 'store/authors/types';

const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found in localStorage');
  }
  return token;
};

const fetchCourses = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:4000/courses/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    const result = await response.json();
    return result.result;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

const fetchAuthors = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:4000/authors/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch authors');
    }
    const result = await response.json();
    return result.result;
  } catch (error) {
    console.error('Error fetching authors:', error);
    throw error;
  }
};

const fetchCurrentUser = async (token: string) => {
  try {
    const response = await fetch('http://localhost:4000/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const result = await response.json();

    return result;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

const logoutRequest = async () => {
  try {
    const token = getToken();
    const response = await fetch(`http://localhost:4000/logout`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch ');
    }
    return {};
  } catch (error) {
    console.error('Error fetching ', error);
    throw error;
  }
};

const deleteCourseRequest = async (courseId: string) => {
  try {
    const token = getToken();
    const response = await fetch(`http://localhost:4000/courses/${courseId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch ');
    }
    return {};
  } catch (error) {
    console.error('Error fetching ', error);
    throw error;
  }
};

const addCourseRequest = async (newCourseData: CourseType) => {
  try {
    const token = getToken();
    const response = await fetch(`http://localhost:4000/courses/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify(newCourseData),
    });
    if (!response.ok) {
      throw new Error('Failed to add a new course');
    }
    const result = await response.json();
    return result.result;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

const addAuthorRequest = async (newAuthor: AuthorType) => {
  try {
    const token = getToken();
    const response = await fetch(`http://localhost:4000/authors/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify(newAuthor),
    });
    if (!response.ok) {
      throw new Error('Failed to add a new author');
    }
    const result = await response.json();
    return result.result;
  } catch (error) {
    console.error('Error fetching author:', error);
    throw error;
  }
};

const updateCourseRequest = async (updatedCourse: CourseType) => {
  try {
    const token = getToken();
    const response = await fetch(
      `http://localhost:4000/courses/${updatedCourse.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(updatedCourse),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to update the course');
    }
    const result = await response.json();
    return result.result;
  } catch (error) {
    console.error('Error fetching course:', error);
    throw error;
  }
};
export {
  fetchCourses,
  fetchAuthors,
  fetchCurrentUser,
  logoutRequest,
  deleteCourseRequest,
  addCourseRequest,
  addAuthorRequest,
  updateCourseRequest,
};
