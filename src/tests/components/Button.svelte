<script lang="ts">
  /**
   * An example component with props and events
   */
  export let label = "";
</script>

<button on:click on:mouseenter on:mouseleave data-testid="button">
  <slot />
  {label}
</button>
