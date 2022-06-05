import React from "react";
import styled from "styled-components";
import { KaspaInputs } from "../constants/Kaspa";

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
  return (
    <Wrapper className={className}>
      <Title className="mb-0 text-dark">{data[label].title}</Title>
      <p className="mb-0 text-muted">
      {data[label].label?.map(function(it) {
        return (it &&
          (it?.href ? (
               <LblHref target="_blank" href={it?.href}>
                {it?.text}
              </LblHref>
          ) : (
            it?.text
          )))}
      )}
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

export default React.memo(KaspaInput);
