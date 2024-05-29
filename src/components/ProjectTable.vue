<template>
  <div class="overflow-x-auto" v-bind="$attrs">
    <table class="w-full" v-if="projectStore.projectsPage">
      <thead>
        <tr>
          <td
            v-for="(title, index) in tableHead"
            @click="projectStore.fetchSortedProjects(sortParameter[index])"
            :key="index"
            class="pb-3 text-vologray-700 text-sm cursor-pointer"
            :class="{ 'pl-4': index === 0 }"
            :style="{
              color: projectStore.activeSortProperty === sortParameter[index] ? 'blue' : ''
            }"
          >
            {{ title }}
            <IconTableSortArrows
              :upArrowColor="
                sortParameter[index] === projectStore.activeSortProperty &&
                projectStore.sortOrder === 'asc'
                  ? 'blue'
                  : 'lightgrey'
              "
              :downArrowColor="
                sortParameter[index] === projectStore.activeSortProperty &&
                projectStore.sortOrder === 'desc'
                  ? 'blue'
                  : 'lightgrey'
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
          <td class="text-voloblue-200"><IconArrowGoto /></td>
        </tr>
        <!-- <PaginationController class="w-full" />  -->
      </tbody>
    </table>
  </div>
  <ModalContainer v-if="projectStore.fetching">
    <div class="p-4 flex flex-row gap-2 items-center text-md"><IconSpinner />loading ...</div>
  </ModalContainer>
</template>

<script>
import { useProjectStore } from '@/stores/ProjectStore.js'
import { useRouter } from 'vue-router'
// import PaginationController from '@/components/PaginationController.vue'
import IconTableSortArrows from './IconTableSortArrows.vue'
import IconArrowGoto from './IconArrowGoto.vue'
import ModalContainer from '@/components/ContainerModal.vue'
import IconSpinner from '@/components/IconSpinner.vue'

export default {
  components: {
    IconArrowGoto,
     ModalContainer,
     IconSpinner,
    //  PaginationController,
    IconTableSortArrows
  },
  setup: () => {
    const projectStore = useProjectStore()
    const router = useRouter()
    return { projectStore, router }
  },
  data() {
    return {
      tableHead: ['Name', 'Standort', 'Ansprechpartner', 'Aktive FW', 'Offene Stellen'],
      sortParameter: ['name', 'city', 'email', 'volunteers', 'capacity']
    }
  },
  async beforeMount() {
    try {
      this.projectStore.sortOrder = 'asc'
      this.projectStore.activeSortProperty = 'name'
      await this.projectStore.getProjects()
    } catch (error) {
      console.error('Error fetching volunteers:', error)
    }
  }
}
</script>
