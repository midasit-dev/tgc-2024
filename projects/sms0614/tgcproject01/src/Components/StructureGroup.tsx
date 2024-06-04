import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { 
	GuideBox, 
  Typography,
  List,
  ListItem,
  ListItemButton,
  Check,
  IconButton, 
  Icon
} from '@midasit-dev/moaui';
import BoringHole from './BoringHoleTable';
import LayerTable from './LayerTable';
import { STGroups } from '../variables';
import {getGRUPlist, getELEMlist} from '../utils_pyscript';
import { set, size } from 'lodash';
import StyledComponent from '@midasit-dev/moaui/Components/ColorPicker/Styled';
import { useSnackbar } from "notistack";
function StructureGroup(){
  const { enqueueSnackbar } = useSnackbar();
  const [STGroupList, setSTGroupList] = useRecoilState(STGroups);

  useEffect(() => {
    const GroupList = getGRUPlist()
    console.log(JSON.stringify(GroupList))
    if (GroupList.hasOwnProperty('error')) {
      enqueueSnackbar('Error in getting Group List', { variant: 'error' });
      return
    }
    const STGroupList_Array = Object.keys(GroupList).map(key => ({
      name: key,
      checked: false
    }));
    const ELEMList_Array = Object.keys(GroupList).map(key => (
      GroupList[key]
    ));
    setSTGroupList(STGroupList_Array);
    console.log('checkpoint 1')
    const result = getELEMlist(ELEMList_Array)
  }, [])

  
  useEffect(() => {

  }, [STGroupList])


  const handleListItemClick = (index: number) => {
		const newValues = JSON.parse(JSON.stringify(STGroupList));
		newValues[index].checked = !(newValues[index].checked);
		setSTGroupList(newValues);
	}

  const handleGRUPrefresh = () => {
    const GroupList = getGRUPlist()
    if (GroupList.hasOwnProperty('error')) {
      enqueueSnackbar('Error in getting Group List', { variant: 'error', autoHideDuration: 3000, });
      return
    }
    const STGroupList_Array = Object.keys(GroupList).map(key => ({
      name: key,
      checked: false
    }));
    const ELEMList_Array = Object.keys(GroupList).map(key => (
      GroupList[key]
    ));
    setSTGroupList(STGroupList_Array);
    const result = getELEMlist(ELEMList_Array)
    enqueueSnackbar('Structure Group Updated', { variant: 'success', autoHideDuration: 3000, });
  }

  return(
    <GuideBox width={200}>
      <GuideBox width={180} row horSpaceBetween verCenter>
        <Typography variant='h1'> StructureGroup </Typography>
          <IconButton id='refresh' onClick={handleGRUPrefresh} transparent>
            <Icon iconName="Refresh" />
          </IconButton>
      </GuideBox>
      <List dense={true} disablePadding={true}>
        {STGroupList.map((value:any, index:any) => {
          return (
            <ListItem
              key={index}
              secondaryAction={<Check checked={STGroupList[index].checked} />}
              onClick={() => handleListItemClick(index)}
            >
              <ListItemButton padding={0.8}>
                <Typography marginLeft={1}>{value.name}</Typography>
              </ListItemButton>
            </ListItem>
          )
        })}
    </List>
    </GuideBox>
  )
}
export default StructureGroup;