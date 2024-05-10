/**
 *
 * ██████╗        █████╗ ██████╗ ██████╗
 * ╚════██╗      ██╔══██╗██╔══██╗██╔══██╗
 *  █████╔╝█████╗███████║██████╔╝██████╔╝
 *  ╚═══██╗╚════╝██╔══██║██╔═══╝ ██╔═══╝
 * ██████╔╝      ██║  ██║██║     ██║
 * ╚═════╝       ╚═╝  ╚═╝╚═╝     ╚═╝
 *
 * @description Entry point for the application after Wrapper
 * @next last entry point
 */

import React from "react";
import { GuideBox, Panel, DataGrid, Button, DataGridSample } from "@midasit-dev/moaui";
import PreviewShape from "./Component/PreviewShape";

const initRows = [
	{ id: 1, x: 0, y: 0 },
	{ id: 2, x: 1, y: 1 },
	{ id: 3, x: 2, y: 0 }
];

const trianglePoints = [{ x: 100, y: 100 }, { x: 150, y: 150 }, { x: 100, y: 200 }];

const App = () => {
	const [rowDatas, setRowDatas] = React.useState(initRows);

  return (
    <GuideBox width={650} height={700} spacing={2} padding={2} row>
      <GuideBox>
        <Panel title="Welcome to MoaUI" width={300} height={300} justifyContent={"center"} display={"flex"} alignItems={"center"}>
          <PreviewShape Rowdata={rowDatas}/>
        </Panel>
				<Panel marginTop={2} marginBottom={2} width={300} height={300}>
          <DataGrid
            checkboxSelection
            columns={[
              {
                editable: false,
                field: "id",
                headerName: "ID",
                width: 50,
              },
              {
                editable: true,
                field: "x",
                headerName: "X",
                width: 60,
              },
              {
                field: "y",
                headerName: "Y",
                width: 60,
              }
            ]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            rows={rowDatas}
          />
        </Panel>
				<Button onClick={() => {}} variant="contained" width="100%">
					Calculate
				</Button>

      </GuideBox>
			<GuideBox>
				<Panel width={300} height={660}>
					계산서
				</Panel>
			</GuideBox>
    </GuideBox>
  );
};

export default App;
