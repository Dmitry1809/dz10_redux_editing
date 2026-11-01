import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, FormErrors } from '../types';
import { setFormField, addService, updateService, clearForm, cancelEditing, setValidationErrors } from '../actions';

export const ServiceForm: React.FC = () => {
  const { name, price, editingId, errors } = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();

  const validateForm = (nameValue: string, priceValue: string): FormErrors => {
    const currentErrors: FormErrors = {};
    if (!nameValue.trim() || nameValue.trim().length < 2) {
      currentErrors.name = 'Название должно содержать минимум 2 символа';
    }
    const parsedPrice = Number(priceValue);
    if (!priceValue.trim() || isNaN(parsedPrice) || parsedPrice <= 0) {
      currentErrors.price = 'Цена должна быть числом больше 0';
    }
    return currentErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: field, value } = e.target;
    dispatch(setFormField(field as 'name' | 'price', value));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(name, price);

    if (Object.keys(validationErrors).length > 0) {
      dispatch(setValidationErrors(validationErrors));
      return;
    }

    if (editingId) {
      dispatch(updateService(editingId, name.trim(), Number(price)));
    } else {
      dispatch(addService(name.trim(), Number(price)));
    }
    dispatch(clearForm());
  };

  const handleCancel = () => {
    dispatch(cancelEditing());
  };

  // Вынесенные общие стили для инпутов, чтобы избежать дублирования
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    marginTop: '4px'
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px', borderRadius: '5px', boxSizing: 'border-box' }}>
      <h3 style={{ marginTop: 0 }}>
        {editingId ? `Редактирование услуги (ID: ${editingId})` : 'Добавление новой услуги'}
      </h3>
      
      {/* Каждое поле оборачиваем в flex-контейнер с направлением column */}
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '12px' }}>
        <label style={{ fontWeight: 'bold', fontSize: '14px' }}>
          Название услуги:
          <input type="text" name="name" value={name} onChange={handleChange} style={inputStyle} />
        </label>
        {errors.name && <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.name}</div>}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px' }}>
        <label style={{ fontWeight: 'bold', fontSize: '14px' }}>
          Цена (руб.):
          <input type="text" name="price" value={price} onChange={handleChange} style={inputStyle} />
        </label>
        {errors.price && <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.price}</div>}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>Save</button>
        {editingId && (
          <button type="button" onClick={handleCancel} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
