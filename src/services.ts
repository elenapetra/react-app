const fetchCourses = async () => {
  try {
    const response = await fetch(`http://localhost:4000/courses/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

const fetchAuthors = async () => {
  try {
    const response = await fetch(`http://localhost:4000/authors/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch authors');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching authors:', error);
    throw error;
  }
};

export { fetchCourses, fetchAuthors };
