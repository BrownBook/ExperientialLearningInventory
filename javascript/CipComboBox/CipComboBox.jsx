import React, { useMemo } from 'react';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { getCipCodes } from '../api/api';
import DownshiftCombobox from '../DownshiftCombobox/DownshiftCombobox';

export default function CipComboBox() {
  const cipQuery = useQuery({ queryKey: ['cipCodes'], queryFn: getCipCodes });

  if (cipQuery.isPending) {
    return 'Loading...';
  }

  if (cipQuery.error) {
    return 'An error has occurred: ' + cipQuery.error.message;
  }

  const filterFunction = useMemo(inputValue => {
    const lowerCasedInputValue = inputValue.toLowerCase();

    return function booksFilter(book) {
      return !inputValue || book.title.toLowerCase().includes(lowerCasedInputValue) || book.author.toLowerCase().includes(lowerCasedInputValue);
    };
  });

  const books = [
    { id: 'book-1', author: 'Harper Lee', title: 'To Kill a Mockingbird' },
    { id: 'book-2', author: 'Lev Tolstoy', title: 'War and Peace' },
    { id: 'book-3', author: 'Fyodor Dostoyevsy', title: 'The Idiot' },
    { id: 'book-4', author: 'Oscar Wilde', title: 'A Picture of Dorian Gray' },
    { id: 'book-5', author: 'George Orwell', title: '1984' },
    { id: 'book-6', author: 'Jane Austen', title: 'Pride and Prejudice' },
    { id: 'book-7', author: 'Marcus Aurelius', title: 'Meditations' },
    {
      id: 'book-8',
      author: 'Fyodor Dostoevsky',
      title: 'The Brothers Karamazov'
    },
    { id: 'book-9', author: 'Lev Tolstoy', title: 'Anna Karenina' },
    { id: 'book-10', author: 'Fyodor Dostoevsky', title: 'Crime and Punishment' }
  ];

  return (
    <div>
      <DownshiftCombobox items={books} getFilterFunc={filterFunction} />
    </div>
  );
}
