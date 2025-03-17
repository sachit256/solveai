import React from 'react';
import StudentBoard from '../components/StudentBoard';

const StudentBoardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <StudentBoard />
    </div>
  );
};

export default StudentBoardPage; 