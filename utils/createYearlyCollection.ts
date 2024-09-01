import { doc, getDoc, setDoc } from 'firebase/firestore/lite'

import { STAT_COLLECTION_NAMES } from './constants'
import { db } from './firebase' // adjust the path as necessary

const checkIfYearExists = async (year: string) => {
  console.log(`Checking if collections for the year ${year} exist...`)
  // We check if a document exists for one of the stats in the given year
  const sampleStatName = Object.values(STAT_COLLECTION_NAMES)[0]
  const docRef = doc(db, year, sampleStatName)
  const docSnap = await getDoc(docRef)

  return docSnap.exists()
}

export const createYearlyCollections = async (year: string) => {
  // Months in "year-month" format (e.g., "2024-01", "2024-02")
  const months = Array.from(
    { length: 12 },
    (_, i) => `${year.split('-')[0]}-${(i + 1).toString().padStart(2, '0')}`
  )

  try {
    const yearExists = await checkIfYearExists(year)

    if (yearExists) {
      console.log(`Collections for the year ${year} already exist.`)
      return
    }

    for (const statName of Object.values(STAT_COLLECTION_NAMES)) {
      const statDocRef = doc(db, year, statName)
      const docSnap = await getDoc(statDocRef)

      if (docSnap.exists()) {
        console.log(`Document for ${statName} in ${year} already exists.`)
      } else {
        // Initialize the document with zero visits for each month
        const monthlyVisits: Record<string, number> = {}
        months.forEach((month) => {
          monthlyVisits[month] = 0
        })

        await setDoc(statDocRef, {
          total_visits: 0,
          monthly_visits: monthlyVisits,
        })

        console.log(`Created document for ${statName} in ${year}.`)
      }
    }
  } catch (error) {
    console.error('Error creating collections: ', error)
  }
}
