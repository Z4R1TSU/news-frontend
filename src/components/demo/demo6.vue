<template>
  <div class="account">
    <h1>{{ accountName }}'s Ethereum Exchange</h1>
    <div class="stats">
      <p>Browsing Time: {{ browsingTime }} minutes</p>
      <p>Invites Sent: {{ invites }}</p>
      <p>Total ETH: {{ totalETH.toFixed(4) }} ETH</p>
    </div>
    <div class="actions">
      <button @click="exchangeBrowsingTime">
        Exchange Browsing Time for ETH
      </button>
      <button @click="exchangeInvites">Exchange Invites for ETH</button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "Account-component",
  setup() {
    const accountName = ref("John Doe");
    const browsingTime = ref(120); // in minutes
    const invites = ref(5); // number of invites sent
    const ethPerMinute = 0.0001; // ETH earned per minute of browsing
    const ethPerInvite = 0.01; // ETH earned per invite

    const totalETH = computed(() => {
      return browsingTime.value * ethPerMinute + invites.value * ethPerInvite;
    });

    const exchangeBrowsingTime = () => {
      if (browsingTime.value > 0) {
        browsingTime.value = 0;
      }
    };

    const exchangeInvites = () => {
      if (invites.value > 0) {
        invites.value = 0;
      }
    };

    return {
      accountName,
      browsingTime,
      invites,
      totalETH,
      exchangeBrowsingTime,
      exchangeInvites,
    };
  },
};
</script>

<style scoped>
.account {
  text-align: center;
  margin-top: 50px;
}
.stats p {
  font-size: 18px;
  margin: 10px 0;
}
.actions {
  margin-top: 20px;
}
button {
  padding: 10px 20px;
  margin: 10px;
  background-color: #6272a4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #44475a;
}
</style>
