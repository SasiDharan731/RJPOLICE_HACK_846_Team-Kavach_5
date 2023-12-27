import * as React from "react";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/chakra-ui';

const Component = ({nodes}) => {

  const data = { nodes };
  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(chakraTheme);

  return (
    <>
    <Table data={data} theme = {theme} >
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell>Name</HeaderCell>
              <HeaderCell>Values</HeaderCell>
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item) => (
              <Row>  
                <Cell>Message</Cell>
                <Cell>{item.message}</Cell>
              </Row>
              ))
            }

          {tableList.map((item) => (
              <Row>  
                <Cell>URL</Cell>
                <Cell>{item.report.UsingIp.value}</Cell>
              </Row>
            ))
          }
          {tableList.map((item) => (
              <Row>  
                <Cell>GoogleIndex</Cell>
                <Cell>{item.report.GoogleIndex}</Cell>
              </Row>
            ))
          }
          {tableList.map((item) => (
              <Row>  
                <Cell>HTTPSDomainURL</Cell>
                <Cell>{item.report.HTTPSDomainURL}</Cell>
              </Row>
            ))
          }
          {tableList.map((item) => (
              <Row>  
                <Cell>LinksPointingToPage</Cell>
                <Cell>{item.report.LinksPointingToPage}</Cell>
              </Row>
            ))
          }
          </Body>
        </>
      )}
      
    </Table>

    </>
  );
};

export default Component;
