import { defineStore } from 'pinia'
import { vdbFetchData } from '@/utils/api'

let mostRecentRequest = ''

export const useVolunteerStore = defineStore('volunteerStore', {
  state: () => {
    return {
      fetching: false,
      token: JSON.parse(localStorage.getItem('user-store')).token,
      volunteersPage: null,
      volunteerNotes: null,
      selectedVolunteer: null,
      selectedVolunteerContacts: null,
      selectedVolunteerAddresses: null,
      selectedVolunteerRelevantContract: null
    }
  },
  actions: {
    async setVolunteer(volunteer) {
      // If there's no token, something went wrong
      if (!this.token) throw Error('VoloDB-ERROR\n🙅‍♀️ ups! not logged in.')

      this.fetching = true
      try {
        this.selectedVolunteer = await vdbFetchData('volunteers', 'POST', this.token, volunteer)
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
    async getVolunteers(queryObj) {
      // If there's no token, something went wrong
      if (!this.token) throw Error('VoloDB-ERROR\n🙅‍♀️ ups! not logged in.')

      const thisRequest = `volunteers?page=${queryObj.page || 0}&pageSize=${queryObj.pageSize || 10}&sortField=${queryObj.sortBy || 'person.lastname'}&sortOrder=${queryObj.sortOrder || 'asc'}&search=${queryObj.search || ''}`
      mostRecentRequest = thisRequest

      this.fetching = true
      const volunteers = await vdbFetchData(thisRequest, 'GET', this.token)

      if (mostRecentRequest != thisRequest) return

      this.volunteersPage = volunteers
      this.fetching = false
    },
    async getVolunteerNotes(queryObj) {
      // If there's no token, something went wrong
      if (!this.token) throw Error('VoloDB-ERROR\n🙅‍♀️ ups! not logged in.')

      const thisRequest = `volunteers/${queryObj.volunteerId}/notes?page=${queryObj.page || 0}&pageSize=${queryObj.pageSize || 10}&sortField=${queryObj.sortBy || 'type'}&sortOrder=${queryObj.sortOrder || 'asc'}`

      mostRecentRequest = thisRequest

      const notes = await vdbFetchData(thisRequest, 'GET', this.token)

      if (mostRecentRequest != thisRequest) return

      this.volunteerNotes = notes
      this.fetching = false
    },
    async setNote(note) {
      if (!this.token) throw Error('VoloDB-ERROR\n🙅‍♀️ ups! not logged in.')

      this.fetching = true
      try {
        await vdbFetchData(
          'volunteers/' + this.selectedVolunteer.id + '/notes',
          'POST',
          this.token,
          note
        )
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        this.fetching = false
      }
    }
    // async editNote(){
    //   if (!this.token) throw Error('VoloDB-ERROR\n🙅‍♀️ ups! not logged in.')
    //     this.fetching = true
    //     try {
    //       await vdbFetchData(
    //         'volunteers/' + this.selectedVolunteer.id + '/notes' + ,
    //         'PATCH',
    //         this.token,

    //       )
    //     } catch (error) {
    //       console.error(error)
    //       throw error
    //     } finally {
    //       this.fetching = false
    //     }
    // }
  }
})
