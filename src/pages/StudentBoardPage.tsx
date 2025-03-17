import React from 'react';
import StudentBoard from '../components/StudentBoard';

const StudentBoardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-950 pt-20">
      <StudentBoard />
    </div>
  );
};

export default StudentBoardPage; 