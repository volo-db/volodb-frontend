import { defineStore } from 'pinia'
import { vdbFetchData, vdbFetchFormData } from '@/utils/api'

let mostRecentRequest = ''

export const useVolunteerStore = defineStore('volunteerStore', {
  state: () => {
    return {
      fetching: false,
      fetchingDocuments: false,
      volunteersPage: null,
      volunteerNotes: null,
      selectedVolunteer: null,
      selectedVolunteerContacts: null,
      selectedVolunteerAddresses: null,
      selectedVolunteerRelevantContract: null,
      volunteerDocuments: null,
      volunteerDocumentTypes: null
    }
  },
  actions: {
    clearVolunteer() {
      this.volunteerNotes = null
      this.selectedVolunteer = null
      this.selectedVolunteerContacts = null
      this.selectedVolunteerAddresses = null
      this.selectedVolunteerRelevantContract = null
      this.volunteerDocuments = null
    },
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
      const thisRequest = `volunteers?page=${queryObj.page || 0}&pageSize=${queryObj.pageSize || 10}&sortBy=${queryObj.sortBy || 'person.lastname'}&sortOrder=${queryObj.sortOrder || 'asc'}&search=${queryObj.search || ''}`
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
    },
    async getVolunteerNotes(queryObj) {
      const thisRequest = `volunteers/${queryObj.volunteerId}/notes?sortBy=${queryObj.sortBy || 'timestamp'}&sortOrder=${queryObj.sortOrder || 'desc'}&search=${queryObj.search || ''}`

      mostRecentRequest = thisRequest

      this.fetching = true

      try {
        const notes = await vdbFetchData(thisRequest, 'GET')
        if (mostRecentRequest != thisRequest) return
        this.volunteerNotes = notes
      } catch (error) {
        console.error(error)
      } finally {
        this.fetching = false
      }
    },
    async getVolunteerDocuments(queryObj) {
      const thisRequest = `volunteers/${queryObj.volunteerId}/documents?sortBy=${queryObj.sortBy || 'timestamp'}&sortOrder=${queryObj.sortOrder || 'desc'}&search=${queryObj.search || ''}`

      mostRecentRequest = thisRequest

      this.fetching = true
      try {
        const documents = await vdbFetchData(thisRequest, 'GET')
        if (mostRecentRequest != thisRequest) return
        this.volunteerDocuments = documents
      } catch (error) {
        console.error(error)
      } finally {
        this.fetching = false
      }
    },
    async getVolunteerAddresses(volunteerId) {
      const thisRequest = `volunteers/${volunteerId}/addresses`

      mostRecentRequest = thisRequest

      this.fetching = true

      try {
        const addresses = await vdbFetchData(thisRequest, 'GET')
        if (mostRecentRequest != thisRequest) return
        this.selectedVolunteerAddresses = addresses
      } catch (error) {
        console.error(error)
      } finally {
        this.fetching = false
      }
    },
    async setVolunteerAddresses(volunteerId, address) {
      const method = address.id ? 'PATCH' : 'POST'

      const thisRequest = `volunteers/${volunteerId}/addresses${method === 'PATCH' ? '/' + address.id : ''}`
      mostRecentRequest = thisRequest

      this.fetching = true

      try {
        const addresses = await vdbFetchData(thisRequest, method, address)
        if (mostRecentRequest != thisRequest) return
        this.selectedVolunteerAddresses = addresses
      } catch (error) {
        console.error(error)
      } finally {
        this.fetching = false
      }
    },
    async deleteVolunteerAddress(addressId) {
      this.fetching = true

      try {
        await vdbFetchData(
          `volunteers/${this.selectedVolunteer.id}/addresses/${addressId}`,
          'DELETE'
        )
      } catch (error) {
        console.error(error)
      } finally {
        this.fetching = false
      }
    },
    async setNote(note, id) {
      this.fetching = true
      if (id) {
        try {
          await vdbFetchData(
            'volunteers/' + this.selectedVolunteer.id + '/notes/' + id,
            'PATCH',
            note
          )
        } catch (error) {
          console.error(error)
          throw error
        } finally {
          this.fetching = false
        }
      } else {
        try {
          await vdbFetchData('volunteers/' + this.selectedVolunteer.id + '/notes', 'POST', note)
        } catch (error) {
          console.error(error)
          throw error
        } finally {
          this.fetching = false
        }
      }
    },
    async deleteNote(id) {
      this.fetching = true
      try {
        await vdbFetchData('volunteers/' + this.selectedVolunteer.id + '/notes/' + id, 'DELETE')
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        this.fetching = false
      }
    },

    async editVolunteer(volunteer, id) {
      this.fetching = true

      try {
        await vdbFetchData('volunteers/' + id, 'PATCH', volunteer)
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        this.fetching = false
      }
    },
    async editVolunteerAvatar(formData, id) {
      this.fetching = true

      try {
        await vdbFetchFormData('volunteers/' + id + '/avatar/', 'PATCH', formData)
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        this.fetching = false
      }
    },
    async setDocument(formData, id) {
      this.fetchingDocuments = true

      try {
        await vdbFetchFormData('volunteers/' + id + '/documents', 'POST', formData)
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        this.fetchingDocuments = false
      }
    },
    async getVolunteerDocumentTypes() {
      this.volunteerDocumentTypes = null

      this.fetching = true
      try {
        this.volunteerDocumentTypes = await vdbFetchData(`/documents/types`, 'GET')
      } catch (error) {
        console.error('Error fetching document types:', error)
      } finally {
        this.fetching = false
      }
    }
  },
  getters: {
    getTypeList() {
      if (!this.volunteerDocumentTypes) return

      let list = []

      for (let key of Object.keys(this.volunteerDocumentTypes)) {
        list.push(this.volunteerDocumentTypes[key].name)
      }
      return list
    },
    getTitlesList() {
      if (!this.volunteerDocumentTypes) return

      let titles = []

      for (let key of Object.keys(this.volunteerDocumentTypes)) {
        titles.push(this.volunteerDocumentTypes[key].description)
      }
      return titles
    }
  }
})
