import { vdbFetchData } from '@/utils/api'
import { defineStore } from 'pinia'

let mostRecentRequest = ''

export const useProjectStore = defineStore('ProjectStore', {
  state: () => {
    return {
      fetching: false,
      token: JSON.parse(localStorage.getItem('user-store')).token,
      projectsPage: null,
      selectedProject: null,
      sortOrder: 'asc',
      activeSortProperty: null
    }
  },
  actions: {
    async setProject(project) {
      // check for token
      if (!this.token) throw Error('VoloDB-ERROR\n🙅‍♀️ ups! not logged in.')

      this.fetching = true
      try {
        this.selectedProject = await vdbFetchData('projects', 'POST', this.token, project)
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        this.fetching = false
      }
    },
    async getProject(projectId) {
      // clear selected project
      this.selectedProject = null
      // If there's no token, something went wrong
      if (!this.token) throw Error('VoloDB-ERROR\n🙅‍♀️ ups! not logged in.')

      this.fetching = true

      this.selectedProject = await vdbFetchData(`projects/${projectId}`, 'GET', this.token)
    },
    async getProjects(queryObj) {
      // If there's no token, something went wrong
      if (!this.token) throw Error('VoloDB-ERROR\n🙅‍♀️ ups! not logged in.')

      const thisRequest = `projects?page=${queryObj.page || 0}&pageSize=${queryObj.pageSize || 10}&sortField=${queryObj.sortBy || 'name'}&sortOrder=${queryObj.sortOrder || 'asc'}&search=${queryObj.search || ''}`

      mostRecentRequest = thisRequest

      const projects = await vdbFetchData(thisRequest, 'GET', this.token)

      if (mostRecentRequest != thisRequest) return

      this.projectsPage = projects
      this.fetching = false
    }
  }
})
