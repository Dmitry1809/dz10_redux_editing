import { createSelector } from 'reselect';
import type { RootState } from '../types';

export const selectFilteredServices = createSelector(
  [(state: RootState) => state.services.items, (state: RootState) => state.filter.searchTerm],
  (services, searchTerm) => {
    if (!searchTerm.trim()) {
      return services;
    }
    return services.filter(service =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
);

export const selectFilterStats = createSelector(
  [selectFilteredServices, (state: RootState) => state.services.items],
  (filteredServices, allServices) => ({
    found: filteredServices.length,
    total: allServices.length
  })
);
