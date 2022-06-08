import { KaspaInputs } from "../constants/Kaspa";

export const calcDailyTotalSupply = (data: KaspaInputs) => {
  const { rewardPerBlock } = data;
  const numRewardPerBlock = Number(rewardPerBlock.value);
  return (
    (numRewardPerBlock !== undefined &&
      numRewardPerBlock * 1 * 86400) ||
    undefined
  );
};

export const calcDailyLocalSupply = (data: KaspaInputs) => {
  const { deviceHashrate, networkHashrate } = data;
  const numDeviceHashrate = Number(deviceHashrate.value);
  const numNetworkHashrate = Number(networkHashrate.value);
  const dailyTotalSupply = calcDailyTotalSupply(data);
  return (
    (numDeviceHashrate !== undefined &&
      numNetworkHashrate !== undefined &&
      dailyTotalSupply !== undefined &&
      (dailyTotalSupply * numDeviceHashrate) /
        (numNetworkHashrate * 1000000)) ||
    undefined
  );
};

export const calcDaysTo1M = (data: KaspaInputs) => {
  const dailyTotalSupply = calcDailyLocalSupply(data);
  return (dailyTotalSupply !== undefined && 1000000 / dailyTotalSupply) || 0;
};

export const calcKWhPerDay = (data: KaspaInputs) => {
  const { devicePowerCons } = data;
  const numDevicePowerCons = Number(devicePowerCons.value);
  return (
    (numDevicePowerCons !== undefined &&
      (numDevicePowerCons / 1000) * 24) ||
    undefined
  );
};

export const calcCostOf1M = (data: KaspaInputs) => {
  const { electricityPrice } = data;
  const numElectricityPrice = Number(electricityPrice.value);
  const daysTo1M = calcDaysTo1M(data);
  const kWhPerDay = calcKWhPerDay(data);
  return (
    (numElectricityPrice !== undefined &&
      daysTo1M !== undefined &&
      kWhPerDay !== undefined &&
      daysTo1M * kWhPerDay * numElectricityPrice) ||
    undefined
  );
};

export const calcProfitabilityOf1M = (data: KaspaInputs) => {
  const { coinPricePer1M } = data;
  const numCoinPricePer1M = Number(coinPricePer1M.value);
  const netCostPer1MRaw = calcCostOf1M(data);
  const netCostPer1M = 
    (netCostPer1MRaw !== undefined && netCostPer1MRaw) || 0;

  return ((numCoinPricePer1M !== undefined &&
    netCostPer1M !== undefined &&
    (numCoinPricePer1M - netCostPer1M)) ||
    undefined
  );
};

export const calcDailyProfit = (data: KaspaInputs) => {
  const profitPer1M = calcProfitabilityOf1M(data);
  const daysToEarn1M = calcDaysTo1M(data);
  return ((profitPer1M !== undefined &&
    daysToEarn1M !== undefined &&
    daysToEarn1M !== 0 &&
    (profitPer1M / daysToEarn1M)) ||
    undefined
  );
};

export const calcWeeklyProfit = (data: KaspaInputs) => {
  const dailyProfit = calcDailyProfit(data);
  return ((dailyProfit !== undefined &&
    (dailyProfit * 7)) ||
    undefined
  );
};

export const calcMonthlyProfit = (data: KaspaInputs) => {
  const dailyProfit = calcDailyProfit(data);
  return ((dailyProfit !== undefined &&
    (dailyProfit * 30)) ||
    undefined
  );
};

export const calcBlocksPerDay = (data: KaspaInputs) => {
  const dailyTotalSupply = calcDailyLocalSupply(data);
  return (dailyTotalSupply !== undefined &&
    data.rewardPerBlock.value !== undefined &&
    (dailyTotalSupply / data.rewardPerBlock.value)) || undefined;
};

export const calcMinutesPerBlock = (data: KaspaInputs) => {
  const blocksPerDay = calcBlocksPerDay(data);
  return ((blocksPerDay !== undefined) &&
    (24 * 60 / blocksPerDay)) || undefined;
};
