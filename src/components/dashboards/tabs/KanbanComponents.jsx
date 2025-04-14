import React from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Card, Typography } from '@material-tailwind/react';

export function SimpleDraggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id || 'draggable',
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Card className="p-3">
        <Typography>{props.task?.title || 'Task'}</Typography>
      </Card>
    </div>
  );
}

export function SimpleDroppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id || 'droppable',
  });

  return (
    <div 
      ref={setNodeRef} 
      className={`border-2 p-4 rounded-lg ${isOver ? 'border-blue-500' : 'border-gray-200'}`}
    >
      {props.children}
    </div>
  );
} 