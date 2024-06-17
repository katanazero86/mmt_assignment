import React from 'react';
import classes from './dropColumn.module.css';
import { Draggable, DraggingStyle, Droppable, NotDraggingStyle } from 'react-beautiful-dnd';
import { ColumnIdType, Item } from '../../../@types/DragAndDrop.types';
import { COLUMNS_NAME } from '../../../constants/dragAndDrop.constants';

interface DropColumnProps {
  id: ColumnIdType;
  items: Item[];
  draggingItemId: string | null;
  selectedItems: Item[];
  onClick: (targetItem: Item, targetId: ColumnIdType) => void;
}

export default function DropColumn({
  id,
  items,
  draggingItemId,
  selectedItems,
  onClick,
}: DropColumnProps) {
  const handleClick = (targetItem: Item, targetId: ColumnIdType) => () => {
    onClick(targetItem, targetId);
  };

  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          className={classes.dropColumn}
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getDropColumnStyle(snapshot.isDraggingOver)}
        >
          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => {
                const isInvalidMove = draggingItemId === item.id;
                return (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={classes.item}
                    style={getItemStyle(
                      snapshot.isDragging,
                      isInvalidMove,
                      selectedItems.findIndex((sItem) => sItem.id === item.id) !== -1,
                      provided.draggableProps.style,
                    )}
                    onClick={handleClick(item, id)}
                  >
                    {item.content}
                  </div>
                );
              }}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

const getItemStyle = (
  isDragging: boolean,
  isInvalidMove: boolean,
  isSelected: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
) => ({
  UserSelect: 'none',
  background: isDragging
    ? isInvalidMove
      ? 'red'
      : 'lightgreen'
    : isSelected
      ? '#a5b4fc'
      : '#93c5fd',
  ...draggableStyle,
});

const getDropColumnStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : '#e5e7eb',
});
