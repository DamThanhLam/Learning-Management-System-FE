export default async function FunctionName({ params }: { params: { 'course-name': string } }) {
    const { 'course-name': courseName } = params; 
    return <h1>Course Name: {courseName}</h1>;
  }
  