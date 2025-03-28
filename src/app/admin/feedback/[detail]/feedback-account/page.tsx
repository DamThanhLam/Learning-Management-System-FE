// page.tsx
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import React from 'react';

// Thành phần thống kê
const Statistics: React.FC = () => {
  return (
    <div style={styles.statsContainer}>
      <div style={styles.statBox}>
        <h2 style={styles.number}>12</h2>
        <p style={styles.label}>people</p>
      </div>
      <div style={styles.separator}></div>
      <div style={styles.statBox}>
        <h2 style={styles.number}>5</h2>
        <p style={styles.label}>feedback number</p>
      </div>
    </div>
  );
};


// Thành phần bảng
const Table: React.FC = () => {
  const sampleData = [
    {
      email: '@gmail.com',
      description: 'Khóa học không phù...',
    },
    // Bạn có thể thêm dữ liệu mẫu khác nếu cần
  ];

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Email</th>
          <th style={styles.th}>Title</th>
          <th style={styles.th}>Description</th>
          <th style={styles.th}>Image</th>
          <th style={styles.th}>Action</th>
        </tr>
      </thead>
      <tbody>
        {sampleData.map((row, index) => (
          <tr key={index}>
            <td style={styles.td}>{row.email}</td>
            <td style={styles.td}>
              <div style={styles.titlePlaceholder}>a</div>
            </td>
            <td style={styles.td}>{row.description}</td>
            <td style={styles.td}>
              <div style={styles.imageContainer}>
                <div style={styles.imagePlaceholder}>😀</div>
                <div style={styles.imagePlaceholder}>😀</div>
                <div style={styles.imagePlaceholder}>😀</div>
              </div>
            </td>
            <td style={styles.td}>
              <button style={styles.openButton}>OPEN</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Thành phần chính
const Dashboard: React.FC = () => {
  return (
    <div style={styles.mainContainer}>
      <div style={styles.sections}>
        <div style={styles.wrapper}>
          <Statistics />
        </div>
        <div style={styles.wrapper}>
          <Table />
        </div>
      </div>
    </div>
  );
};

// Kiểu dáng CSS
const styles: { [key: string]: React.CSSProperties } = {
  mainContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  sections: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  wrapper: {
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    padding: '16px',
  },
  statsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statBox: {
    textAlign: 'center',
  },
  number: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#000000',
    margin: '0',
  },
  label: {
    fontSize: '14px',
    color: '#6B7280',
    margin: '4px 0 0 0',
  },
  separator: {
    width: '1px',
    height: '50px',
    backgroundColor: '#E5E7EB',
  },
  searchFilterContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  searchInputContainer: {
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '20px',
    height: '20px',
    color: '#6B7280',
  },
  searchInput: {
    padding: '8px 12px 8px 40px',
    border: '1px solid #E5E7EB',
    borderRadius: '4px',
    width: '200px',
    fontSize: '14px',
  },
  dropdown: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #E5E7EB',
    borderRadius: '4px',
    padding: '8px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  dropdownIcon: {
    width: '16px',
    height: '16px',
    marginLeft: '4px',
    color: '#6B7280',
  },
  searchButton: {
    backgroundColor: '#3B82F6',
    color: '#FFFFFF',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #E5E7EB',
    fontSize: '14px',
    color: '#6B7280',
    fontWeight: 'bold',
  },
  td: {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #E5E7EB',
    fontSize: '14px',
  },
  titlePlaceholder: {
    width: '100px',
    height: '16px',
    borderRadius: '4px',
  },
  imageContainer: {
    display: 'flex',
    gap: '4px',
  },
  imagePlaceholder: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#E5E7EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
  },
  maxBadge: {
    backgroundColor: '#E5E7EB',
    borderRadius: '4px',
    padding: '4px 8px',
    fontSize: '14px',
  },
  openButton: {
    backgroundColor: '#10B981',
    color: '#FFFFFF',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

// Xuất trang chính
export default function Home() {
  return <Dashboard />;
}