import { useTranslations } from 'next-intl'

import { STAT_COLLECTION_NAMES } from '@/utils/constants'
import { StatsData } from '@/utils/types'

import styles from './StatsTable.module.scss'

const COLLECTION_ORDER = [
  STAT_COLLECTION_NAMES.FIRST_TIME_START,
  STAT_COLLECTION_NAMES.FIRST_TIME_HOME,
  STAT_COLLECTION_NAMES.FIRST_TIME_COLLECTION_VIEWER,
  STAT_COLLECTION_NAMES.FIRST_TIME_PERSUATION,
  STAT_COLLECTION_NAMES.FIRST_TIME_WIN,
  STAT_COLLECTION_NAMES.FIRST_TIME_WIN_THREE,
  STAT_COLLECTION_NAMES.FIRST_TIME_WIN_TEN,
  STAT_COLLECTION_NAMES.FIRST_TIME_WIN_GAME_COMPLETE,
  STAT_COLLECTION_NAMES.FIRST_TIME_COLLECTION_VIEW_APP,
]

export const StatsTable = ({
  data,
  selectedYear,
  currentYear,
  currentMonth,
}: {
  data: StatsData
  selectedYear: number
  currentYear: number
  currentMonth: number
}) => {
  const t = useTranslations()
  return (
    <>
      {COLLECTION_ORDER.map((collection) => {
        const collectionData = data[collection]
        if (!collectionData || !collectionData.monthlyVisits) return null

        const sortedMonths = Object.keys(collectionData.monthlyVisits)
          .sort()
          .filter((month) => {
            const monthNumber = parseInt(month.split('-')[1], 10)
            return selectedYear !== currentYear || monthNumber <= currentMonth
          })

        return (
          <section key={collection} className={styles.container}>
            <h2>{t(`statistics.${collection}`)}</h2>
            <p>Totalt antal under året: {collectionData.totalVisits || 0}</p>
            <h3>Månadsvis</h3>
            <table>
              <tbody>
                <tr>
                  <th>Månad</th>
                  {sortedMonths.map((month) => (
                    <td key={`${collection}-${month}`}>
                      {t(`statistics.${month.split('-')[1]}`)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th>Antal</th>
                  {sortedMonths.map((month) => (
                    <td key={`${collection}-${month}-count`}>
                      {collectionData.monthlyVisits![month] || 0}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </section>
        )
      })}
    </>
  )
}
