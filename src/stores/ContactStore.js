//  ### 📇 ###
import { defineStore } from 'pinia'
import { vdbFetchData } from '@/utils/api'

export const useContactStore = defineStore('ContactStore', {
  state: () => {
    return {
      fetching: false,
      contactTypes: null
    }
  },
  actions: {
    async getContactTypes() {
      try {
        this.contactTypes = await vdbFetchData(`/contacts/types`, 'GET')
      } catch (error) {
        console.error('Error fetching contacts:', error)
      } finally {
        this.fetching = false
      }
    },
    async setContact(volunteerId, contact) {
      const route = contact.id
        ? `/volunteers/${volunteerId}/contacts/${contact.id}`
        : `/volunteers/${volunteerId}/contacts/`

      const method = contact.id ? 'PATCH' : 'POST'

      try {
        this.contactTypes = await vdbFetchData(route, method, contact)
      } catch (error) {
        throw new Error(error)
      } finally {
        this.fetching = false
      }
    }
  },
  getters: {
    sortedCountries() {
      const sortedCountries = []
      for (let country of this.countries) {
        if (country.localName !== null) {
          sortedCountries.push(country.localName)
          sortedCountries.sort()
        }
      }
      return sortedCountries
    }
  }
})
