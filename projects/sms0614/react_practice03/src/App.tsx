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
import { GuideBox, Panel, DataGrid, Button } from "@midasit-dev/moaui";
import PreviewShape from "./Component/PreviewShape";
import MDReport from "./Component/MarkdownView";
import { cal_py } from "./utils_pyscript";
import { set } from "lodash";
//pyscript


const initRows = [
  { id: 1, x: 10, y: 10 },
  { id: 2, x: 300, y: 10 },
  { id: 3, x: 300, y: 300 },
  { id: 4, x: 10, y: 300 },
];

const totaldataSet = {
  "vertices": [],
};

export default function App (){
  const [rowDatas, setRowDatas] = React.useState(initRows);
  const [result, setResult] = React.useState("");
  function onClickCalculate() {
    //convert rowDatas to totaldataSet
    const vertices = {
      ...totaldataSet,
      "vertices": rowDatas.map((row) => [row.x, row.y]),
    };
    const cal_result = cal_py(vertices)
    const message = cal_result.message
    setResult(message);
    console.log("cal_result", cal_result);
  }

  function onClickAdd() {
    // add new row (use setRowDatas function)
    const newId = rowDatas.length + 1;
    setRowDatas([...rowDatas, { id: newId, x: 0, y: 0 }]);
  }

  function onClickDelete() {
    // delete last row (use setRowDatas function)
    // consider rowDatas.length > 0
    if (rowDatas.length > 0) {
      setRowDatas(rowDatas.slice(0, rowDatas.length - 1));
    }
  }

  return (
    <GuideBox width={650} height={700} spacing={2} padding={2} row>
      <GuideBox>
        <Panel
          title="Welcome to MoaUI"
          width={300}
          height={300}
          justifyContent={"center"}
          display={"flex"}
          alignItems={"center"}
          padding={0}
        >
          <PreviewShape rowdata={rowDatas}/>
        </Panel>
        <Panel marginTop={2} marginBottom={2}  height={300}>
          <GuideBox
            height={240}
            width={280}
            marginBottom={1}
            overflow="hidden"
            center
          >
            <DataGrid
              columns={[
                {
                  editable: false,
                  field: "id",
                  headerName: "ID",
                  width: 40,
                },
                {
                  editable: true,
                  field: "x",
                  headerName: "X",
                  width: 110,
                },
                {
                  editable: true,
                  field: "y",
                  headerName: "Y",
                  width: 110,
                },
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
              hideFooter
              hideFooterPagination
              hideFooterSelectedRowCount
              processRowUpdate={(newValue: any) => {
                console.log("newValue", newValue);
                setRowDatas(
                  rowDatas.map((row) =>
                    row.id === newValue.id
                      ? {
                          id: newValue["id"],
                          x: Number(newValue["x"]),
                          y: Number(newValue["y"]),
                        }
                      : row
                  )
                );
                return newValue;
              }}
              onProcessRowUpdateError={(error: any) => {
                console.log("error", error);
              }}
            />
          </GuideBox>
          <GuideBox row horRight spacing={1} marginRight={1}>
            <Button width="70px" color="normal" onClick={onClickAdd}>
              Add
            </Button>
            <Button width="70px" color="negative" onClick={onClickDelete}>
              Delete
            </Button>
          </GuideBox>
        </Panel>
        <Button width="100%" variant="contained" onClick={onClickCalculate}>
          Calculate
        </Button>
      </GuideBox>
      <GuideBox>
        <Panel width={300} height={660} padding={1}>
					<GuideBox center>
						<div
							style={{
								height: 640,
								width: 280,
								overflowY: "scroll",
								fontSize: 12,
							}}
						>
							<MDReport mdData={result}/>
						</div>
					</GuideBox>
        </Panel>
      </GuideBox>
    </GuideBox>
  );
}