import Modal from "styled-react-modal";
const StyledModal = Modal.styled`
  width: 80%;
  display: flex;
  padding: ${(props: any) => props.theme.space[3]}px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props: any) => props.theme.colors.white};
`;

export default StyledModal;
