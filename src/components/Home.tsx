import { observer } from "mobx-react";
import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { INIT_INPUTS_RECORDS, KaspaInputs } from "../constants/Kaspa";
import { getKeys } from "../utils";
import { useStore } from "./App/StoreProvider";
import KaspaInput from "./KaspaInput";
import KaspaTotal from "./KaspaTotal";

const Home: React.FC = () => {
  const [kaspaInputs, setKaspaInputs] =
    React.useState<KaspaInputs>(INIT_INPUTS_RECORDS);

  const { defaultInputValues, setDefaultInputValues } =
    useStore("sessionStore");

  const handleChangeValues = React.useCallback(
    (key: keyof KaspaInputs, value: string | undefined) => {
      setDefaultInputValues(key, value);
    },
    [setDefaultInputValues]
  );

  React.useEffect(() => {
    defaultInputValues &&
      getKeys(defaultInputValues).map((key) =>
        setKaspaInputs((curKaspadInputs) => ({
          ...curKaspadInputs,
          [key]: {
            ...curKaspadInputs[key],
            value:
              defaultInputValues[key] !== 0
                ? defaultInputValues[key]
                : undefined,
          },
        }))
      );
  }, [defaultInputValues]);

  return (
    <CustomContainer>
      <h1 className="text-center mt-2 p-3">Calculate Kaspa net cost, profitability and mining rate</h1>
      {getKeys(kaspaInputs).map((key, index) => (
        <OffsetKaspaInput
          key={index}
          data={kaspaInputs}
          setData={handleChangeValues}
          label={key}
        />
      ))}
      <KaspaTotal data={kaspaInputs} className="mt-4" />
    </CustomContainer>
  );
};

const CustomContainer = styled(Container)`
  @media (min-width: 768px) {
    max-width: 720px;
  }
`;

const OffsetKaspaInput = styled(KaspaInput)`
  :not(:first-of-type) {
    margin-top: 1.5rem;
  }
`;

export default observer(Home);
