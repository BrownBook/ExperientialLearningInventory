import React, { useState } from 'react';
import { useCombox } from 'downshift';

export default function DownshiftCombobox({ items, getFilterFunc }) {
  const { displayedItems, setDisplayedItems } = useState(items);

  const { isOpen, getToggleButtonProps, getLabelProps, getMenuProps, getInputProps, highlightedIndex, getItemProps, selectedItem } = useCombobox({
    onInputValueChange({ inputValue }) {
      setDisplayedItems(items.filter(getFilterFunc(inputValue)));
    },
    items,
    itemToString(item) {
      return item ? item.title : '';
    }
  });

  return (
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Dropdown button
      </button>
    </div>
  );
}
