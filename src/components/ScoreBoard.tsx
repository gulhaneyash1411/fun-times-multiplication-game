
import React from 'react';

interface ScoreBoardProps {
  score: number;
  level: number;
}

const ScoreBoard = ({ score, level }: ScoreBoardProps) => {
  return (
    <div className="bg-gradient-to-br from-white to-yellow-100 rounded-2xl p-4 shadow-lg border-4 border-yellow-300">
      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-700">{score}</div>
          <div className="text-sm text-gray-600">Score</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-700">{level}</div>
          <div className="text-sm text-gray-600">Level</div>
        </div>
        <div className="text-3xl animate-spin-slow">🏆</div>
      </div>
    </div>
  );
};

export default ScoreBoard;
