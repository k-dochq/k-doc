import { useState } from 'react';
import { type MedicalSpecialtyType } from '@prisma/client';

export function useProcedureFilter(initialCategories: MedicalSpecialtyType[]) {
  const [selected, setSelected] = useState<MedicalSpecialtyType[]>(initialCategories);

  const toggle = (type: MedicalSpecialtyType) => {
    setSelected((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const reset = () => setSelected([]);

  return { selected, toggle, reset };
}
