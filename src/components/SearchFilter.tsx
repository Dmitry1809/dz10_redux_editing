import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, clearSearch } from '../actions';
import type { RootState } from '../types';

export const SearchFilter: React.FC = () => {
  const globalSearchTerm = useSelector((state: RootState) => state.filter.searchTerm);
  const dispatch = useDispatch();
  
  // Локальный стейт для мгновенного отображения ввода
  const [inputValue, setInputValue] = useState(globalSearchTerm);
  const [prevGlobalSearchTerm, setPrevGlobalSearchTerm] = useState(globalSearchTerm);
  const inputRef = useRef<HTMLInputElement>(null);

  // Синхронизируем стейт во время рендеринга, если глобальный фильтр изменился извне (например, сброшен)
  if (globalSearchTerm !== prevGlobalSearchTerm) {
    setInputValue(globalSearchTerm);
    setPrevGlobalSearchTerm(globalSearchTerm);
  }

  // Эффект исключительно для Debounce (отправка в Redux)
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearchTerm(inputValue));
    }, 300);

    return () => clearTimeout(handler);
  }, [inputValue, dispatch]);

  const handleClear = () => {
    setInputValue('');
    dispatch(clearSearch());
    inputRef.current?.focus();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', position: 'relative', width: '100%' }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Поиск услуг..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 35px 10px 10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          boxSizing: 'border-box'
        }}
      />
      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          style={{
            position: 'absolute',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            color: '#999'
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};
