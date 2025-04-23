// components/course/Table.tsx
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

interface TableProps {
  columns: string[];
  data: Record<string, any>[];
}

export default function Table({ columns, data }: TableProps) {
  const router = useRouter();
  const params = useParams();
  const courseId = params["course-id"] as string;
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-lg shadow">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-3 text-left text-sm font-semibold text-gray-600"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            console.log(row)
            return (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                onClick={() => {
                  router.push(courseId + "/course-chapter/" + row.id)
                }}
              >
                {columns.map((col) => {
                  const key = col
                    .toLowerCase()
                    .split(' ')
                    .map((col, i) =>
                      i === 0
                        ? col
                        : col.charAt(0).toUpperCase() + col.slice(1)
                    )
                    .join('');
                  const rawValue = row[key];
                  let displayValue = rawValue;

                  // nếu rawValue là string và có thể parse thành ngày
                  if (
                    typeof rawValue === 'string' &&
                    !isNaN(Date.parse(rawValue))
                  ) {
                    const date = new Date(rawValue);
                    displayValue = date.toLocaleDateString('vi-VN', {
                      minute: "2-digit",
                      hour: "2-digit",
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    });
                  }
                  return (
                    <td key={col} className="px-4 py-3 text-sm text-gray-900 cursor-pointer"

                    >
                      {displayValue}
                    </td>
                  )
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}