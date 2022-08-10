import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import useAsyncEffect from "use-async-effect";
import { KaspaInputs } from "../constants/Kaspa";
import { StoreTrigger } from "../constants/trigger";
import { fetchKaspaUsdPrice } from "../services/kaspa";
import { useStore } from "./App/StoreProvider";

interface KaspaInputProps {
  data: KaspaInputs;
  label: keyof KaspaInputs;
  setData: (key: keyof KaspaInputs, value: string | undefined) => void;
  className?: string;
}

const KaspaInput: React.FC<KaspaInputProps> = ({
  data,
  label,
  setData,
  className,
}) => {
  const fetchPriceTrigger =
    useStore("sessionStore").triggerEvents[StoreTrigger.FETCH_KASPA_PRICE];

  useAsyncEffect(async () => {
    if (!fetchPriceTrigger || label !== "coinPricePer1M") return;

    const kaspaInUsd = await fetchKaspaUsdPrice();
    setData(label, `${kaspaInUsd * 1000000}`);

    // @NOTE: нас интересует лишь триггер, что бы не заменял значения
    // когда компонент перерендоривался
  }, [fetchPriceTrigger]);

  return (
    <Wrapper className={className}>
      <Title className="mb-0 text-dark">{data[label].title}</Title>
      <p className="mb-0 text-muted">
        {data[label].label?.map(function (item, idx) {
          if (item.onClick) {
            return (
              // @NOTE: мне лень разбираться можешь сам посмотреть
              // , жаль что ты сидишь через недо эдитор
              // и не понимаешь зачем эти строки
              // eslint-disable-next-line no-script-url
              <LblHref onClick={item.onClick} key={idx} href="javascript:;">
                {item.text}
              </LblHref>
            );
          }

          if (item.href) {
            return (
              <LblHref key={idx} target="_blank" href={item?.href}>
                {item.text}
              </LblHref>
            );
          }

          return <span key={idx}>{item.text}</span>;
        })}
      </p>
      <div className="d-flex">
        <NumberInput
          className={"w-100 mt-1"}
          type="text"
          placeholder=" *"
          value={data[label].value}
          onChange={(e) => {
            setData(label, e.target.value);
          }}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  input:not([value=""]) {
    border-bottom: 2px solid #c4c4c4;
  }
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

const LblHref = styled.a`
  text-decoration: none;
`;

const NumberInput = styled.input`
  border-radius: 0;
  padding-bottom: 5px;
  border: none;
  outline: none;
  border-bottom: 2px solid #dbe3ef;

  :focus-visible,
  :focus {
    border-radius: 0;
    border-bottom: 2px solid #343a40 !important;
  }

  .isEmpty {
    border-bottom: 2px solid red;
  }
`;

export default observer(KaspaInput);
