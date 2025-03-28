import Head from "next/head";

const StatCard = ({ number, label }:any) => (
  <div className="border border-gray-200 bg-white p-4 text-center shadow-sm rounded-lg flex-1">
    <div className="text-2xl font-bold text-gray-800">{number}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

const SearchBar = () => (
  <div className="flex flex-wrap items-center space-x-2 border border-gray-200 p-2 rounded-lg bg-white shadow-sm">
    <input
      type="text"
      placeholder="Search course name"
      className="border border-gray-200 rounded px-3 py-1 flex-grow text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <select className="border border-gray-200 rounded px-3 py-1 text-sm focus:outline-none">
      <option>ALL</option>
    </select>
    <select className="border border-gray-200 rounded px-3 py-1 text-sm focus:outline-none">
      <option>ALL status</option>
    </select>
    <select className="border border-gray-200 rounded px-3 py-1 text-sm focus:outline-none">
      <option>Activity: most recent</option>
    </select>
    <select className="border border-gray-200 rounded px-3 py-1 text-sm focus:outline-none">
      <option>Feedback number:</option>
    </select>
    <button className="bg-blue-500 text-white rounded px-4 py-1 text-sm flex items-center hover:bg-blue-600 transition-colors">
      <svg
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      Search
    </button>
    <button className="bg-red-500 text-white rounded px-4 py-1 text-sm hover:bg-red-600 transition-colors">
      Lock and send email
    </button>
  </div>
);

const Table = () => (
  <table className="table-auto w-full border border-gray-200 rounded-lg shadow-sm">
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        <th className="px-4 py-2 text-left text-sm font-semibold">Course name</th>
        <th className="px-4 py-2 text-left text-sm font-semibold">student ID</th>
        <th className="px-4 py-2 text-left text-sm font-semibold">title</th>
        <th className="px-4 py-2 text-left text-sm font-semibold">content</th>
        <th className="px-4 py-2 text-left text-sm font-semibold">IMAGE</th>
      </tr>
    </thead>
    <tbody>
      <tr className="text-gray-800 hover:bg-gray-50 transition-colors">
        <td className="border px-4 py-2 text-sm">Spring boot</td>
        <td className="border px-4 py-2 text-sm">12xxxxx</td>
        <td className="border px-4 py-2 text-sm truncate max-w-xs">Khóa học Không phù...</td>
        <td className="border px-4 py-2 text-sm truncate max-w-xs">Khóa học tạo tào...</td>
        <td className="border px-4 py-2 text-sm flex items-center">
          IMAGE
          
        </td>
      </tr>
    </tbody>
  </table>
);

export default function Home() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans">
      <Head>
        <title>Course Management Dashboard</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="flex space-x-4 mb-6">
        <StatCard number="12" label="number courses" />
        <StatCard number="5" label="feedback number" />
        <StatCard number="7" label="students" />
      </div>
      <div>
        <SearchBar />
        <div className="mt-4">
          <Table />
        </div>
      </div>
    </div>
  );
}