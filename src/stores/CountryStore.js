//  ### 🤠 ###
import { defineStore } from 'pinia'
import { vdbFetchData } from '@/utils/api'

export const useCountryStore = defineStore('CountryStore', {
  state: () => {
    return {
      fetching: false,
      countries: null
    }
  },
  actions: {
    async getCountries() {
      try {
        this.countries = await vdbFetchData(`/countrys`, 'GET')
      } catch (error) {
        console.error('Error fetching countries:', error)
      } finally {
        this.fetching = false
      }
    }
  },
  getters: {
    sortedCountries() {
      if (!this.countries) return

      const sortedCountries = []
      for (let country of this.countries) {
        if (country.localName !== null) {
          sortedCountries.push(country.localName)
        }
      }
      sortedCountries.sort()
      return sortedCountries
    }
  }
})
