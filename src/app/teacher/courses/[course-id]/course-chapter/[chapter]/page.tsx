'use client'
import React, { useState, useEffect, ChangeEvent, DragEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BASE_URL_LECTURE_SERVICE, BASE_URL_USER_SERVICE } from '@/utils/BaseURL';

// Types for resources
type ResourceType = 'File' | 'Video' | 'Thumbnail';
interface ResourceState { file: File | null; error: string; }

export default function ChapterManagement() {
  const [activeTab, setActiveTab] = useState<'Details' | 'Resources'>('Details');
  const params = useParams(); const router = useRouter();
  const courseId = params['course-id'] as string;
  const lectureId = params['chapter'] as string;

  // Detail state
  const [chapter, setChapter] = useState<number>(1);
  const [type, setType] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [chapterError, setChapterError] = useState<string>('');
  const [titleError, setTitleError] = useState<string>('');
  const [descError, setDescError] = useState<string>('');
  // Resources state & previews
  const initialResources: Record<ResourceType, ResourceState> = {
    File: { file: null, error: '' },
    Video: { file: null, error: '' },
    Thumbnail: { file: null, error: '' }
  };
  const [resources, setResources] = useState(initialResources);
  const [initialUrls, setInitialUrls] = useState<Record<ResourceType, string>>({ File: '', Video: '', Thumbnail: '' });
  const [filePreviews, setFilePreviews] = useState<Record<ResourceType, string>>({ File: '', Video: '', Thumbnail: '' });

  // Fetch existing lecture
  useEffect(() => {
    async function fetchLecture() {
      try {
        const res = await fetch(
          `${BASE_URL_LECTURE_SERVICE}?id=${lectureId}`,
          { credentials: 'include' }
        );
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        console.log({ File: data.documentUrl || '', Video: data.videoUrl || '', Thumbnail: data.thumbnailUrl || '' })
        setChapter(data.chapter);
        setType(data.type);
        setTitle(data.title);
        setDescription(data.description);
        setInitialUrls({ File: data.documentUrl || '', Video: data.videoUrl || '', Thumbnail: data.thumbnailUrl || '' });
      } catch {
        alert('Error fetching data');
      }
    }
    fetchLecture();

    fetch(BASE_URL_USER_SERVICE+"/own",{
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      }
    }).then(res => res.json())
    .then(data => console.log(data))
  }, [courseId, lectureId]);

  // Validation handlers
  const handleChapterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const n = parseInt(e.target.value, 10);
    if (isNaN(n) || n < 0) setChapterError('Must be ≥ 0');
    else { setChapterError(''); setChapter(n); }
  };
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setTitle(v);
    if (!v.trim()) setTitleError('Required');
    else if (v.length > 50) setTitleError('Max 50 chars');
    else setTitleError('');
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setDescription(v);
    if (!v.trim()) setDescError('Required');
    else if (v.length > 1000) setDescError('Max 1000 chars');
    else setDescError('');
  };

  // Resource handlers
  const handleFileSelect = (typeKey: ResourceType) => (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    validateAndSet(typeKey, file);
  };
  const handleDrop = (typeKey: ResourceType) => (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    validateAndSet(typeKey, e.dataTransfer.files[0]);
  };
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  const validateAndSet = (typeKey: ResourceType, file: File | null) => {
    let error = '';
    if (!file) error = 'Selection failed';
    else {
      const sizeMB = file.size / (1024 * 1024);
      if (typeKey === 'File') {
        if (!['text/plain', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) error = 'Only TXT, PDF, DOC/DOCX allowed';
        else if (sizeMB > 15) error = 'Max 15MB';
      }
      if (typeKey === 'Video') {
        if (!['video/mp4', 'video/quicktime'].includes(file.type)) error = 'Only MP4, MOV allowed';
        else if (sizeMB > 1024) error = 'Max 1GB';
      }
      if (typeKey === 'Thumbnail') {
        if (!['image/jpeg', 'image/png'].includes(file.type)) error = 'Only JPEG, PNG allowed';
        else if (sizeMB > 15) error = 'Max 15MB';
      }
    }
    setResources(prev => ({ ...prev, [typeKey]: { file: error ? null : file, error } }));
    if (!error) {
      setInitialUrls(prev => ({ ...prev, [typeKey]: '' }));
      if (typeKey === 'File' && file?.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = e => {
          const text = typeof e.target?.result === 'string' ? e.target.result.substring(0, 200) : '';
          setFilePreviews(prev => ({ ...prev, File: text }));
        };
        reader.readAsText(file);
      } else {
        setFilePreviews(prev => ({ ...prev, [typeKey]: '' }));
      }
    }
  };

  // Submit handler
  const handleUpdate = async (status: 'DRAFT' | 'PUBLISHED') => {
    // final validation
    if (!title.trim()) setTitleError('Title is required');
    if (!description.trim()) setDescError('Description is required');
    if (!chapter || chapter <= 0) setChapterError('Chapter must be a positive number');

    // if publishing, require file, video, thumbnail
    if (status === 'PUBLISHED') {
      (Object.keys(resources) as ResourceType[]).forEach(type => {
        if (!resources[type].file) {
          setResources(prev => ({
            ...prev,
            [type]: { ...prev[type], error: `${type} is required for publication` }
          }));
        }
      });
    }

    // abort if any errors
    const hasFieldErrors = titleError || descError || chapterError;
    const hasResourceErrors = Object.values(resources).some(r => r.error);
    if (hasFieldErrors || hasResourceErrors) return;

    try {
      const formData = new FormData();
      formData.append('chapter', String(chapter));
      formData.append('title', title);
      formData.append('description', description);
      formData.append('status', status);
      Object.entries(resources).forEach(([key, { file }]) => {
        if (file) {
          const fieldName =
            key === 'File' ? 'documentFile' : key === 'Video' ? 'videoFile' : 'thumbnailFile';
          formData.append(fieldName, file);
        }
      });

      const res = await fetch(
        `${BASE_URL_LECTURE_SERVICE}/lectures/${lectureId}`,
        { method: 'POST', body: formData, credentials: 'include' }
      );
      if (!res.ok) throw new Error('Add chapter failed');
      alert('Chapter added successfully');
      router.push(`/teacher/courses/${courseId}`);
    } catch (err) {
      console.error(err);
      alert('Error adding chapter');
    }
  };
  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel?')) {
      router.push(`/teacher/courses/${courseId}`);
    }
  };


  return (
    <div className="flex max-h-screen bg-gray-100 w-4/5 overflow-y-auto">
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center mb-4">
          <button onClick={() => router.back()} className="text-4xl">←</button>
          <h1 className="text-xl font-bold">Update Chapter</h1>
          <div className="flex space-x-4">
            <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
            <button
              onClick={() => handleUpdate('DRAFT')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >Move to Draft</button>
            <button
              onClick={() => handleUpdate('PUBLISHED')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >Add Chapter</button>
          </div>
        </header>

        <nav className="flex space-x-6 border-b">
          {['Details', 'Resources'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab as any)}
              className={`pb-2 text-sm font-medium ${activeTab === tab ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            >{tab}</button>
          ))}
        </nav>

        {
    activeTab === 'Details' && (
      <div className="mt-6 space-y-4">
        {/* Details fields */}
        <div>
          <label className="block text-sm">Chapter*</label>
          <input type="number" min={0} value={chapter} onChange={handleChapterChange}
            className="mt-1 p-2 border rounded w-24" />
          {chapterError && <p className="text-red-500 text-sm">{chapterError}</p>}
        </div>

        <div>
          <label className="block text-sm">Title*</label>
          <input type="text" value={title} onChange={handleTitleChange}
            className="mt-1 p-2 border rounded w-full" />
          <div className="text-xs text-gray-500 text-right">{title.length}/50</div>
          {titleError && <p className="text-red-500 text-sm">{titleError}</p>}
        </div>
        <div>
          <label className="block text-sm">Description*</label>
          <textarea rows={4} value={description} onChange={handleDescriptionChange}
            className="mt-1 p-2 border rounded w-full" />
          <div className="text-xs text-gray-500 text-right">{description.length}/1000</div>
          {descError && <p className="text-red-500 text-sm">{descError}</p>}
        </div>
      </div>
    )
  }

  {
    activeTab === 'Resources' && (
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {(Object.keys(resources) as ResourceType[]).map(typeKey => {
          const { file, error } = resources[typeKey];
          const preview = initialUrls[typeKey];
          console.log(preview)
          return (
            <div key={typeKey} className="border p-4 rounded bg-white space-y-2">
              <h2 className="font-semibold">{typeKey}*</h2>
              {/* Preview area */}
              <div className="h-40 flex items-center justify-center bg-gray-50 rounded overflow-hidden">
                {typeKey === 'Thumbnail' && (
                  file
                    ? <img src={URL.createObjectURL(file)} alt="thumb" className="h-full" />
                    : preview && <img src={preview} alt="thumb" className="h-full" />
                )}
                {typeKey === 'Video' && (
                  file
                    ? <video src={URL.createObjectURL(file)} controls className="max-h-full" />
                    : preview && <video src={preview} controls className="max-h-full" />
                )}
                {typeKey === 'File' && (
                  (file || preview) ? (
                    <a
                      href={file ? URL.createObjectURL(file) : preview}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline text-sm  text-center"
                    >
                      {file ? file.name : preview.split('/').pop()}
                    </a>
                  ) : (
                    <span className="text-gray-500">No file</span>
                  )
                )}
              </div>
              {/* Dropzone */}
              <div
                onDrop={handleDrop(typeKey)} onDragOver={handleDragOver}
                onClick={() => document.getElementById(`${typeKey}-input`)?.click()}
                className="flex flex-col items-center p-4 border-dashed border-2 border-gray-300 rounded cursor-pointer"
              >
                <span className="text-2xl">📂</span>
                <p className="mt-2 text-sm">
                  {file ? file.name : 'Drag & drop or '}\

                  <span className="underline text-blue-500">Browse</span>
                </p>
              </div>
              {/* Constraints hint */}
              <p className="text-xs text-gray-500  text-center">
                {typeKey === 'File' && 'TXT, DOC/DOCX, PDF (max 15MB)'}
                {typeKey === 'Video' && 'MP4, MOV (max 1GB)'}
                {typeKey === 'Thumbnail' && 'JPEG, PNG (max 15MB)'}
              </p>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          );
        })}
      </div>
    )
  }
      </div >
    </div >
  );
}
