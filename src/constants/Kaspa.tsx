import { numberWithSpaces } from "../utils";
import {
  calcCostOf1M,
  calcDaysTo1M,
  calcDailyLocalSupply,
  calcBlocksPerDay,
  calcMinutesPerBlock
} from "../utils/kaspa";

export interface LabelProps {
  text: string;
  href?: string;
}

export interface InputProps {
  title: string;
  label?: LabelProps;
  value?: number;
}

export enum InputValues {
  rewardPerBlock = "rewardPerBlock",
  blocksPerSecond = "blocksPerSecond",
  networkHashrate = "networkHashrate",
  deviceHashrate = "deviceHashrate",
  devicePowerCons = "devicePowerCons",
  electricityPrice = "electricityPrice",
}

export type KaspaInputs = { [key in keyof typeof InputValues]: InputProps };

export type DefaultInputValues = { [key in keyof typeof InputValues]?: number };

export const INIT_INPUTS_RECORDS: KaspaInputs = {
  rewardPerBlock: {
    title: "Reward per block, Kaspa",
    label: { text: "is 500 for today" },
  },
  blocksPerSecond: {
    title: "Blocks per second",
    label: { text: "is 1 for today" },
  },
  networkHashrate: {
    title: "Network hashrate, Ghash/s",
    label: {
      text: "see hashrate here",
      href: "http://kasboard-mainnet.daglabs-dev.com",
    },
  },
  deviceHashrate: {
    title: "Your device hashrate, Mhash/s",
    label: { text: "note that in older versions of miners the hashrate is shown in khash/s; in this case divide it by 1000 before entering" },
  },
  devicePowerCons: {
    title: "Your device power consumption, Watt",
  },
  electricityPrice: {
    title: "Electricity price, per 1 KWh",
    label: { text: "in your local currency unit" },
  },
};

interface KaspaTotalField {
  label: string;
  bold?: true;
  calcValue: (data: KaspaInputs) => string;
}

export const KASPA_TOTAL: KaspaTotalField[] = [
  {
    label: "Net cost in local currency per 1M Kaspa:",
    bold: true,
    calcValue: (data) => numberWithSpaces(Number(calcCostOf1M(data) || 0).toFixed(2)),
  },
  {
    label: "and earning 1M Kaspa will take, days:",
    calcValue: (data) => numberWithSpaces(Number(calcDaysTo1M(data) || 0).toFixed(2)),
  },
  {
    label: "with approx. Kaspa per day:",
    calcValue: (data) => numberWithSpaces(Number(calcDailyLocalSupply(data) || 0).toFixed(0)),
  },
  {
    label: "or blocks per day:",
    calcValue: (data) => numberWithSpaces(Number(calcBlocksPerDay(data) || 0).toFixed(2)),
  },
  {
    label: "or on average 1 block every, minutes:",
    calcValue: (data) => numberWithSpaces(Number(calcMinutesPerBlock(data) || 0).toFixed(1)),
  },
];
