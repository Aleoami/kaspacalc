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
