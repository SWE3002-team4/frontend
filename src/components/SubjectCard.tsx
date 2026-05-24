"use client";

import React from 'react';
import Link from 'next/link';

interface SubjectCardProps {
  id: string;
  title: string;
  thumbnail: string;
  masteryScore: number;
}

export function SubjectCard({ id, title, thumbnail, masteryScore }: SubjectCardProps) {
  return (
    <Link 
      href={`/subject/${id}`}
      className="group flex flex-col bg-white border border-gray-200 rounded overflow-hidden hover:shadow-sm transition-shadow cursor-pointer"
    >
      {/* Image & Progress */}
      <div className="relative h-40 w-full bg-gray-200 border-b border-gray-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded shadow-sm border border-gray-200 flex flex-col items-end">
          <span className="text-[10px] text-gray-500 uppercase font-bold">숙련도</span>
          <span className="text-sm font-bold text-blue-600">
            {masteryScore}%
          </span>
        </div>
      </div>
      
      {/* Title */}
      <div className="p-3 bg-white flex-1">
        <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
          {title}
        </h3>
      </div>
    </Link>
  );
}
