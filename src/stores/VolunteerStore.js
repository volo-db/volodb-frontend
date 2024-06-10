import { defineStore } from 'pinia'
import { vdbFetchData } from '@/utils/api'

export const useVolunteerStore = defineStore('volunteerStore', {
  state: () => {
    return {
      fetching: false,
      token: JSON.parse(localStorage.getItem('user-store')).token,
      volunteersPage: null,
      selectedVolunteer: null,
      selectedVolunteerContacts: null,
      selectedVolunteerAddresses: null,
      selectedVolunteerRelevantContract: null,
      volunteerDocuments: null,
      sortOrder: 'asc',
      activeSortProperty: null
    }
  },
  actions: {
    async saveVolunteer(volunteer) {
      // If there's no token, something went wrong
      if (!this.token) throw Error('VoloDB-ERROR\n🙅‍♀️ ups! not logged in.')

      this.fetching = true
      this.selectedVolunteer = await vdbFetchData('volunteers', 'POST', this.token, volunteer)
      this.fetching = false
    },
    async getVolunteer(volunteerId) {
      //clear selected volunteer
      this.selectedVolunteer = null

      // If there's no token, something went wrong
      if (!this.token) throw Error('VoloDB-ERROR\n🙅‍♀️ ups! not logged in.')

      this.fetching = true

      this.selectedVolunteer = await vdbFetchData(`volunteers/${volunteerId}`, 'GET', this.token)

      this.selectedVolunteerContacts = await vdbFetchData(
        `volunteers/${volunteerId}/contacts`,
        'GET',
        this.token
      )

      this.selectedVolunteerAddresses = await vdbFetchData(
        `volunteers/${volunteerId}/addresses`,
        'GET',
        this.token
      )

      this.selectedVolunteerRelevantContract = await vdbFetchData(
        `volunteers/${volunteerId}/contracts/relevant`,
        'GET',
        this.token
      )

      this.fetching = false
    },
    async getVolunteers(pageNumber = 0) {
      // If there's no token, something went wrong
      if (!this.token) throw Error('VoloDB-ERROR\n🙅‍♀️ ups! not logged in.')

      this.fetching = true
      this.volunteersPage = await vdbFetchData(
        `volunteers?page=${pageNumber}&sortField=person.lastname&sortOrder=asc`,
        'GET',
        this.token
      )
      this.fetching = false
    },
    async fetchSortedVolunteers(sortBy) {
      // If there's no token, something went wrong
      if (!this.token) throw Error('VoloDB-ERROR\n🙅‍♀️ ups! not logged in.')

      this.fetching = true

      // call function for sortOrder
      this.defineSortOrder(sortBy)

      this.volunteersPage = await vdbFetchData(
        `volunteers?&sortField=${sortBy}&sortOrder=${this.sortOrder}`,
        'GET',
        this.token
      )
      this.fetching = false
    },
    async getDocuments() {
      // If there's no token, something went wrong
      if (!this.token) throw Error('VoloDB-ERROR\n🙅‍♀️ ups! not logged in.')

      this.fetching = true
      this.volunteerDocuments = await vdbFetchData(`documents/types/`, 'GET', this.token)
      this.fetching = false
    },
    defineSortOrder(sortProperty) {
      if (sortProperty === this.activeSortProperty) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.activeSortProperty = sortProperty
        this.sortOrder = 'asc' // Reset sortOrder to 'asc' when a new sortProperty is selected
      }
    }
  }
})
