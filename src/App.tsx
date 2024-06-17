import React, { useEffect, useState } from 'react';
import classes from './app.module.css';
import { DragDropContext, DragUpdate, DropResult } from 'react-beautiful-dnd';
import DropColumn from './components/DragAndDrop/DropColumn/DropColumn';
import { ColumnIdType, Columns, Item } from './@types/DragAndDrop.types';

export default function App() {
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
  const [columns, setColumns] = useState(() => initialColumns);
  const [selected, setSelected] = useState<{
    targetColumnId: ColumnIdType | '';
    selectedItems: Item[];
  }>({
    targetColumnId: '',
    selectedItems: [],
  });

  const toggleSelection = (targetItem: Item, targetId: ColumnIdType) => {
    if (selected.targetColumnId === targetId) {
      if (selected.selectedItems.includes(targetItem)) {
        setSelected((prev) => {
          return {
            ...prev,
            selectedItems: prev.selectedItems.filter((item) => item.id !== targetItem.id),
          };
        });
      } else {
        setSelected((prev) => {
          return {
            ...prev,
            selectedItems: [...prev.selectedItems, targetItem],
          };
        });
      }
    } else {
      setSelected({
        targetColumnId: targetId,
        selectedItems: [targetItem],
      });
    }
  };

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

  const reorderMulti = (
    targetColumns: Columns,
    sourceDroppableId: string,
    destinationIndex: number,
    destinationDroppableId: string,
  ) => {
    const targetSourceItems = Array.from(targetColumns[sourceDroppableId]);
    const targetDestinationItems = Array.from(targetColumns[destinationDroppableId]);
    if (sourceDroppableId === destinationDroppableId) {
      const remainingItems = targetSourceItems.filter(
        (item) => selected.selectedItems.findIndex((sItem) => sItem.id === item.id) === -1,
      );
      remainingItems.splice(destinationIndex, 0, ...selected.selectedItems);
      targetColumns[sourceDroppableId] = remainingItems;
    } else {
      const remainingItems = targetSourceItems.filter(
        (item) => selected.selectedItems.findIndex((sItem) => sItem.id === item.id) === -1,
      );
      targetDestinationItems.splice(destinationIndex, 0, ...selected.selectedItems);
      targetColumns[sourceDroppableId] = remainingItems;
      targetColumns[destinationDroppableId] = targetDestinationItems;
    }
    return targetColumns;
  };

  const onDragEnd = (result: DropResult) => {
    setDraggingItemId(null);
    if (!result.destination) return;
    const { droppableId: destinationDroppableId, index: destinationIndex } = result.destination;
    const { droppableId: sourceDroppableId, index: sourceIndex } = result.source;
    let newColumns;

    if (sourceDroppableId === 'column1' && destinationDroppableId === 'column3') return; // 첫번째 컬럼에서, 세번째 컬럼으로 이동 불가능
    if (isEven(sourceIndex) && !isEven(destinationIndex)) return; // 짝수 아이템은 다른 짝수 아이템 앞으로 이동 불가능(짝수 아이템은 홀수번째로 이동 불가능)
    if (selected.selectedItems.length > 1) {
      newColumns = reorderMulti(
        { ...columns },
        sourceDroppableId,
        destinationIndex,
        destinationDroppableId,
      );
    } else {
      newColumns = reorder(
        { ...columns },
        sourceIndex,
        sourceDroppableId,
        destinationIndex,
        destinationDroppableId,
      );
    }

    setColumns(newColumns);
    setSelected({
      targetColumnId: '',
      selectedItems: [],
    });
  };

  const onDragUpdate = (update: DragUpdate) => {
    const destination = update.destination;
    if (destination) {
      const destinationIndex = destination.index;
      const sourceIndex = update.source.index;

      if (update.source.droppableId === 'column1' && destination.droppableId === 'column3') {
        setDraggingItemId(update.draggableId);
        return;
      } else {
        setDraggingItemId(null);
      }

      if (isEven(sourceIndex) && !isEven(destinationIndex)) {
        setDraggingItemId(update.draggableId);
      } else {
        setDraggingItemId(null);
      }
    } else {
      setDraggingItemId(update.draggableId);
    }
  };

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
        <section className={classes.dragAndDropSection}>
          {Object.keys(columns).map((id: string) => (
            <DropColumn
              key={id}
              id={id as ColumnIdType}
              items={columns[id]}
              draggingItemId={draggingItemId}
              selectedItems={selected.selectedItems}
              onClick={toggleSelection}
            />
          ))}
        </section>
      </DragDropContext>
    </>
  );
}

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
