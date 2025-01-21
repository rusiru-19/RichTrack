// Ach.tsx (sub/sub.tsx)
import React from 'react';

interface Achievement {
  name: string;
  title: string;
  description: string;
}

interface AchProps {
  achievements: Achievement[] | null; 
}

const Ach: React.FC<AchProps> = ({ achievements }) => {
  if (!achievements) {
    return <div>No achievements available</div>;
  }

  if (achievements.length === 0) {
    return <div>No achievements found</div>; 
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Your Achievements</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Club Name</th>
            <th className="px-4 py-2 border">Achievement Title</th>
            <th className="px-4 py-2 border">Description</th>
          </tr>
        </thead>
        <tbody>
          {achievements.map((achievement, index) => (
            <tr key={index} className="text-center">
              <td className="px-4 py-2 border">{achievement.name}</td>
              <td className="px-4 py-2 border">{achievement.title}</td>
              <td className="px-4 py-2 border">{achievement.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ach;
