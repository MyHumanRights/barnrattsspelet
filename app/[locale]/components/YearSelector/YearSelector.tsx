import { ChangeEvent } from 'react'

import styles from './YearSelector.module.scss'

export const YearSelector = ({
  years,
  selectedYear,
  handleYearChange,
}: {
  years: number[]
  selectedYear: number
  handleYearChange: (e: ChangeEvent<HTMLSelectElement>) => void
}) => (
  <section className={styles.container}>
    <label htmlFor='yearSelect' className={styles.label}>
      Välj år
    </label>
    <select
      id='yearSelect'
      className={styles.dropdown}
      value={selectedYear}
      onChange={handleYearChange}
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  </section>
)
