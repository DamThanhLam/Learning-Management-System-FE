"use client";
import React, { useEffect, useState } from 'react';
import Table from '../../../../components/course/Table';
import Pagination from '../../../../components/course/Pagination';
import { BASE_URL_LECTURE_SERVICE, BASE_URL_REVIEW_SERVICE } from '@/utils/BaseURL';
import { useParams, useRouter } from 'next/navigation';

interface ChapterData {
  id: number;
  chapter: number;
  title: string;
  type: string;
  date: string;
  status: string;
}

const columns: string[] = ['ID', 'Chapter', 'Title', 'Type', 'Updated At', 'Status'];

export default function ChaptersView() {
  const params = useParams();
  const router = useRouter()
  const [data, setData] = useState<ChapterData[]>([]);
  const courseId = params["course-id"] as string;
  useEffect(() => {
    fetch(BASE_URL_LECTURE_SERVICE + "/teacher/courses/" + courseId + "/lectures", {
      method: 'GET',
      credentials: "include",
    }).then(res => res.json())
      .then(data => {
        setData(data.lectures||[])
      })
  }, [])
  return (
    <div>
      <div className="flex justify-end mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={()=>{
          router.push("/teacher/courses/"+courseId+"/course-chapter/create")
        }}>
          + Add Chapter
        </button>
      </div>
      <Table columns={columns} data={data} />
      {/* <Pagination /> */}
    </div>
  );
}