export interface Service {
  id: string;
  name: string;
  price: number;
}

export interface FormErrors {
  name?: string;
  price?: string;
}

export type SortKey = 'none' | 'name' | 'price';
export type SortOrder = 'asc' | 'desc';

// Обновленный RootState с поддержкой ветки filter
export interface RootState {
  services: {
    items: Service[];
  };
  filter: {
    searchTerm: string;
  };
  form: {
    name: string;
    price: string;
    editingId: string | null;
    errors: FormErrors;
  };
}
