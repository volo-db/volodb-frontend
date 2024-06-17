import { defineStore } from 'pinia'
import { vdbFetchData } from '@/utils/api'

let mostRecentRequest = ''

export const useVolunteerStore = defineStore('volunteerStore', {
  state: () => {
    return {
      fetching: false,
      volunteersPage: null,
      selectedVolunteer: null,
      selectedVolunteerContacts: null,
      selectedVolunteerAddresses: null,
      selectedVolunteerRelevantContract: null
    }
  },
  actions: {
    async setVolunteer(volunteer) {
      this.fetching = true
      try {
        this.selectedVolunteer = await vdbFetchData('volunteers', 'POST', volunteer)
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        this.fetching = false
      }
    },
    async getVolunteer(volunteerId) {
      //clear selected volunteer
      this.selectedVolunteer = null

      this.fetching = true
      try {
        this.selectedVolunteer = await vdbFetchData(`volunteers/${volunteerId}`, 'GET')

        this.selectedVolunteerContacts = await vdbFetchData(
          `volunteers/${volunteerId}/contacts`,
          'GET'
        )

        this.selectedVolunteerAddresses = await vdbFetchData(
          `volunteers/${volunteerId}/addresses`,
          'GET'
        )

        this.selectedVolunteerRelevantContract = await vdbFetchData(
          `volunteers/${volunteerId}/contracts/relevant`,
          'GET'
        )
      } catch (error) {
        console.error(error)
      } finally {
        this.fetching = false
      }
    },
    async getVolunteers(queryObj) {
      const thisRequest = `volunteers?page=${queryObj.page || 0}&pageSize=${queryObj.pageSize || 10}&sortField=${queryObj.sortBy || 'person.lastname'}&sortOrder=${queryObj.sortOrder || 'asc'}&search=${queryObj.search || ''}`
      mostRecentRequest = thisRequest

      this.fetching = true

      try {
        const volunteersPage = await vdbFetchData(thisRequest, 'GET')
        if (mostRecentRequest != thisRequest) return
        this.volunteersPage = volunteersPage
      } catch (error) {
        console.error(error)
      } finally {
        this.fetching = false
      }
    }
  }
})
