import styled from "styled-components";

const ItemListaEstilizado = styled.li`
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 24px;
  cursor: pointer;
  color: ${(props) => (props.$ativo ? "#7B78E5" : "#D9D9D9")};
  font-family: ${(props) =>
    props.$ativo ? "GandhSansBold" : "#GandhSansRegular"};
  display: flex;
  align-items: center;
  gap: 22px;
`;

const ItemNavegacao = ({
  children,
  iconeAtivo,
  iconeInativo,
  ativo = false,
}) => {
  const icone = ativo ? iconeAtivo : iconeInativo;

  return (
    <ItemListaEstilizado $ativo={ativo}>
      <img src={icone} alt="ícone de navegação" />
      {children}
    </ItemListaEstilizado>
  );
};

export default ItemNavegacao;
