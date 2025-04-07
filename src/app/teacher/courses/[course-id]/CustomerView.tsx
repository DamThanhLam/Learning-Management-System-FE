"use client";
import React from 'react';
import Table from '../../../../components/course/Table';
import Pagination from '../../../../components/course/Pagination';
import { useParams } from 'next/navigation';

interface CustomerData {
  id: number;
  customer: string;
  type: string;
  country: string;
  joined: string;
  total_amount: string;
  last_order: string;
}

const columns: string[] = [
  'ID',
  'Customer',
  'Type',
  'Country',
  'Joined',
  'Total Amount',
  'Last Order',
];

const data: CustomerData[] = [
  {
    id: 1,
    customer: 'Ronald Richards',
    type: 'Student',
    country: 'India',
    joined: '15 May 2020 8:00 am',
    total_amount: '$500.00',
    last_order: '12542',
  },
  {
    id: 2,
    customer: 'Darlene Robertson',
    type: 'Student',
    country: 'India',
    joined: '15 May 2020 8:00 am',
    total_amount: '$500.00',
    last_order: '46540',
  },
  {
    id: 3,
    customer: 'Jerome Bell',
    type: 'Teacher',
    country: 'Sri Lanka',
    joined: '15 May 2020 9:00 am',
    total_amount: '$500.00',
    last_order: '68745',
  },
];

export default function CustomerView() {
  const params = useParams();
  const courseId = params["course-id"] as string;
  return (
    <div>
      <Table columns={columns} data={data} />
      <Pagination />
    </div>
  );
}