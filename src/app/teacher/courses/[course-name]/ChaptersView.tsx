"use client";
import React from 'react';
import Table from '../../../../components/course/Table';
import Pagination from '../../../../components/course/Pagination';

interface ChapterData {
  id: number;
  chapter: number;
  title: string;
  type: string;
  date: string;
  status: string;
}

const columns: string[] = ['ID', 'Chapter', 'Title', 'Type', 'Date', 'Status'];

const data: ChapterData[] = [
  {
    id: 1,
    chapter: 1,
    title: 'Introduction to Spring Boot',
    type: 'PDF',
    date: '15 May 2020 9:00 am',
    status: 'Publish',
  },
  {
    id: 2,
    chapter: 2,
    title: 'Setting Up the Development Environment',
    type: 'PDF',
    date: '15 May 2020 9:00 am',
    status: 'Publish',
  },
  {
    id: 3,
    chapter: 3,
    title: 'Spring Boot Architecture & Dependency Injection',
    type: 'PPT',
    date: '15 May 2020 9:00 am',
    status: 'Draft',
  },
];

export default function ChaptersView() {
  return (
    <div>
      <div className="flex justify-end mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          + Add Chapter
        </button>
      </div>
      <Table columns={columns} data={data} />
      <Pagination />
    </div>
  );
}