import React from "react";
import styled from "styled-components";
import { KaspaInputs, KASPA_TOTAL } from "../constants/Kaspa";

interface KaspaTotalProps {
  data: KaspaInputs;
  className?: string;
}

const KaspaTotal: React.FC<KaspaTotalProps> = ({ data, className }) => {
  return (
    <div className={className}>
      {KASPA_TOTAL.map((total, index) => (
        <OffsetTotal
          key={index}
          className={
            "d-flex justify-content-between" + (total.bold ? " fw-bold" : "")
          }
        >
          <span>{total.label}</span>
          <span>{total.calcValue(data)}</span>
        </OffsetTotal>
      ))}
    </div>
  );
};

const OffsetTotal = styled.div`
  :not(:first-of-type) {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

export default React.memo(KaspaTotal);
