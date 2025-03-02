export default async function FunctionName({ params }: { params: { 'chapter-name': string } }) {
    const { 'chapter-name': chapterName } = params; 
    return <h1>Course chapter: {chapterName}</h1>;
  }
  