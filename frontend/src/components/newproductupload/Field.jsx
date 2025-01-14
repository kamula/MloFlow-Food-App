/* eslint-disable no-unsafe-optional-chaining */
import React from "react";
import styled from "@emotion/styled";

export const Field = ({ label, children, htmlFor, error }) => {
  const id = htmlFor || getChildId(children);
  return (
    <Container errorState={!!error}>
      {label && <Label htmlFor={id}>{label}</Label>}
      {children}
      {!!error && <ErrorMessage role="alert">{error.message}</ErrorMessage>}
    </Container>
  );
};

const getChildId = (children) => {
  const child = React.Children.only(children);

  if ("id" in child?.props) {
    return child.props.id;
  }
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: flex-start;
  margin: 16px 0;
  padding: 0;
  border: none;
  width: 100%;

  input,
  textarea {
    border-color: ${({ errorState }) => (errorState ? "red" : "#0C0B0B")};
  }
`;

const Label = styled.label`
  margin-bottom: 2px;
  color:#000;
  font-size:1.2rem;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
`;