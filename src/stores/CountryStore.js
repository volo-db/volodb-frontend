//  ### 🤠 ###
import { defineStore } from 'pinia'
import { vdbFetchData } from '@/utils/api'

export const useCountryStore = defineStore('CountryStore', {
  state: () => {
    return {
      fetching: false,
      token: JSON.parse(localStorage.getItem('user-store')).token,
      countries: null,
      sortedCountries: []
    }
  },
  actions: {
    async getCountries() {
      // If there's no token, something went wrong
      if (!this.token) throw Error('VoloDB-ERROR\n🙅‍♀️ ups! not logged in.')
      try {
        this.countries = await vdbFetchData(`/countrys`, 'GET', this.token)
        this.createCountrysArray()
      } catch (error) {
        console.error('Error fetching countries:', error)
      } finally {
        this.fetching = false
      }
    },
    createCountrysArray() {
      this.sortedCountries = []
      for (let country of this.countries) {
        if (country.localName !== null) {
          this.sortedCountries.push(country.localName)
          this.countries.sort()
        }
      }
      return
    }
  }
})
