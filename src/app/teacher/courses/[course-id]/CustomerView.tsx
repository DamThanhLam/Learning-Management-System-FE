"use client";
import React, { useEffect, useState } from 'react';
import Table from '../../../../components/course/Table';
import Pagination from '../../../../components/course/Pagination';
import { useParams } from 'next/navigation';
import { refreshToken } from '@/utils/API';
import { BASE_URL_COURSE_SERVICE, BASE_URL_USER_SERVICE } from '@/utils/BaseURL';

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
  'Customer Name',
  'Date Buy',
  'Email',
  'Amount',
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
  const [customers, setCustomers] = useState([])
  useEffect(()=>{
    refreshToken().then(()=>{
      fetch(BASE_URL_COURSE_SERVICE+"/get-customer?courseId="+courseId,{
        method:"GET",
        credentials:"include"
      }).then(res=> res.json())
      .then(data=>{
        if(data.code===200){
          setCustomers(data.data ||[])
        }else{
        }
      })
      .then(error => console.log(error))
    })
  },[]);
  return (
    <div>
      <Table columns={columns} data={customers} />
      <Pagination />
    </div>
  );
}