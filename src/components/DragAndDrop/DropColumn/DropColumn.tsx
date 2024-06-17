import React, { Draggable, DraggingStyle, Droppable, NotDraggingStyle } from 'react-beautiful-dnd';
import { Item } from '../../../App';
import classes from './dropColumn.module.css';

const getItemStyle = (
  isDragging: boolean,
  isInvalidMove: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
) => ({
  UserSelect: 'none',
  background: isDragging ? (isInvalidMove ? 'red' : 'lightgreen') : '#93c5fd',
  ...draggableStyle,
});

const getDropColumnStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : '#e5e7eb',
});

interface DropColumn {
  id: string;
  items: Item[];
  draggingItemId: string | null;
}

export default function DropColumn({ id, items, draggingItemId }: DropColumn) {
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
                      provided.draggableProps.style,
                    )}
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
