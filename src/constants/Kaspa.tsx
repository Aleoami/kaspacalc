import { store } from "../components/App/StoreProvider";
import { numberWithSpaces } from "../utils";

import {
  calcCostOf1M,
  calcDaysTo1M,
  calcDailyLocalSupply,
  calcBlocksPerDay,
  calcMinutesPerBlock,
  calcProfitabilityOf1M,
  calcDailyProfit,
  calcWeeklyProfit,
  calcMonthlyProfit,
} from "../utils/kaspa";
import { StoreTrigger } from "./trigger";

export interface LabelProp {
  text: string;
  href?: string;
  onClick?: () => void;
}

export interface LabelProps {
  items: [LabelProp];
}

export interface InputProps {
  title: string;
  label?: LabelProp[];
  value?: number;
}

export enum InputValues {
  rewardPerBlock = "rewardPerBlock",
  networkHashrate = "networkHashrate",
  deviceHashrate = "deviceHashrate",
  devicePowerCons = "devicePowerCons",
  electricityPrice = "electricityPrice",
  coinPricePer1M = "coinPricePer1M",
}

export type KaspaInputs = { [key in keyof typeof InputValues]: InputProps };

export type DefaultInputValues = { [key in keyof typeof InputValues]?: number };

export const INIT_INPUTS_RECORDS: KaspaInputs = {
  rewardPerBlock: {
    title: "Reward per block, Kaspa",
    label: [{ text: "is 349.23 for today" }],
  },
  networkHashrate: {
    title: "Network hashrate, Thash/s",
    label: [
	{
        text: "see hashrate ",
	},
	{
        text: "here",
        href: "https://minerstat.com/coin/KAS/network-hashrate",
	},
	{
        text: " or ",
	},
	{
        text: "here",
        href: "http://kasboard-mainnet.kas.pa/?orgId=1&refresh=1m&from=now-5m&to=now",
	},
    ]
  },
  deviceHashrate: {
    title: "Your device hashrate, Mhash/s",
    label: [
      {
        text: "either enter the value from your miner ",
      },
      {
        text: "or look for it in one of these tables",
        href: "https://kaspawiki.net/index.php/Hashrate_tables",
      },
    ],
  },
  devicePowerCons: {
    title: "Your device power consumption, Watt",
  },
  electricityPrice: {
    title: "Electricity price, per 1 KWh",
    label: [{ text: "in your local currency unit" }],
  },
  coinPricePer1M: {
    title: "Kaspa price, per 1M",
    label: [
      {
        text: "in the same currency unit as the electricity price (",
      },
      {
        text: "click here to insert Coingecko reported price in USD",
        onClick: () =>
          store.sessionStore.trigger(StoreTrigger.FETCH_KASPA_PRICE),
      },
      {
        text: ")",
      },
    ],
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
    calcValue: (data) =>
      numberWithSpaces(Number(calcCostOf1M(data) || 0).toFixed(2)),
  },
  {
    label: "Profitability per 1M Kaspa:",
    bold: true,
    calcValue: (data) =>
      numberWithSpaces(Number(calcProfitabilityOf1M(data) || 0).toFixed(2)),
  },
  {
    label: "Daily profit:",
    bold: true,
    calcValue: (data) =>
      numberWithSpaces(Number(calcDailyProfit(data) || 0).toFixed(2)),
  },
  {
    label: "Weekly profit:",
    bold: true,
    calcValue: (data) =>
      numberWithSpaces(Number(calcWeeklyProfit(data) || 0).toFixed(2)),
  },
  {
    label: "Monthly profit (for 30 days):",
    bold: true,
    calcValue: (data) =>
      numberWithSpaces(Number(calcMonthlyProfit(data) || 0).toFixed(2)),
  },
  {
    label: "while earning 1M Kaspa will take, days:",
    calcValue: (data) =>
      numberWithSpaces(Number(calcDaysTo1M(data) || 0).toFixed(2)),
  },
  {
    label: "with approx. Kaspa per day:",
    calcValue: (data) =>
      numberWithSpaces(Number(calcDailyLocalSupply(data) || 0).toFixed(0)),
  },
  {
    label: "or blocks per day:",
    calcValue: (data) =>
      numberWithSpaces(Number(calcBlocksPerDay(data) || 0).toFixed(2)),
  },
  {
    label: "or on average 1 block every, minutes:",
    calcValue: (data) =>
      numberWithSpaces(Number(calcMinutesPerBlock(data) || 0).toFixed(1)),
  },
];
