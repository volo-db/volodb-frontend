<template>
  <div class="relative">
    <div v-if="false">
      <!-- SVG NOT READY YET -->
      <svg
        :width="`${diagramWidth}px`"
        :height="`${diagramWidth * 0.55}px`"
        xmlns="http://www.w3.org/2000/svg"
        viewbox="0 0 1 1"
      >
        <!-- SERVICE -->
        <!-- Free of charge -->
        <path :d="generateHalfRingPath(0, 0.2)" fill="#FEF6D8" />
        <!-- Pocketmoney -->
        <path :d="generateHalfRingPath(0.2, 0.16)" fill="#FCD12E" />
        <!-- ACCOMODATIN -->
        <!-- Free of charge -->
        <path :d="generateHalfRingPath(0.36, 0.16)" fill="#A0B9FF" />
        <!-- Allowance -->
        <path :d="generateHalfRingPath(0.52, 0.16)" fill="#0025FF" />
        <!-- FOOD -->
        <!-- Free of charge -->
        <path :d="generateHalfRingPath(0.68, 0.16)" fill="#ffd3ad" />
        <!-- Allowance -->
        <path
          :d="generateHalfRingPath(0.84, 0.16)"
          fill="red"
          @mouseenter="console.log('enter')"
          @mouseleave="console.log('leave')"
        />
      </svg>
      <div class="absolute top-0 w-[100%] text-center mt-20">
        <p class="text-3xl">{{ toValidEuro(sum) }}</p>
        <p class="text-sm">Auszahlungsbetrag: {{ toValidEuro(cash) }}</p>
      </div>
    </div>

    <!-- TEXT-VARIANT FOR TRANSITION  -->
    <div v-if="true">
      <div class="grid grid-cols-[1fr,auto] gap-x-6 w-[290px]">
        <p v-if="salary.pocketMoney != 0">Taschengeld:</p>
        <p v-if="salary.pocketMoney != 0" class="font-medium">
          {{ toValidEuro(salary.pocketMoney) }}
        </p>
        <p v-if="salary.freeOfChargeService != 0">Sachleistungen i.W.v.:</p>
        <p v-if="salary.freeOfChargeService != 0" class="font-medium">
          {{ toValidEuro(salary.freeOfChargeService) }}
        </p>
        <p v-if="salary.freeOfChargeFood != 0">Verpflegung i.W.v.:</p>
        <p v-if="salary.freeOfChargeFood != 0" class="font-medium">
          {{ toValidEuro(salary.freeOfChargeFood) }}
        </p>
        <p v-if="salary.foodAllowance != 0">Verpflegungszuschuss:</p>
        <p v-if="salary.foodAllowance != 0" class="font-medium">
          {{ toValidEuro(salary.foodAllowance) }}
        </p>
        <p v-if="salary.freeOfChargeAccommodation != 0">Unterkunft i.W.v.:</p>
        <p v-if="salary.freeOfChargeAccommodation != 0" class="font-medium">
          {{ toValidEuro(salary.freeOfChargeAccommodation) }}
        </p>
        <p v-if="salary.accomodationAllowance != 0">Unterkunftszuschuss:</p>
        <p v-if="salary.accomodationAllowance != 0" class="font-medium">
          {{ toValidEuro(salary.accomodationAllowance) }}
        </p>
      </div>
      <hr class="mt-2 mb-2" />
      <div class="flex justify-between">
        <p>Summe:</p>
        <p>{{ toValidEuro(sum) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { toValidEuro } from '@/utils/currency'
export default {
  setup() {
    const pi = Math.PI

    return { pi, toValidEuro }
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
    innerRadius() {
      return this.radius
    },
    outerRadius() {
      return this.diagramWidth / 2
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
  },
  methods: {
    polarToCartesian(cx, cy, r, angleInDegrees) {
      const angleInRadians = (angleInDegrees * this.pi) / 180.0
      return {
        x: cx + r * Math.cos(angleInRadians),
        y: cy + r * Math.sin(angleInRadians)
      }
    },
    generateHalfRingPath(start, ratio) {
      const outerR = this.diagramWidth / 2
      const innerR = outerR - this.strokeWidth

      // Calculate the end angle based on the ratio
      const startAngle = 180 + 180 * start // Starting from the top of the circle
      const sweepAngle = 180 * ratio // Sweep angle based on the ratio
      const endAngle = startAngle + sweepAngle // Ending angle

      // Outer arc start and end points
      const outerStart = this.polarToCartesian(this.center.x, this.center.y, outerR, startAngle)
      const outerEnd = this.polarToCartesian(this.center.x, this.center.y, outerR, endAngle)

      // Inner arc start and end points (drawn in reverse order)
      const innerStart = this.polarToCartesian(this.center.x, this.center.y, innerR, endAngle)
      const innerEnd = this.polarToCartesian(this.center.x, this.center.y, innerR, startAngle)

      // Generate the path string
      return [
        'M',
        outerStart.x,
        outerStart.y, // Move to the start point of the outer arc
        'A',
        outerR,
        outerR,
        0,
        sweepAngle > 180 ? 1 : 0,
        1,
        outerEnd.x,
        outerEnd.y, // Draw the outer arc
        'L',
        innerStart.x,
        innerStart.y, // Line to the start of the inner arc
        'A',
        innerR,
        innerR,
        0,
        sweepAngle > 180 ? 1 : 0,
        0,
        innerEnd.x,
        innerEnd.y, // Draw the inner arc
        'Z' // Close the path to complete the ring shape
      ].join(' ')
    }
  }
}
</script>
