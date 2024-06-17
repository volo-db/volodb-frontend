<template>
  <div class="overflow-x-auto" v-bind="$attrs">
    <div v-if="projectStore.projectsPage">
      <table class="w-full" v-if="projectStore.projectsPage">
        <thead>
          <tr>
            <td
              v-for="(title, index) in tableHead"
              :key="index"
              class="pb-3 text-vologray-700 text-sm cursor-pointer"
              :class="{ 'pl-4': index === 0 }"
              :style="{
                color: sortBy === sortParameter[index] ? '#0025FF' : ''
              }"
              @click="sortProjectsList(sortParameter[index])"
            >
              {{ title }}
              <IconTableSortArrows
                :upArrowColor="
                  sortParameter[index] === sortBy && sortOrder === 'asc' ? '#0025FF' : 'lightgrey'
                "
                :downArrowColor="
                  sortParameter[index] === sortBy && sortOrder === 'desc' ? '#0025FF' : 'lightgrey'
                "
                class="pl-2 inline w-5"
              />
            </td>
          </tr>
        </thead>
        <tbody class="bg-white outline outline-white rounded">
          <tr
            class="border-b h-14 cursor-pointer hover:text-voloblue-100 hover:bg-gray-50"
            v-for="project of projectStore.projectsPage.content"
            :key="project.id"
            @click="goToDetails(project.id)"
          >
            <td class="font-bold pl-4">{{ project.name }}</td>
            <td>{{ project.city }}</td>
            <td>{{ project.email }}</td>
            <td>2023/24</td>
            <td>{{ project.capacity }}</td>
            <td class="text-voloblue-200 pr-4 md:pr-1"><IconArrowGoto /></td>
          </tr>
        </tbody>
      </table>
      <PaginationController
        :currentPage="projectStore.projectsPage.pageable.pageNumber"
        :totalPages="projectStore.projectsPage.totalPages"
        @updatePage="updateProjectPage"
      />
    </div>
  </div>
  <ModalContainer v-if="projectStore.fetching">
    <div class="p-4 flex flex-row gap-2 items-center text-md"><IconSpinner />loading ...</div>
  </ModalContainer>
</template>

<script>
import { useProjectStore } from '@/stores/ProjectStore.js'
import { useRouter } from 'vue-router'
import PaginationController from '@/components/PaginationController.vue'
import IconTableSortArrows from './IconTableSortArrows.vue'
import IconArrowGoto from './IconArrowGoto.vue'
import ModalContainer from '@/components/ContainerModal.vue'
import IconSpinner from '@/components/IconSpinner.vue'

export default {
  components: {
    IconArrowGoto,
    ModalContainer,
    IconSpinner,
    PaginationController,
    IconTableSortArrows
  },
  props: {
    searchQuery: {
      type: String,
      default: ''
    }
  },
  setup: () => {
    const projectStore = useProjectStore()
    const router = useRouter()
    return { projectStore, router }
  },
  data() {
    return {
      tableHead: ['Name', 'Standort', 'Ansprechpartner', 'Aktive FW', 'Offene Stellen'],
      sortParameter: ['name', 'city', 'email', 'volunteers', 'capacity'],
      sortOrder: 'asc',
      sortBy: 'name',
      page: 0,
      pageSize: 13
    }
  },
  methods: {
    // for future go to detail page of project ->
    // goToDetails(projectId) {
    //   this.$router.push({ name: 'ProjectDetailView', params: { projectId } })
    // },
    updateProjectPage(pageNumber) {
      this.projectStore.projectsPage.pageable.pageNumber = pageNumber
      let params = {
        sortOrder: this.sortOrder,
        sortBy: this.sortBy,
        page: pageNumber,
        pageSize: this.pageSize
      }
      this.projectStore.getProjects(params)
    },
    sortProjectsList(sortBy) {
      if (this.sortBy !== sortBy) {
        this.sortOrder === 'asc'
      } else {
        if (this.sortOrder === 'asc') {
          this.sortOrder = 'desc'
        } else {
          this.sortOrder = 'asc'
        }
      }

      this.sortBy = sortBy

      this.getProjects()
    },
    async getProjects(params) {
      if (!params)
        params = {
          sortOrder: this.sortOrder,
          sortBy: this.sortBy,
          page: this.page,
          pageSize: this.pageSize,
          search: this.searchQuery
        }

      try {
        await this.projectStore.getProjects({
          sortOrder: params.sortOrder,
          sortBy: params.sortBy,
          page: params.page,
          pageSize: params.pageSize,
          search: params.search
        })
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    }
  },
  watch: {
    searchQuery: {
      async handler() {
        await this.getProjects()
      },
      immediate: true // This option ensures that the api is called initially with the initial prop value
    }
  }
}
</script>
