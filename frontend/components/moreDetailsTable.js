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

const Component = ({ nodes }) => {

  const data = { nodes };
  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(chakraTheme);

  const report = Object.keys(data.nodes[0].report)
  console.log(data.nodes[0].report.AbnormalURL);
  const isSafe = data.nodes[0].report;
  return (
    <>
      <Table data={data} theme={theme} >
        {
          (tableList) => (
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
                {report.map((item) => (
                  <Row>

                    <Cell>{item}</Cell>
                    <Cell>
                      {tableList.report[item]}
                    </Cell>

                    {/* {console.log(tableList.report[item])} */}
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
