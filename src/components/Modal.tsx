import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, title, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{
              backgroundColor: '#fff', padding: '20px', borderRadius: '8px',
              maxWidth: '400px', width: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              color: '#333'
            }}
          >
            <h4 style={{ marginTop: 0 }}>Подтверждение действия</h4>
            <p>{title}</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={onCancel} style={{ padding: '6px 12px', cursor: 'pointer' }}>Отмена</button>
              <button onClick={onConfirm} style={{ padding: '6px 12px', backgroundColor: '#e03131', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Удалить</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
