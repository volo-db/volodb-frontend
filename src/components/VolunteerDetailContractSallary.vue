<template>
  <div>
    <!-- SVG NOT READY YET -->
    <svg
      v-if="true"
      :width="`${diagramWidth}px`"
      :height="`${diagramWidth * 0.55}px`"
      xmlns="http://www.w3.org/2000/svg"
      viewbox="0 0 1 1"
    >
      <defs>
        <!-- Diagonal hatch pattern -->
        <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="10" height="10">
          <path d="M0,0 L5,5" stroke="#000" stroke-width="2" />
        </pattern>
        <!-- Horizontal hatch pattern -->
        <pattern id="horizontalHatch" patternUnits="userSpaceOnUse" width="10" height="10">
          <path d="M0,5 L10,5" stroke="black" stroke-width="1" />
        </pattern>
        <!-- Vertical hatch pattern -->
        <pattern id="verticalHatch" patternUnits="userSpaceOnUse" width="10" height="10">
          <path d="M5,0 L5,10" stroke="black" stroke-width="1" />
        </pattern>
        <pattern id="dottedPattern" patternUnits="userSpaceOnUse" width="10" height="10">
          <!-- Small circle for the dot -->
          <circle cx="5" cy="5" r="1" fill="black" />
        </pattern>
      </defs>
      <!-- BACKGROUND CIRCLE -->
      <circle
        :cx="center.x"
        :cy="center.y"
        :r="radius"
        stroke="#ddd"
        fill="transparent"
        :stroke-width="strokeWidth"
        :stroke-dasharray="`${radius * pi * 1} ${1000}`"
        stroke-linecap="round"
        :transform="`scale(-1 -1) translate(-${diagramWidth} -${diagramWidth})`"
      />
      <!-- FOOD -->
      <!-- Free of charge -->
      <circle
        :cx="center.x"
        :cy="center.y"
        :r="radius"
        stroke="#ffd3ad"
        fill="transparent"
        :stroke-width="strokeWidth * 0.72"
        :stroke-dasharray="`${radius * pi * freeOfChargeFoodRelation} ${1000}`"
        stroke-linecap="round"
        :transform="`scale(-1 -1) translate(-${diagramWidth} -${diagramWidth})`"
      />
      <!-- Allowance -->
      <circle
        :cx="center.x"
        :cy="center.y"
        :r="radius"
        stroke="#ffa04d"
        fill="transparent"
        :stroke-width="strokeWidth * 0.72"
        :stroke-dasharray="`${radius * pi * foodAllowanceRelation} ${1000}`"
        stroke-linecap="round"
        :transform="`scale(-1 -1) translate(-${diagramWidth} -${diagramWidth})`"
      />
      <!-- ACCOMODATION -->
      <!-- Free of charge -->
      <circle
        :cx="center.x"
        :cy="center.y"
        :r="radius"
        stroke="#a0b9ff"
        fill="transparent"
        :stroke-width="strokeWidth * 0.72"
        :stroke-dasharray="`${radius * pi * freeOfChargeAccomodationRelation} ${1000}`"
        stroke-linecap="round"
        :transform="`scale(-1 -1) translate(-${diagramWidth} -${diagramWidth})`"
      />
      <!-- Allowance -->
      <circle
        :cx="center.x"
        :cy="center.y"
        :r="radius"
        stroke="#0025ff"
        fill="transparent"
        :stroke-width="strokeWidth * 0.72"
        :stroke-dasharray="`${radius * pi * accomodationAllowanceRelation} ${1000}`"
        stroke-linecap="round"
        :transform="`scale(-1 -1) translate(-${diagramWidth} -${diagramWidth})`"
      />
      <!-- Service -->
      <!-- Free of charge -->
      <circle
        :cx="center.x"
        :cy="center.y"
        :r="radius"
        stroke="#fef6d8"
        fill="transparent"
        :stroke-width="strokeWidth * 0.72"
        :stroke-dasharray="`${radius * pi * freeOfChargeServiceRelation} ${1000}`"
        stroke-linecap="round"
        :transform="`scale(-1 -1) translate(-${diagramWidth} -${diagramWidth})`"
      />
      <!-- Pocketmoney -->
      <circle
        :cx="center.x"
        :cy="center.y"
        :r="radius"
        stroke="#FCD12E"
        fill="transparent"
        :stroke-width="strokeWidth * 0.72"
        :stroke-dasharray="`${radius * pi * pocketMoneyRelation} ${1000}`"
        stroke-linecap="round"
        :transform="`scale(-1 -1) translate(-${diagramWidth} -${diagramWidth})`"
      />
    </svg>
    <p>{{ sum }}</p>
    <p>{{ cash }}</p>
  </div>
  <!-- TEXT-VARIANT FOR TRANSITION  -->
  <div v-if="false">
    <div class="grid grid-cols-[1fr,auto] gap-x-6 w-[250px]">
      <p v-if="salary.pocketMoney != 0">Taschengeld:</p>
      <p v-if="salary.pocketMoney != 0" class="font-medium">
        {{ Number(salary.pocketMoney).toFixed(2) }} €
      </p>
      <p v-if="salary.freeOfChargeService != 0">Sachleistungen i.W.v.:</p>
      <p v-if="salary.freeOfChargeService != 0" class="font-medium">
        {{ Number(salary.freeOfChargeService).toFixed(2) }} €
      </p>
      <p v-if="salary.freeOfChargeFood != 0">Verpflegung i.W.v.:</p>
      <p v-if="salary.freeOfChargeFood != 0" class="font-medium">
        {{ Number(salary.freeOfChargeFood).toFixed(2) }} €
      </p>
      <p v-if="salary.foodAllowance != 0">Verpflegungszuschuss:</p>
      <p v-if="salary.foodAllowance != 0" class="font-medium">
        {{ Number(salary.foodAllowance).toFixed(2) }} €
      </p>
      <p v-if="salary.freeOfChargeAccommodation != 0">Unterkunft i.W.v.:</p>
      <p v-if="salary.freeOfChargeAccommodation != 0" class="font-medium">
        {{ Number(salary.freeOfChargeAccommodation).toFixed(2) }} €
      </p>
      <p v-if="salary.accomodationAllowance != 0">Unterkunftszuschuss:</p>
      <p v-if="salary.accomodationAllowance != 0" class="font-medium">
        {{ Number(salary.accomodationAllowance).toFixed(2) }} €
      </p>
    </div>
    <hr class="mt-2 mb-2" />
    <div class="flex justify-between">
      <p>Summe:</p>
      <p>{{ Number(sum).toFixed(2) }} €</p>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const pi = 3.1415926536

    return { pi }
  },
  props: {
    diagramWidth: {
      type: Number,
      default: 250
    },
    salary: {
      type: Object,
      required: true
    }
  },
  computed: {
    center() {
      return { x: this.diagramWidth / 2, y: this.diagramWidth / 2 }
    },
    radius() {
      return this.diagramWidth / 2 - this.strokeWidth / 2
    },
    sum() {
      return (
        this.salary.pocketMoney +
        this.salary.freeOfChargeService +
        this.salary.accomodationAllowance +
        this.salary.freeOfChargeAccommodation +
        this.salary.foodAllowance +
        this.salary.freeOfChargeFood
      )
    },
    cash() {
      return this.salary.pocketMoney + this.salary.accomodationAllowance + this.salary.foodAllowance
    },
    strokeWidth() {
      return this.diagramWidth * 0.1
    },
    pocketMoneyRelation() {
      return this.salary.pocketMoney / this.sum
    },
    freeOfChargeServiceRelation() {
      return this.salary.freeOfChargeService / this.sum + this.pocketMoneyRelation
    },
    accomodationAllowanceRelation() {
      return this.salary.accomodationAllowance / this.sum + this.freeOfChargeServiceRelation
    },
    freeOfChargeAccomodationRelation() {
      return this.salary.freeOfChargeAccommodation / this.sum + this.accomodationAllowanceRelation
    },
    foodAllowanceRelation() {
      return this.salary.foodAllowance / this.sum + this.freeOfChargeAccomodationRelation
    },
    freeOfChargeFoodRelation() {
      return this.salary.freeOfChargeFood / this.sum + this.foodAllowanceRelation
    }
  }
}
</script>
