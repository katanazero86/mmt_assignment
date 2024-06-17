import React, { Draggable, Droppable } from 'react-beautiful-dnd';
import { Item } from '../../../App';
import classes from './dropColumn.module.css';

interface DropColumn {
  id: string;
  items: Item[];
}

export default function DropColumn({ id, items }: DropColumn) {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div className={classes.dropColumn} {...provided.droppableProps} ref={provided.innerRef}>
          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={classes.item}
                >
                  {item.content}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
