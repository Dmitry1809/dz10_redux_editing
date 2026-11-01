import React from 'react';
import { ServiceForm } from './components/ServiceForm';
import { ServiceList } from './components/ServiceList';
import { SearchFilter } from './components/SearchFilter';
import { FilterStats } from './components/FilterStats';

const App: React.FC = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
      <h1>Управление услугами</h1>
      <ServiceForm />
      <SearchFilter />
      <FilterStats />
      <ServiceList />
    </div>
  );
};

export default App;
