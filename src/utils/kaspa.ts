import { KaspaInputs } from "../constants/Kaspa";

export const calcDailyTotalSupply = (data: KaspaInputs) => {
  const { rewardPerBlock, blocksPerSecond } = data;
  return (
    (rewardPerBlock.value !== undefined &&
      blocksPerSecond.value !== undefined &&
      rewardPerBlock.value * blocksPerSecond.value * 86400) ||
    undefined
  );
};

export const calcDailyLocalSupply = (data: KaspaInputs) => {
  const { deviceHashrate, networkHashrate } = data;
  const dailyTotalSupply = calcDailyTotalSupply(data);
  return (
    (deviceHashrate.value !== undefined &&
      networkHashrate.value !== undefined &&
      dailyTotalSupply !== undefined &&
      (dailyTotalSupply * deviceHashrate.value) /
        (networkHashrate.value * 1000000)) ||
    undefined
  );
};

export const calcDaysTo1M = (data: KaspaInputs) => {
  const dailyTotalSupply = calcDailyLocalSupply(data);
  return (dailyTotalSupply !== undefined && 1000000 / dailyTotalSupply) || 0;
};

export const calcKWhPerDay = (data: KaspaInputs) => {
  const { devicePowerCons } = data;
  return (
    (devicePowerCons.value !== undefined &&
      (devicePowerCons.value / 1000) * 24) ||
    undefined
  );
};

export const calcCostOf1M = (data: KaspaInputs) => {
  const { electricityPrice } = data;
  const daysTo1M = calcDaysTo1M(data);
  const kWhPerDay = calcKWhPerDay(data);
  return (
    (electricityPrice.value !== undefined &&
      daysTo1M !== undefined &&
      kWhPerDay !== undefined &&
      daysTo1M * kWhPerDay * electricityPrice.value) ||
    undefined
  );
};

export const calcBlocksPerDay = (data: KaspaInputs) => {
  const dailyTotalSupply = calcDailyLocalSupply(data);
  return (dailyTotalSupply !== undefined &&
    data.rewardPerBlock.value !== undefined &&
    data.blocksPerSecond.value !== undefined && 
    dailyTotalSupply / data.rewardPerBlock.value) || undefined;
};

export const calcMinutesPerBlock = (data: KaspaInputs) => {
  const blocksPerDay = calcBlocksPerDay(data);
  return ((blocksPerDay !== undefined) &&
    (24 * 60 / blocksPerDay)) || undefined;
};
