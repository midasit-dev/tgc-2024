import React from 'react';
import { useRecoilState } from 'recoil';
import { 
	GuideBox, 
	Panel,
	TemplatesDualComponentsTypographyDropListSpaceBetween,
  Typography,
  Radio,
  RadioGroup,
  DataGrid,
  Button
} from '@midasit-dev/moaui';
import BoringHole from './BoringHoleTable';
import LayerTable from './LayerTable';
import StructureGroup from './StructureGroup';
function Inputwindow(){

  const SoilPTypeList = [
    ['Rankine', 0],
    ['Coulomb', 1],
  ]

  return(
    <GuideBox width={550} spacing={1}>
      <TemplatesDualComponentsTypographyDropListSpaceBetween
        title="토압 종류"
        items = {SoilPTypeList}
      />
      <GuideBox row verCenter spacing={1}>
        <Typography variant='h1'> 지하 수위 고려 </Typography>
        <RadioGroup defaultValue="Consider" row>
          <Radio name="w/ Water Level" value = "Consider" />
          <Radio name="w/o Water Level" value= "Unconsider" />
        </RadioGroup>
      </GuideBox>
      <BoringHole />
      <LayerTable />
    </GuideBox>
  )
}

export default Inputwindow;