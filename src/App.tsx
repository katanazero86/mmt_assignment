import React, { useCallback, useEffect, useState } from 'react';
import { DragDropContext, DragUpdate, DropResult } from 'react-beautiful-dnd';
import DropColumn from './components/DragAndDrop/DropColumn/DropColumn';

const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

const isEven = (targetIndex: number) => targetIndex % 2 === 0;

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
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
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
      setDraggingItemId(null);
      if (!result.destination) return;
      const { droppableId: destinationDroppableId, index: destinationIndex } = result.destination;
      const { droppableId: sourceDroppableId, index: sourceIndex } = result.source;

      if (sourceDroppableId === 'column1' && destinationDroppableId === 'column3') return; // 첫번째 컬럼에서, 세번째 컬럼으로 이동 불가능
      if (isEven(sourceIndex) && !isEven(destinationIndex)) return; // 짝수 아이템은 다른 짝수 아이템 앞으로 이동 불가능(짝수 아이템은 홀수번째로 이동 불가능)

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

  const onDragUpdate = useCallback((update: DragUpdate) => {
    const destination = update.destination;
    if (destination) {
      const { droppableId: destinationDroppableId, index: destinationIndex } = destination;
      const sourceIndex = update.source.index;

      if (isEven(sourceIndex) && !isEven(destinationIndex)) {
        setDraggingItemId(update.draggableId);
      } else {
        setDraggingItemId(null);
      }
    } else {
      setDraggingItemId(update.draggableId);
    }
  }, []);

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
      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
        <hr />
        <section
          style={{
            display: 'flex',
            columnGap: '8px',
            justifyContent: 'space-around',
          }}
        >
          {Object.keys(columns).map((id: string) => (
            <DropColumn key={id} id={id} items={columns[id]} draggingItemId={draggingItemId} />
          ))}
        </section>
      </DragDropContext>
    </>
  );
}
