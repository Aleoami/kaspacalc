import { makeAutoObservable, observable } from "mobx";
import { DefaultInputValues, KaspaInputs } from "../constants/Kaspa";

class SessionStore {
  @observable
  defaultInputValues: DefaultInputValues | null = null;
  triggerEvents: Record<string, number | undefined> = {};

  constructor() {
    makeAutoObservable(this);
    const sessionData = window.localStorage.getItem("defaultInputValuesV2");
    if (sessionData !== null) this.defaultInputValues = JSON.parse(sessionData);
  }

  setDefaultInputValues = (
    key: keyof KaspaInputs,
    value: string | undefined
  ): void => {
    if (!this.defaultInputValues) this.defaultInputValues = {};
    const result = {
      ...this.defaultInputValues,
      [key]: value,
    };
    this.defaultInputValues = result;
    window.localStorage.setItem("defaultInputValuesV2", JSON.stringify(result));
  };

  trigger = (key: string): void => {
    this.triggerEvents = {
      ...this.triggerEvents,
      [key]: (this.triggerEvents?.[key] || 0) + 1,
    };
  };
}

export default SessionStore;
