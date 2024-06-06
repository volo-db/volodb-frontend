//  ### 🤠 ###
import { defineStore } from 'pinia'
import { vdbFetchData } from '@/utils/api'

export const useCountryStore = defineStore('CountryStore', {
  state: () => {
    return {
      fetching: false,
      token: JSON.parse(localStorage.getItem('user-store')).token,
      countrysPage: null,
      countrysArray: []
    }
  },
  actions: {
    async getCountrys() {
      // If there's no token, something went wrong
      if (!this.token) throw Error('VoloDB-ERROR\n🙅‍♀️ ups! not logged in.')
      try {
        this.countrysPage = await vdbFetchData(`/countrys`, 'GET', this.token)
        this.createCountrysArray()
      } catch (error) {
        console.error('Error fetching countries:', error)
      } finally {
        this.fetching = false
      }
    },
    createCountrysArray() {
      for (let country of this.countrysPage) {
        if (country.localName !== null) {
          this.countrysArray.push(country.localName)
        }
      }
      return
    }
  }
})
