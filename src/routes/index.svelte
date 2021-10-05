<script lang="ts">
  import SvelteOn, { SvelteOnListeners } from "$lib/SvelteOn.svelte";
  import { onMount } from "svelte";
  import Button from "../tests/components/Button.svelte";

  let enabled = false;
  let counter = 1;

  let listeners: SvelteOnListeners = {};

  function onClick() {
    counter++;
  }
  onMount(() => {
    const timer = setInterval(() => {
      enabled = !enabled;
      if (enabled) {
        listeners = { click: onClick };
      } else {
        listeners = {};
      }
    }, 2000);
    return () => clearInterval(timer);
  });
</script>

<h1>Demo</h1>
<div class="counter" class:enabled>{counter}</div>
<SvelteOn component={Button} on={listeners} label="test" />
<slot />

<style>
  .counter:not(.enabled) {
    opacity: 0.5;
  }
</style>
