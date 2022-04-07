import React from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";

const ErrorCard = styled.div`
  position: fixed;
  top: 30vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  overflow: hidden;
  border-radius: 0.1rem;
  background: white;
  -webkit-box-shadow: 2px 2px 9px 0px rgba(0, 0, 0, 0.18);
  -moz-box-shadow: 2px 2px 9px 0px rgba(0, 0, 0, 0.18);
  box-shadow: 2px 2px 9px 0px rgba(0, 0, 0, 0.18);

  @media (min-width: 768px) {
    left: calc(50% - 20rem);
    width: 40rem;
  }
`;

const ErrorHeader = styled.header`
  background: #2874f0;
  padding: 0.9rem;
`;

const ErrorTitle = styled.h2`
  margin: 0;
  color: white;
`;

const ErrorContent = styled.div`
  padding: 1rem;
`;

const ErrorMessage = styled.p`
  font-size: 1rem;
`;

const ErrorFooter = styled.footer`
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  background: #2874f0;
  color: white;
  font-size: 1rem;
  padding: 0.75em 1.5em;
  border-radius: 1em;
`;

const BackdropArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: rgba(0, 0, 0, 0.75);
`;

const Backdrop = (props) => {
  return <BackdropArea onClick={props.onConfirm}></BackdropArea>;
};

const ModalOverlay = (props) => {
  return (
    <ErrorCard>
      <ErrorHeader>
        <ErrorTitle>{props.title}</ErrorTitle>
      </ErrorHeader>
      <ErrorContent>
        <ErrorMessage>{props.message}</ErrorMessage>
      </ErrorContent>
      <ErrorFooter>
        <CloseButton onClick={props.onConfirm}>Okay</CloseButton>
      </ErrorFooter>
    </ErrorCard>
  );
};

function ErrorModal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
}

export default ErrorModal;
