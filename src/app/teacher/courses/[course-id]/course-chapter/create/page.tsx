'use client'
import React, { useState, ChangeEvent, DragEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BASE_URL_LECTURE_SERVICE } from '@/utils/BaseURL';

// Types for resources
type ResourceType = 'File' | 'Video' | 'Thumbnail';
interface ResourceState {
  file: File | null;
  error: string;
}

export default function ChapterManagement() {
  const [activeTab, setActiveTab] = useState<'Details' | 'Resources'>('Details');
  const params = useParams();
  const router = useRouter();
  const courseId = params['course-id'] as string;

  // Chapter number state & error
  const [chapter, setChapter] = useState<number>(1);
  const [chapterError, setChapterError] = useState<string>('');

  // Title & Description state & errors
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [titleError, setTitleError] = useState<string>('');
  const [descError, setDescError] = useState<string>('');

  // Resource state
  const initialResources: Record<ResourceType, ResourceState> = {
    File: { file: null, error: '' },
    Video: { file: null, error: '' },
    Thumbnail: { file: null, error: '' }
  };
  const [resources, setResources] = useState(initialResources);

  // Validation handlers
  const handleChapterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value, 10);
    if (isNaN(num) || num <= 0) {
      setChapterError('Chapter must be a positive number');
    } else {
      setChapterError('');
      setChapter(num);
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.trim()) {
      setTitleError('Title is required');
    } else if (value.length > 50) {
      setTitleError('Title cannot exceed 50 characters');
    } else {
      setTitleError('');
    }
    setTitle(value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (!value.trim()) {
      setDescError('Description is required');
    } else if (value.length > 1000) {
      setDescError('Description cannot exceed 1000 characters');
    } else {
      setDescError('');
    }
    setDescription(value);
  };

  // Resource handlers & validation
  const handleFileSelect = (type: ResourceType) => (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    validateAndSet(type, file);
  };

  const handleDrop = (type: ResourceType) => (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    validateAndSet(type, file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const validateAndSet = (type: ResourceType, file: File | null) => {
    let error = '';
    if (!file) {
      error = 'File selection failed';
    } else {
      const sizeMB = file.size / (1024 * 1024);
      switch (type) {
        case 'File':
          if (!['text/plain','application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
            error = 'Only TXT, PDF, DOC/DOCX allowed';
          } else if (sizeMB > 15) {
            error = 'Max size 15MB';
          }
          break;
        case 'Video':
          if (!['video/mp4', 'video/quicktime'].includes(file.type)) {
            error = 'Only MP4, MOV allowed';
          } else if (sizeMB > 1024) {
            error = 'Max size 1GB';
          }
          break;
        case 'Thumbnail':
          if (!['image/jpeg', 'image/png'].includes(file.type)) {
            error = 'Only JPEG, PNG allowed';
          } else if (sizeMB > 15) {
            error = 'Max size 15MB';
          }
          break;
      }
    }
    setResources(prev => ({
      ...prev,
      [type]: { file: error ? null : file, error }
    }));
  };

  // Submit handler
  const handleAddChapter = async (status: 'DRAFT' | 'PUBLISHED') => {
    // final validation
    if (!title.trim()) setTitleError('Title is required');
    if (!description.trim()) setDescError('Description is required');
    if (!chapter || chapter <= 0) setChapterError('Chapter must be a positive number');

    // if publishing, require file, video, thumbnail
    if (status === 'PUBLISHED') {
      (Object.keys(resources) as ResourceType[]).forEach(type => {
        if(type !== "File") return
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
        `${BASE_URL_LECTURE_SERVICE}/courses/${courseId}/lectures`,
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
    <div className="flex max-h-screen bg-gray-100 w-4/5 overflow-y-auto no-scrollbar">
      <div className="flex-1 p-6">
        {/* Header with chapter input */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <button onClick={() => router.back()} className="text-4xl">&#8249;</button>
            <span className="text-lg font-bold">Chapter</span>
            <div className="relative">
              <input
                type="number"
                min={1}
                value={chapter}
                onChange={handleChapterChange}
                className="w-20 p-2 border rounded"
              />
              {chapterError && (
                <p className="absolute top-full text-red-500 text-sm">{chapterError}</p>
              )}
            </div>
          </div>
          <div className="flex space-x-4">
            <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
            <button
              onClick={() => handleAddChapter('DRAFT')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >Move to Draft</button>
            <button
              onClick={() => handleAddChapter('PUBLISHED')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >Add Chapter</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 border-b">
          {['Details', 'Resources'].map(tab => (
            <button
              key={tab}
              className={`pb-2 ${activeTab === tab ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'} text-sm font-medium`}
              onClick={() => setActiveTab(tab as any)}
            >{tab}</button>
          ))}
        </div>

        {/* Details Tab */}
        {activeTab === 'Details' && (
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium">Title*</label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter chapter title"
                className="mt-1 w-full p-2 border rounded"
              />
              <div className="text-right text-xs text-gray-500">{title.length}/50</div>
              {titleError && <p className="text-red-500 text-sm">{titleError}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Description*</label>
              <textarea
                rows={20}
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Enter chapter description"
                className="mt-1 w-full p-2 border rounded"
              />
              <div className="text-right text-xs text-gray-500">{description.length}/1000</div>
              {descError && <p className="text-red-500 text-sm">{descError}</p>}
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'Resources' && (
          <div className="mt-6 space-y-6">
            {(Object.keys(resources) as ResourceType[]).map(type => {
              const { file, error } = resources[type];
              return (
                <div key={type} className="border p-4 rounded bg-gray-50">
                  <label className="font-medium block mb-2">{type}{type==="File"?"*":""}</label>
                  <div
                    onDrop={handleDrop(type)}
                    onDragOver={handleDragOver}
                    onClick={() => document.getElementById(`${type}-input`)?.click()}
                    className="flex flex-col items-center p-6 border-2 border-dashed rounded cursor-pointer"
                  >
                    <span className="text-2xl">📂</span>
                    <p className="mt-2">
                      {file ? file.name : 'Drag & drop or '}
                      <span className="underline text-blue-500">Browse</span>
                    </p>
                    <input
                      id={`${type}-input`}
                      type="file"
                      accept={
                        type === 'File'
                          ? '.txt,.pdf,.doc,.docx'
                          : type === 'Video'
                          ? '.mp4,.mov'
                          : '.jpeg,.jpg,.png'
                      }
                      className="hidden"
                      onChange={handleFileSelect(type)}
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      {type === 'File' && 'TXT, DOC/DOCX, PDF (max 15MB)'}
                      {type === 'Video' && 'MP4, MOV (max 1GB)'}
                      {type === 'Thumbnail' && 'JPEG, PNG (max 15MB)'}
                    </p>
                  </div>
                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
