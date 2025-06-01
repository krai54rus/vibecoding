import React from 'react';

interface DragNDropItemProps {
  id: string;
  children: React.ReactNode;
  onDragStart?: (e: React.DragEvent, id: string) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  className?: string;
}

export const DragNDropItem: React.FC<DragNDropItemProps> = ({
  id,
  children,
  onDragStart,
  onDragEnd,
  className = '',
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    // Create a ghost image of the dragged element
    const draggedElement = e.currentTarget as HTMLElement;
    const ghost = draggedElement.cloneNode(true) as HTMLElement;
    ghost.style.position = 'absolute';
    ghost.style.top = '-1000px';
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 0, 0);
    
    // Clean up ghost element after drag starts
    setTimeout(() => {
      document.body.removeChild(ghost);
    }, 0);

    e.dataTransfer.setData('text/plain', id);
    onDragStart?.(e, id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      className={`drag-drop-item ${className}`}
      style={{ cursor: 'move' }}
    >
      {children}
    </div>
  );
}; 