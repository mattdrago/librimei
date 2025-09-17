"use client";

import { ReactNode, useState } from "react";
import CreateableSelect from 'react-select/creatable'
import { components, ValueContainerProps, MultiValueRemoveProps, MultiValueProps, GroupBase} from 'react-select';
import { DndContext, useSensors, useSensor, PointerSensor, KeyboardSensor, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import {
  OnChangeValue
} from 'react-select';

interface AuthorOption {
  id: string,
  label: string,
  value: string,
};

export function SortableItem({id, children} : {id:string, children: ReactNode}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

const MultiValue = (props: MultiValueProps<AuthorOption, true, GroupBase<AuthorOption>>) => {
  return (
    <SortableItem id={props.data.id}>
      <components.MultiValue {...props} />
    </SortableItem>
  );
};

const MultiValueRemove = (props: MultiValueRemoveProps<AuthorOption>) => {

  props.innerProps.onMouseDown = props.innerProps.onClick;

  return (
    <components.MultiValueRemove {...props} />
  );
};

const DroppableValueContainer = ({ children, ...props }: ValueContainerProps<AuthorOption>) => {

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
   
    if (active && over && active.id !== over.id) {
      const authors = [...props.getValue()];
      const oldIndex = authors.findIndex(author => author.id == active.id);
      const newIndex = authors.findIndex(author => author.id == over.id);

      if (oldIndex != -1 && newIndex != -1) {
        const newAuthors = arrayMove([...authors], oldIndex, newIndex);
        props.selectProps.onChange(newAuthors, {action: 'select-option', option: authors[oldIndex]});
      }
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={props.getValue().map(option => option.id)}>
        <components.ValueContainer {...props}>{children}</components.ValueContainer>
      </SortableContext>
    </DndContext>
  );
}

export function Author({ list }: { list: string[] }) {
  const [authors, setAuthors] = useState<AuthorOption[]>([]);

  const authorOptions = list.sort()
    .map((author, index) => ({ id: `${index}`, label: author, value: author }));

  const handleOnChange = (selectedOptions: OnChangeValue<AuthorOption, true>) => {
    if (selectedOptions == null) {
      selectedOptions = [];
    }

    selectedOptions.forEach(option => {
      if (option.id == null) {
        option.id = "" + Math.random().toString(36).substring(2, 9);
      }
    })

    setAuthors(() => [...selectedOptions]);
  }

  return (
    <div className="flex">
      <div className="w-1/6">
        <label htmlFor="author">Author</label>
      </div>
      <div id="author_container" className="w-5/6">
        <CreateableSelect
          components={{ MultiValue, MultiValueRemove, ValueContainer: DroppableValueContainer }}
          instanceId="author-select"
          options={authorOptions}
          isClearable
          isSearchable
          isMulti
          onChange={handleOnChange}
          value={authors}
        />
      </div>
    </div>
  );
}
