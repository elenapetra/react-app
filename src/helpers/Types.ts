export type AuthorData = {
  id: string;
  name: string;
};

export type CourseData = {
  id: string;
  title: string;
  description: string;
  duration: number;
  creationDate: string;
  authors: string[];
};

export type CoursesProps = {
  courseData: CourseData[];
  authorData: AuthorData[];
  setCurrentCourse: any;
};

export type ICourseCard = {
  course: CourseData;
  authorsData: AuthorData[];
};

export type CourseInfo = {
  course: CourseData;
  authorData: AuthorData[];
  setCurrentCourse: any;
};
export type ErrorsParam = {
  name: string;
  email: string;
  password: string;
};

export interface FormData {
  id: string;
  title: string;
  description: string;
  duration: string | undefined;
  creationDate: string;
  authors: string[];
}
