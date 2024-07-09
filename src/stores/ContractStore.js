//  ### 📝 ###
import { defineStore } from 'pinia'
import { vdbFetchData } from '@/utils/api'

export const useContractStore = defineStore('ContractStore', {
  state: () => {
    return {
      fetching: false,
      contactTypes: null
    }
  },
  actions: {
    async setSickDays(volunteerId, contractId, sickdays) {
      const route = `/volunteers/${volunteerId}/contracts/${contractId}`

      try {
        this.contactTypes = await vdbFetchData(route, 'PATCH', { sickdays })
      } catch (error) {
        throw new Error(error)
      } finally {
        this.fetching = false
      }
    }
  }
})
