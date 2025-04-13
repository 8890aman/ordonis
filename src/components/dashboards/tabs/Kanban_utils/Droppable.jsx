import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id || 'droppable',
  });

  // Modern, white and gold styles with Tailwind CSS
  const baseStyles = `
    flex
    flex-col
    items-center
    justify-start
    min-h-[200px]
    bg-white
    border
    border-gold-200
    rounded-xl
    p-6
    transition-all
    duration-500
    ease-out
    relative
    overflow-hidden
    ${
      isOver
        ? 'scale-105 shadow-lg bg-gold-50/50'
        : 'shadow-[inset_4px_4px_12px_rgba(0,0,0,0.05),inset_-4px_-4px_12px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_8px_rgba(0,0,0,0.1),inset_-2px_-2px_8px_rgba(255,255,255,1)]'
    }
  `;

  return (
    <div
      ref={setNodeRef}
      className={`${baseStyles}`}
    >
      {/* Dynamic ripple effect */}
      <div
        className={`
          absolute 
          w-32 
          h-32 
          rounded-full 
          blur-2xl 
          transition-all 
          duration-700
          ${isOver ? 'bg-gold-100/40 scale-150' : 'bg-gold-50/20 scale-100'}
          -top-8 
          -left-8
        `}
      />

      {/* Content container */}
      <div className="relative z-10 w-full h-full">
        {props.children}
      </div>

      {/* Floating dot effect when active */}
      {isOver && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-2 h-2 bg-gold-500 rounded-full animate-float shadow-md top-1/4 left-1/3" />
          <div className="absolute w-3 h-3 bg-gold-500 rounded-full animate-float delay-150 shadow-md top-2/3 right-1/4" />
          <div className="absolute w-1 h-1 bg-gold-500 rounded-full animate-float delay-300 shadow-md bottom-1/4 left-2/3" />
        </div>
      )}

      {/* Subtle edge glow */}
      <div
        className={`
          absolute 
          inset-0 
          rounded-xl 
          pointer-events-none
          transition-opacity
          duration-300
          ${isOver ? 'opacity-100' : 'opacity-0'}
          shadow-[0_0_15px_rgba(255,215,0,0.3)]
        `}
      />
    </div>
  );
}

// Add this to your global CSS for the animation
/*
@layer utilities {
  .animate-float {
    animation: float 2s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }
}
*/