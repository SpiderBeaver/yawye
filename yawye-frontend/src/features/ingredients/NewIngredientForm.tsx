import React, { useState } from 'react';
import styles from './NewIngredientForm.module.css';

interface NewIngredientFormProps {
  show: boolean;
  onBack?: () => void;
  onCreate?: (name: string, calories: number) => void;
}

export default function NewIngredientForm({ show, onBack, onCreate }: NewIngredientFormProps) {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate?.(name, calories);
  };

  return (
    <div className={`${styles.form} ${show ? styles.onScreen : ''}`}>
      <button onClick={onBack}>back</button>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
        <input type="number" value={calories} onChange={(e) => setCalories(parseInt(e.target.value))}></input>
        <input type="submit" value="Create"></input>
      </form>
    </div>
  );
}
