<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="stepper-wrapper">
      
      <!-- Outer rotating broken circle -->
      <svg
        class="outer-circle"
        width="160"
        height="160"
        viewBox="0 0 160 160"
      >
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          :stroke="color"
          stroke-width="6"
          stroke-linecap="round"
          stroke-dasharray="220 60"
        />
      </svg>

      <!-- Inner rotating filled circle -->
      <div
        class="inner-circle d-flex justify-content-center align-items-center text-white fw-bold"
        :style="{ backgroundColor: color }"
      >
        {{ text }}
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: 'StepperCircle',
  props: {
    text: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#28a745'
    }
  }
}
</script>
<style scoped>
.stepper-wrapper {
  position: relative;
  width: 160px;
  height: 160px;
}

/* OUTER CIRCLE */
.outer-circle {
  position: absolute;
  top: 0;
  left: 0;
  animation: rotate-clockwise 2s linear infinite;
}

/* INNER FILLED CIRCLE */
.inner-circle {
  font-family: 'Courier New', Courier, monospace;
  position: absolute;
  top: 20px;
  left: 20px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  animation: rotate-counter 2s linear infinite;
  font-size: 1.1rem;
  text-align: center;
}

/* ROTATIONS */
@keyframes rotate-clockwise {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes rotate-counter {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
</style>
