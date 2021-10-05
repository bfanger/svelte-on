<script lang="ts" context="module">
  type Listener = (event: CustomEvent) => void;
  type Off = () => void;
  export type SvelteOnListeners = Record<string, Listener>;
</script>

<script lang="ts">
  import type { SvelteComponent } from "svelte";

  export let component: typeof SvelteComponent;
  export let on: SvelteOnListeners;

  let off: Off[] = [];
  let ref: any;

  function removeEventListeners() {
    off.forEach((remove) => {
      remove();
    });
    off = [];
  }
  $: syncRef(ref, on);

  function syncRef(
    instance: { $on: (event: string, listener: Listener) => Off } | undefined,
    listeners: SvelteOnListeners
  ) {
    removeEventListeners();
    if (instance && instance.$on) {
      Object.entries(listeners).forEach(([event, listener]: [string, any]) => {
        off.push(instance.$on(event, listener));
      });
    }
  }
</script>

<svelte:component this={component} bind:this={ref} {...$$restProps} />
