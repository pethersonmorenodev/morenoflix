import styled, { StyledComponent, StyledComponentBase } from 'styled-components';

interface ITable extends StyledComponentBase<'div', any, {}, never> {
  RowHeader: StyledComponent<'div', any, {}, never>;
  Row: StyledComponent<'span', any, {}, never>;
  Cell: StyledComponent<'span', any, {}, never>;
}

export const Table: ITable = (styled.div`
  margin: 30px 0;
  display: grid;
  grid-template-columns: 100%;

  border-top: 4px solid var(--primary);
  border-right: 4px solid var(--primary);
  border-bottom: 4px solid var(--primary);
` as unknown) as ITable;

Table.RowHeader = styled.div`
  display: grid;
  grid-template-columns: 25% minmax(100px, 100%) 110px 140px;
  & > div {
    border-bottom: 4px solid var(--primary);
    border-left: 4px solid var(--primary);
    padding: 8px 5px;

    font-weight: normal;
    font-size: 25px;
    line-height: 30px;
    color: var(--grayLight);
  }
`;
Table.Row = styled.div`
  display: grid;
  grid-template-columns: 25% minmax(100px, 100%) 110px 140px;
  border-left: 4px solid var(--primary);
  & > div {
    padding: 8px 7px;

    font-weight: 300;
    font-size: 18px;
    line-height: 22px;
    color: var(--grayMedium);
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
Table.Cell = styled.div`
  font-family: Roboto;
  font-style: normal;
  display: flex;
  align-items: center;
`;
