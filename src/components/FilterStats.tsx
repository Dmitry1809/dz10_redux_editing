import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilterStats } from '../selectors';

export const FilterStats: React.FC = () => {
  const { found, total } = useSelector(selectFilterStats);

  return (
    <div style={{ marginBottom: '15px', fontSize: '14px', color: '#666' }}>
      <strong>Статистика:</strong> Найдено {found} из {total} услуг
    </div>
  );
};
