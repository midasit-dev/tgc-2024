import React from 'react';
import moaui, {
	Button,
	GuideBox,
	DataGrid,
	TabGroup,
	Tab,
	TextField,
	Typography,
} from '@midasit-dev/moaui';

function getDefault() {
	const result = {
		columns: [
			{ field: "id", headerName: "ID", width: 30, sortable: false },
			{ field: "C1", headerName: "C1", width: 400, sortable: false, editable: true },
		],
		rows: [
			{ id: 1, C1: "Empty" },
		]
	};

	return result;
}

function getResultCase1() {
	const result = {
		columns: [
			{ field: "id", headerName: "ID", width: 30, sortable: false },
			{ field: "C1", headerName: "C1", width: 100, sortable: false, editable: true },
			{ field: "C2", headerName: "C2", width: 100, sortable: false, editable: true },
			{ field: "C3", headerName: "C3", width: 100, sortable: false, editable: true },
			{ field: "C4", headerName: "C4", width: 100, sortable: false, editable: true },
		],
		rows: [
			{ id: 1, C1: "", C2: "", C3: "", C4: "" },
			{ id: 2, C1: "", C2: "", C3: "", C4: "" },
			{ id: 3, C1: "", C2: "", C3: "", C4: "" },
			{ id: 4, C1: "", C2: "", C3: "", C4: "" },
		]
	};
	
	return result;
}

function getResultCase2() {
	const result = {
		columns: [
			{ field: "id", headerName: "ID", width: 30, sortable: false },
			{ field: "C1", headerName: "C1", width: 200, sortable: false, editable: true },
			{ field: "C2", headerName: "C2", width: 200, sortable: false, editable: true },
		],
		rows: [
			{ id: 1, C1: "", C2: "" },
			{ id: 2, C1: "", C2: "" },
		]
	};
	
	return result;
}

function getSampleResult() {
	const result = {
		columns: [
			{ field: "id", 			headerName: "id", width: 30, sortable: false },
			{ field: "Name", 			headerName: "Name", width: 100, sortable: false },
			{ field: "ElemNo", 		headerName: "Elem No.", width: 100, sortable: false, editable: false },
			{ field: "Strength", 	headerName: "Strength", width: 100, sortable: false, editable: false },
			{ field: "Check", 		headerName: "Check", width: 100, sortable: false, editable: false },
		],
		rows: [
			{ id: 1, Name: "C_CO_1591", ElemNo: 1591, Strength: 1329, Check: "-" },
			{ id: 2, Name: "C_CO_1592", ElemNo: 1592, Strength: 0.002, Check: "Check"},
			{ id: 3, Name: "C_CO_1593", ElemNo: 1593, Strength: 1523, Check: "-" },
		]
	};

	return result;
}

function getPython(): string {
    // The original sequence of numbers
    const sequence = "1592, 1591, 1593, 1594, 1595, 1596";
    
    // Define the maximum allowed length
    const maxLength = 25;
    
    // Check if the length of the sequence exceeds the maximum length
    if (sequence.length > maxLength) {
        // Truncate the sequence to fit within the maximum length including the ellipsis
        return sequence.slice(0, maxLength - 3) + "...";
    }
    
    // If the sequence length is within the limit, return it as is
    return sequence;
}

const App = () => {
	const [ tabValue, setTabValue ] = React.useState("tab1");
	const [ result, setResult ] = React.useState(getSampleResult());
	const [ unitValue, setUnitValue ] = React.useState('-');

	return (
		<GuideBox width={450} height={300} center spacing={2}>

			<TabGroup 
				width={450}
				value={tabValue}
				onChange={(e: any, newValue: string) => {
					setTabValue(newValue);
			}}>
				<Tab value="tab1" label="Axial Strength" />
				<Tab value="tab2" label="Shear Strength" />
				<Tab value="tab3" label="Moment Strength" />
			</TabGroup>

			<GuideBox row horSpaceBetween verCenter width={450}>
				<Button
    			onClick={async () => {
						//UNIT API 요청
						const responseUnit = await fetch('https://moa-engineers.midasit.com:443/civil/db/unit', {
							method: 'GET',
							headers: {
								'MAPI-Key': 'eyJ1ciI6ImtoMTAxMkBtaWRhc2l0LmNvbSIsInBnIjoiY2l2aWwiLCJjbiI6IkFSejNvNDdBU0EifQ.9f8ef7d4f1dba1d70fd90d64402bf4c16d45546a841d917a0353a3088d4a1bd0'
							}
						});
						if (responseUnit.ok) {
							const data = await responseUnit.json();
							const force = data["UNIT"]["1"]["FORCE"];
							const dist = data["UNIT"]["1"]["DIST"];
							console.log(force + " " + dist);
							setUnitValue(force + " " + dist);
						} else {
							console.error('Error:', responseUnit.status, responseUnit.statusText);
						}

						//STRENGTH API 요청
						// const responseStr = await fetch('https://moa-engineers.midasit.com:443/civil/db/iehp', {
						// 	method: 'GET',
						// 	headers: { 'MAPI-Key': 'eyJ1ciI6ImtoMTAxMkBtaWRhc2l0LmNvbSIsInBnIjoiY2l2aWwiLCJjbiI6IkFSejNvNDdBU0EifQ.9f8ef7d4f1dba1d70fd90d64402bf4c16d45546a841d917a0353a3088d4a1bd0' }
						// });
						// if (responseStr.ok) {
						// 	const data = await responseStr.json();
						// 	//column, row를 구성해서 업데이트!
						// 	console.log(data);
						// } else {
						// 	console.error('Error:', responseStr.status, responseStr.statusText);
						// }
					}}
				>Get Yield Strength</Button>

				<Typography>
					Unit {unitValue}
				</Typography>

			</GuideBox>

			<DataGrid
				columns={result.columns}
				rows={result.rows}
				hideFooter
			/>

			<GuideBox row width={450} horSpaceBetween>
				<TextField 
					disabled
					defaultValue={getPython()}
				/>

				<Button>Get Elem No.</Button>
				<Button>Close</Button>
			</GuideBox>

		</GuideBox>
	)
}

export default App;
