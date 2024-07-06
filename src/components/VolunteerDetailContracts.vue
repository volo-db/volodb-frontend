<template>
  <div class="mt-0">
    <header class="flex justify-end mt-8">
      <!-- <SearchBar placeholder="Suche nach Vereinbarungen" /> -->
      <ButtonStandard>Vereinbarung hinzufügen</ButtonStandard>
    </header>

    <!-- Grid -->
    <div v-if="volunteer && contract" class="flex flex-wrap gap-[10px] mt-8">
      <!-- Contract-Overview -->
      <section class="rounded bg-white px-[18px] py-[16px] w-[330px] h-[120px]">
        <h2 class="inline font-medium">Vereinbarung</h2>
        <p class="inline text-vologray-400">
          - vom
          {{ new Date(contract.created).toLocaleDateString() }}
        </p>
        <!-- Pills -->
        <div class="mt-2 flex gap-2 flex-wrap items-center">
          <div class="bg-voloblue-200 px-2 pt-[1px] rounded-2xl flex justify-center items-center">
            <p class="inline text-white">
              {{ contract.program }}
            </p>
          </div>
          <div
            v-if="contract.visaNecessary"
            class="bg-voloyellow-100 px-2 pt-[1px] rounded-2xl flex justify-center items-center"
          >
            <p class="inline">Visum</p>
          </div>
          <div
            v-if="contract.incomingVolunteer"
            class="bg-voloyellow-100 px-2 pt-[1px] rounded-2xl flex justify-center items-center"
          >
            <p class="inline">Incoming</p>
          </div>
          <div
            v-if="age < 18"
            class="bg-voloyellow-100 px-2 pt-[1px] rounded-2xl flex justify-center items-center"
          >
            <p class="inline">U18</p>
          </div>
          <div
            v-if="age > 25"
            class="bg-voloyellow-100 px-2 pt-[1px] rounded-2xl flex justify-center items-center"
          >
            <p class="inline">Ü25</p>
          </div>
          <button class="bg-transparent text-vologray-300 text-[30px]">
            <IconPlus />
          </button>
        </div>
      </section>
      <!-- Time of Service -->
      <section class="relative rounded bg-white p-[22px] w-[330px] h-[120px]">
        <h2 class="font-medium">Dienstzeit</h2>
        <div v-if="volunteer" class="flex justify-between items-center h-[54px]">
          <!-- left column -->

          <div class="flex gap-2 mt-2 items-center">
            <IconCalendar class="inline text-3xl text-voloblue-200/50" />
            <p class="inline text-3xl">12</p>
            <p class="inline self-end">Monate</p>
          </div>

          <!-- right column -->
          <div class="flex flex-col h-full">
            <div class="flex gap-1">
              <IconCircleWithCheckmark class="text-voloblue-200/50" />
              <p class="leading-none">
                {{ getPropperDateString(contract.start) }}
              </p>
            </div>
            <div class="border-l-2 border-dotted ml-[7px] flex-grow"></div>
            <div class="flex gap-1 self-end">
              <IconCircleWithPoint class="text-voloblue-200/50" />
              <p class="leading-none">
                {{ getPropperDateString(contract.end) }}
              </p>
            </div>
          </div>
        </div>
      </section>
      <!-- Holiday -->
      <section
        v-if="volunteer"
        class="relative rounded bg-white px-[18px] py-[16px] w-[160px] h-[120px] flex flex-col justify-between"
      >
        <h2 class="font-medium">Urlaubstage</h2>
        <div class="flex gap-2 items-end">
          <IconPalmTree class="inline text-2xl text-voloblue-200/50" />
          <p class="text-3xl leading-6">{{ contract.holiday }}</p>
        </div>
      </section>
      <!-- Seminar Days -->
      <section
        v-if="volunteer"
        class="relative rounded bg-white px-[18px] py-[16px] w-[160px] h-[120px] flex flex-col justify-between"
      >
        <h2 class="font-medium">Seminartage</h2>
        <div class="flex gap-2 items-end">
          <IconSeminars class="inline text-2xl text-voloblue-200/50" />
          <p class="text-3xl leading-6">{{ contract.seminarDays }}</p>
        </div>
      </section>
      <!-- Sick Days -->
      <section
        v-if="volunteer"
        class="group relative rounded bg-white px-[18px] py-[16px] w-[160px] h-[120px] flex flex-col justify-between"
      >
        <button
          v-if="true"
          @click="sickDaysModal = true"
          class="hidden absolute p-2 rounded-full m-1 top-0 right-0 group-hover:inline hover:text-white hover:bg-voloblue-200"
        >
          <IconPenEdit />
        </button>
        <ContainerModal v-if="sickDaysModal">
          <VolunteerContractFormularSickdays
            @close="sickDaysModal = false"
            @saved="updateVolo"
            :contract="contract"
          />
        </ContainerModal>
        <h2 class="font-medium">Krankheitst.</h2>
        <div class="flex gap-2 items-end">
          <IconClinicalThermometer class="inline text-3xl text-voloblue-200/50" />
          <p class="text-3xl leading-6">{{ contract.sickDays }}</p>
        </div>
      </section>
      <!-- Sallery -->
      <section
        v-if="volunteer"
        class="relative rounded bg-white px-[18px] py-[16px] w-[330px] h-[210px]"
      >
        <h2 class="font-medium">
          Vergütung
          <span class="font-normal text-vologray-400">- ({{ contract.salary.name }})</span>
        </h2>
        <div class="flex gap-2 items-end mt-2">
          <VolunteerDetailContractSallary :salary="contract.salary" />
        </div>
      </section>
      <!-- Legal guardian -->
      <section
        v-if="contract && getAge(volunteer.birthday, contract.created) < 18"
        class="rounded bg-white px-[18px] py-[16px] w-[330px] h-[210px]"
      >
        <h2 class="font-medium">Erziehungsberechtigt</h2>
        <div class="mt-2">
          <div class="flex gap-2">
            <IconDashboard />
            <div>
              <p>
                {{ contract.legalGuardian.address.person.firstname }}
                {{ contract.legalGuardian.address.person.lastname }}
              </p>
              <p>{{ contract.legalGuardian.address.street }}</p>
              <p>
                {{ contract.legalGuardian.address.postalcode }}
                {{ contract.legalGuardian.address.city }}
              </p>
              <p
                v-if="String(contract.legalGuardian.address.country).toLowerCase() != 'deutschland'"
              >
                {{ contract.legalGuardian.address.country }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { useVolunteerStore } from '@/stores/VolunteerStore'
// import SearchBar from '@/components/SearchBar.vue'
import ButtonStandard from '@/components/ButtonStandard.vue'
import { getAge, getAgeToday, getPropperDateString } from '@/utils/dateAndTime'
import IconCalendar from './IconCalendar.vue'
import IconCircleWithCheckmark from './IconCircleWithCheckmark.vue'
import IconCircleWithPoint from './IconCircleWithPoint.vue'
import IconPalmTree from './IconPalmTree.vue'
import IconSeminars from './IconSeminars.vue'
import VolunteerDetailContractSallary from './VolunteerDetailContractSallary.vue'
import IconDashboard from './IconDashboard.vue'
import IconClinicalThermometer from './IconClinicalThermometer.vue'
import IconPlus from './IconPlus.vue'
import IconPenEdit from './IconPenEdit.vue'
import ContainerModal from './ContainerModal.vue'
import VolunteerContractFormularSickdays from './VolunteerContractFormularSickdays.vue'

export default {
  setup: () => {
    const volunteerStore = useVolunteerStore()

    return { volunteerStore, getPropperDateString, getAge }
  },
  data() {
    return {
      sickDaysModal: false
    }
  },
  components: {
    // SearchBar,
    ButtonStandard,
    IconCalendar,
    IconCircleWithCheckmark,
    IconCircleWithPoint,
    IconPalmTree,
    IconSeminars,
    VolunteerDetailContractSallary,
    IconDashboard,
    IconClinicalThermometer,
    IconPlus,
    IconPenEdit,
    ContainerModal,
    VolunteerContractFormularSickdays
  },
  computed: {
    age() {
      return getAgeToday(this.volunteerStore.selectedVolunteer.birthday)
    },
    volunteer() {
      return this.volunteerStore.selectedVolunteer
    },
    contract() {
      return this.volunteerStore.selectedVolunteerRelevantContract
    }
  },
  methods: {
    updateVolo() {
      this.volunteerStore.getVolunteer(this.volunteer.id)
    }
  }
}
</script>
