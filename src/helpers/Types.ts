export type AuthorDataProps = {
  id: string;
  name: string;
};

export type CourseDataProps = {
  id: string;
  title: string;
  description: string;
  duration: number;
  creationDate: string;
  authors: string[];
};

export type CoursesProps = {
  courseData: CourseDataProps[];
  authorData: AuthorDataProps[];
  setCurrentCourse: any;
};

export type CourseCardProps = {
  course: CourseDataProps;
  authorData: AuthorDataProps[];
  onCourseClick: any;
};

export type CourseInfoProps = {
  course: CourseDataProps;
  authorData: AuthorDataProps[];
  setCurrentCourse: any;
};
