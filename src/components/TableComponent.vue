<template>
<slot></slot>
   <h1>Table:</h1>
   <div v-if="volunteerStore.volunteers.length > 0">
    <!-- <p>{{ volunteerStore.volunteers[0].person.firstname}}</p> -->
    <thead>
    <tr>
      <td class="pr-8 pb-3 pl-3 text-gray-500 text-sm">
        Name<img :src="listSortArrows" class="pl-2 inline" />
      </td>
      <td class="pr-8 pb-3 text-gray-500 text-sm">
        Vorname<img :src="listSortArrows" class="pl-2 inline" />
      </td>
      <td class="pr-8 pb-3 text-gray-500 text-sm">
        Einsatzstelle<img :src="listSortArrows" class="pl-2 inline" />
      </td>
      <td class="pr-8 pb-3 text-gray-500 text-sm">
        Jahrgang<img :src="listSortArrows" class="pl-2 inline" />
      </td>
      <td class="pr-8 pb-3 text-gray-500 text-sm">
        Unterlagen<img :src="listSortArrows" class="pl-2 inline" />
      </td>
      <td class="pr-8 pb-3 text-gray-500 text-sm">
        gebuchte Seminare<img :src="listSortArrows" class="pl-2 inline" />
      </td>
    </tr>
  </thead>
  <tbody class="bg-white outline outline-white rounded">
    <tr class="border-b h-11">
      <td class="pr-8 pl-3 font-bold">Müller</td>
      <td class="pr-8 font-bold">{{ volunteerStore.volunteers[0].person.firstname}}</td>
      <td class="pr-8">München</td>
      <td class="pr-8">2023/24</td>
      <td class="pr-8">2/5</td>
      <td class="pr-8">25/25</td>
      <td class="text-voloblue-100">></td>
    </tr>
  </tbody>
  </div>
</template>

<script>
import listSortArrows from '../assets/logos/list-sort-arrows.svg'
// import IconDetailViewArrow from './IconDetailViewArrow.vue'
import { useVolunteerStore } from '@/stores/VolunteerStore'

export default {
  // components: { IconDetailViewArrow },
  setup: () => {
    const volunteerStore = useVolunteerStore()
    return { volunteerStore }
  },
  data() {
    return {
      listSortArrows
    }
  },
  created() {
  this.volunteerStore.getVolunteers().catch(error => {
    console.error('Error fetching volunteers:', error);
  });
  console.log('created');
  console.log(this.volunteerStore.volunteers)
},

}
</script>


<!-- <table>
  <thead>
    <tr>
      <td class="pr-8 pb-3 pl-3 text-gray-500 text-sm">
        Name<img :src="listSortArrows" class="pl-2 inline" />
      </td>
      <td class="pr-8 pb-3 text-gray-500 text-sm">
        Vorname<img :src="listSortArrows" class="pl-2 inline" />
      </td>
      <td class="pr-8 pb-3 text-gray-500 text-sm">
        Einsatzstelle<img :src="listSortArrows" class="pl-2 inline" />
      </td>
      <td class="pr-8 pb-3 text-gray-500 text-sm">
        Jahrgang<img :src="listSortArrows" class="pl-2 inline" />
      </td>
      <td class="pr-8 pb-3 text-gray-500 text-sm">
        Unterlagen<img :src="listSortArrows" class="pl-2 inline" />
      </td>
      <td class="pr-8 pb-3 text-gray-500 text-sm">
        gebuchte Seminare<img :src="listSortArrows" class="pl-2 inline" />
      </td>
    </tr>
  </thead>
  <tbody class="bg-white outline outline-white rounded">
    <tr class="border-b h-11">
      <td class="pr-8 pl-3 font-bold">Müller</td>
      <td class="pr-8 font-bold">Tobias</td>
      <td class="pr-8">München</td>
      <td class="pr-8">2023/24</td>
      <td class="pr-8">2/5</td>
      <td class="pr-8">25/25</td>
      <td class="text-voloblue-100"><IconDetailViewArrow /></td>
    </tr>
    <tr class="border-b h-11">
      <td class="pr-8 pl-3 font-bold">Friedmann</td>
      <td class="pr-8 font-bold">Felicitas</td>
      <td class="pr-8">Leipzig</td>
      <td class="pr-8">2023/24</td>
      <td class="pr-8">3/5</td>
      <td class="pr-8">10/25</td>
      <td class="pr-3 text-voloblue-100"><IconDetailViewArrow /></td>
    </tr>
    <tr class="border-b h-11">
      <td class="pl-3 font-bold">Volk</td>
      <td class="font-bold">Theresa</td>
      <td>Berlin</td>
      <td>2021/22</td>
      <td>5/5</td>
      <td>25/25</td>
      <td class="text-voloblue-100"><IconDetailViewArrow /></td>
    </tr>
    <tr>
      <td class="bg-white text-voloblue-200 text-sm text-center" colspan="7">1/5</td>
    </tr>
  </tbody>
</table> -->