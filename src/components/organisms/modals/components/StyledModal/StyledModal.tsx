import Modal from "styled-react-modal";

const StyledModal = Modal.styled`
  width: 80%;
  border-radius: ${(props: any) => props.theme.radii[1]}px;
  display: flex;
  padding: ${(props: any) => props.theme.space[3]}px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color:${(props: any) => props.theme.palette.secondary.main};
`;

export default StyledModal;
