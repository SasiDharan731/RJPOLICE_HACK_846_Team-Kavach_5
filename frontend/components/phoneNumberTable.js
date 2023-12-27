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
                    <Cell>Phone Number Holder</Cell>
                    {console.log(item.data[0].value.addresses[0].city)}
                    <Cell>{item.data[0].value.name}</Cell>
                </Row>
                ))
                }
            {tableList.map((item) => (
              <Row>  
                <Cell>Phone Number</Cell>
                <Cell>{item.data[0].key}</Cell>
              </Row>
              ))
            }
            {tableList.map((item) => (
              <Row>  
                <Cell>Addresses</Cell>
                {console.log(item.data[0].value.addresses[0].city)}
                <Cell>{item.data[0].value.addresses[0].city}</Cell>
              </Row>
              ))
            }
             {tableList.map((item) => (
               
              <Row>  
                <Cell>Email Id</Cell>
                {console.log(item.data[0].value.addresses[0].city)}
                <Cell>{item.data[0].value.internetAddresses[0]?.id}</Cell>
              </Row> 
              ))
            }
            {tableList.map((item) => (
              <Row>  
                <Cell>Sim card Provider</Cell>
                {console.log(item.data[0].value.addresses[0].city)}
                <Cell>{item.data[0].value.phones[0].carrier}</Cell>
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
