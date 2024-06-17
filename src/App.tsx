import React, { useCallback, useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle,
} from 'react-beautiful-dnd';
import DropColumn from './components/DragAndDrop/DropColumn/DropColumn';

const GRID = 8;

export const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
) => ({
  UserSelect: 'none',
  padding: GRID * 2,
  margin: `0 0 ${GRID}px 0`,
  background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle,
});

export const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: GRID,
  width: 250,
});

const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

const initialColumns: Columns = {
  column1: [],
  column2: [],
  column3: [],
  column4: [],
};

export interface Item {
  id: string;
  content: string;
}

interface Columns {
  [prop: string]: Item[];
}

export default function App() {
  const [columns, setColumns] = useState(() => initialColumns);

  const reorder = (
    targetColumns: Columns,
    sourceIndex: number,
    sourceDroppableId: string,
    destinationIndex: number,
    destinationDroppableId: string,
  ) => {
    const targetSourceItems = Array.from(targetColumns[sourceDroppableId]);
    const targetDestinationItems = Array.from(targetColumns[destinationDroppableId]);
    if (sourceDroppableId === destinationDroppableId) {
      const [removed] = targetSourceItems.splice(sourceIndex, 1);
      targetSourceItems.splice(destinationIndex, 0, removed);
      targetColumns[sourceDroppableId] = targetSourceItems;
    } else {
      const [removed] = targetSourceItems.splice(sourceIndex, 1);
      targetDestinationItems.splice(destinationIndex, 0, removed);
      targetColumns[sourceDroppableId] = targetSourceItems;
      targetColumns[destinationDroppableId] = targetDestinationItems;
    }
    return targetColumns;
  };

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;
      console.log(result);
      const { droppableId: destinationDroppableId, index: destinationIndex } = result.destination;
      const { droppableId: sourceDroppableId, index: sourceIndex } = result.source;
      const newColumns = reorder(
        { ...columns },
        sourceIndex,
        sourceDroppableId,
        destinationIndex,
        destinationDroppableId,
      );

      setColumns(newColumns);
    },
    [columns],
  );

  useEffect(() => {
    const newColumn1 = getItems(10);
    setColumns((prev) => {
      return {
        ...prev,
        column1: newColumn1,
      };
    });
  }, []);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {/*  <Droppable droppableId='droppable'>*/}
        {/*    {(provided, snapshot) => (*/}
        {/*      <div*/}
        {/*        {...provided.droppableProps}*/}
        {/*        ref={provided.innerRef}*/}
        {/*        style={getListStyle(snapshot.isDraggingOver)}*/}
        {/*      >*/}
        {/*        {items.map((item, index) => (*/}
        {/*          <Draggable key={item.id} draggableId={item.id} index={index}>*/}
        {/*            {(provided, snapshot) => (*/}
        {/*              <div*/}
        {/*                ref={provided.innerRef}*/}
        {/*                {...provided.draggableProps}*/}
        {/*                {...provided.dragHandleProps}*/}
        {/*                style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}*/}
        {/*              >*/}
        {/*                {item.content}*/}
        {/*              </div>*/}
        {/*            )}*/}
        {/*          </Draggable>*/}
        {/*        ))}*/}
        {/*        {provided.placeholder}*/}
        {/*      </div>*/}
        {/*    )}*/}
        {/*  </Droppable>*/}
        <hr />
        <section
          style={{
            display: 'flex',
            columnGap: '8px',
            justifyContent: 'space-around',
          }}
        >
          {Object.keys(columns).map((id: string) => (
            <DropColumn key={id} id={id} items={columns[id]} />
          ))}
        </section>
      </DragDropContext>
    </>
  );
}
