"use client";

import { useState } from "react";
import CreateableSelect from 'react-select/creatable'
import { components, MultiValueGenericProps, ValueContainerProps, MultiValueRemoveProps } from 'react-select';
import { DndContext, useSensors, useSensor, PointerSensor, KeyboardSensor, closestCenter } from '@dnd-kit/core';
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

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.children}
    </div>
  );
}

const MultiValueContainer = (props: MultiValueGenericProps<AuthorOption>) => {

  return (
    <SortableItem key={props.data.id} id={props.data.id}>
      <components.MultiValueContainer {...props} />
    </SortableItem>
  );
};


function SingleValue(props) {
  return (
    <SortableItem key={props.data.id} id={props.data.id}>
      <components.SingleValue {...props} />
    </SortableItem>
  )
}

const MultiValueRemove = (props: MultiValueRemoveProps<AuthorOption>) => {
  const handleOnMouseDown = (e) => {
    setItems((items) => {
      var newItems = items.filter(item => item.id != props.data.id);
      return newItems;
    })

    e.preventDefault()
    e.stopPropagation()
  }

  return (
      <>
        <components.MultiValueRemove {...props}>
          <div onMouseDown={handleOnMouseDown}>X</div>
        </components.MultiValueRemove>
      </>
  );
};

var setItems = null;

const DroppableValueContainer = ({
  children,
  ...props
}: ValueContainerProps<AuthorOption>) => {

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const {active, over} = event;
    
    if (active && over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id == active.id);
        const newIndex = items.findIndex(item => item.id == over.id);
        
        var result = arrayMove(items, oldIndex, newIndex);
        return result;
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={props.options.map(option => option.id)}>
        <components.ValueContainer {...props}>{children}</components.ValueContainer>
      </SortableContext>
    </DndContext>
  );
}

export function Author({ list }: { list: string[] }) {
  const [authors, setAuthors] = useState<readonly AuthorOption[]>([]);
  const [authorOptions, setAuthorOptions] = useState<AuthorOption[]>(
    list.sort().map((author, index) => ({ id: `${index}`, label: author, value: author }))
  );

  setItems = setAuthors;

  const onChange = (selectedOptions: OnChangeValue<AuthorOption, true>) => {
    if (selectedOptions == null) {
      selectedOptions = [];
    }

    selectedOptions.forEach(option => {
      if(option.id == null) {
        console.log("OPTION HAS NO ID");
        option.id = "" + Math.random().toString(36).substring(2,9);

        setAuthorOptions([...authorOptions, option]);

      }
    })

    setAuthors(selectedOptions);
  }

  return (
    <div className="flex">
      <div className="w-1/6">
        <label htmlFor="author">Author</label>
      </div>
      <div id="author_container" className="w-5/6">
        <CreateableSelect
          components={{ MultiValueContainer, ValueContainer: DroppableValueContainer, MultiValueRemove, SingleValue }}
          instanceId="author-select"
          options={authorOptions}
          isClearable
          isSearchable
          isMulti
          onChange={onChange}
          value={authors}
        />
      </div>
    </div>
  );
}
