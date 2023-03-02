import axios from "axios";

export async function fetchKaspaUsdPrice() {
  const {
    data: {
      kaspa: { usd: kaspaInUsd },
    },
  } = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=kaspa&vs_currencies=usd"
  );

  return kaspaInUsd;
}

export async function fetchRewardPerBlock() {
  const {
    data: {
      blockreward: blockRewardValue,
    },
  } = await axios.get(
    "https://api.kaspacalc.net/info/blockreward"
  );

  return blockRewardValue;
}

export async function fetchNetworkHashrateThs() {
  const {
    data: {
      hashrate: networkHashrateThs,
    },
  } = await axios.get(
    "https://api.kaspacalc.net/info/hashrate"
  );

  return networkHashrateThs;
}