"use client";

import styles from "../../styles/productos.module.css";

export type ProductFiltersValue = {
  brands: string[];
  categories: string[];
};

type ProductFiltersProps = {
  filters: ProductFiltersValue;
  brands: string[];
  categories: string[];
  onChange: (filters: ProductFiltersValue) => void;
};

export default function ProductFilters({
  filters,
  brands,
  categories,
  onChange,
}: ProductFiltersProps) {
  const groups = [
    {
      key: "brands" as const,
      title: "Línea",
      options: brands,
    },
    {
      key: "categories" as const,
      title: "Rubro",
      options: categories,
    },
  ];

  function toggleOption(group: keyof ProductFiltersValue, option: string) {
    const selected = filters[group];

    onChange({
      ...filters,
      [group]: selected.includes(option)
        ? selected.filter((value) => value !== option)
        : [...selected, option],
    });
  }

  return (
    <aside className={styles.filtros}>
      <h2>Filtros aplicados</h2>

      {groups.map((group) => (
        <div key={group.key}>
          <h3>{group.title}</h3>

          <ul>
            {group.options.map((option) => (
              <li key={option}>
                <label>
                  <input
                    type="checkbox"
                    checked={filters[group.key].includes(option)}
                    onChange={() => toggleOption(group.key, option)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
