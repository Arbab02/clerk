'use client';

import { useEffect, useState } from 'react';

export default function ViewPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await fetch('/api/items');
    const data = await res.json();
    setStudents(data);
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Students List</h1>
      {students.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {students.map((student) => (
            <li
              key={student._id}
              className="border p-4 rounded shadow-lg"
            >
              <p className="text-lg font-semibold mb-2">{student.name}</p>
              <p><strong>Course:</strong> {student.course}</p>
              <p><strong>Roll No:</strong> {student.rollNo}</p>
              <p><strong>Batch:</strong> {student.batch}</p>
              <p><strong>Timing:</strong> {student.timing}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No students to display.</p>
      )}
    </main>
  );
}
