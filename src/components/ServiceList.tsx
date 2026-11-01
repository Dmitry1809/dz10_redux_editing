import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import type { Service, SortKey, SortOrder, RootState } from '../types';
import { deleteService, startEditing, clearForm } from '../actions';
import { selectFilteredServices } from '../selectors';
import { Modal } from './Modal';

export const ServiceList: React.FC = () => {
  // Заменяем обычный items на отфильтрованный через селектор
  const filteredItems = useSelector(selectFilteredServices);
  const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);
  const editingId = useSelector((state: RootState) => state.form.editingId);
  const dispatch = useDispatch();

  const [sortKey, setSortKey] = useState<SortKey>('none');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Service | null>(null);

  // Сортировка применяется уже поверх отфильтрованного списка
  const sortedItems = useMemo(() => {
    if (sortKey === 'none') return filteredItems;

    return [...filteredItems].sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortOrder === 'asc' 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      }
      
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      }

      return 0;
    });
  }, [filteredItems, sortKey, sortOrder]);

  const handleEdit = (item: Service) => {
    dispatch(startEditing(item));
  };

  const openDeleteModal = (item: Service) => {
    setItemToDelete(item);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      dispatch(deleteService(itemToDelete.id));
      if (editingId === itemToDelete.id) {
        dispatch(clearForm());
      }
    }
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  // Функция для подсветки найденного текста (Бонус)
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, index) => 
          regex.test(part) 
            ? <mark key={index} style={{ backgroundColor: '#fff3bf', padding: '0 2px' }}>{part}</mark> 
            : part
        )}
      </span>
    );
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center', fontSize: '14px', marginLeft: 'auto' }}>
          <label>Сортировка: </label>
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}>
            <option value="none">Без сортировки</option>
            <option value="name">По названию</option>
            <option value="price">По цене</option>
          </select>
          {sortKey !== 'none' && (
            <button 
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              style={{ padding: '2px 6px', cursor: 'pointer' }}
            >
              {sortOrder === 'asc' ? '▲' : '▼'}
            </button>
          )}
        </div>
      </div>

      {sortedItems.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>Услуги не найдены</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, overflow: 'hidden' }}>
          <AnimatePresence initial={false}>
            {sortedItems.map((item) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: 20 }}
                transition={{ type: 'spring', duration: 0.4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px',
                  borderBottom: '1px solid #eee',
                  backgroundColor: editingId === item.id ? '#fff9db' : 'transparent',
                }}
              >
                {/* Подсвечиваем текст в названии услуги */}
                <span>{highlightText(item.name, searchTerm)} — {item.price} руб.</span>
                <div>
                  <button onClick={() => handleEdit(item)} style={{ marginRight: '10px', cursor: 'pointer' }}>✎ Редактировать</button>
                  <button onClick={() => openDeleteModal(item)} style={{ color: 'red', cursor: 'pointer' }}>✕</button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}

      <Modal 
        isOpen={isModalOpen}
        title={itemToDelete ? `Вы действительно хотите удалить услугу "${itemToDelete.name}"?` : ''}
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};
