export type AuthorData = {
  id: string;
  name: string;
};

export type CourseData = {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
};

export type CoursesProps = {
  courseList: CourseData[];
  authorList: AuthorData[];
};

export type ICourseCard = {
  course: CourseData;
  authors: AuthorData[];
};

export type CourseInfo = {
  courseList: CourseData;
  authorList: AuthorData[];
};
export type ErrorsParam = {
  name: string;
  email: string;
  password: string;
};

export interface SearchBarProps {
  onSearch: (term: string) => void;
}
