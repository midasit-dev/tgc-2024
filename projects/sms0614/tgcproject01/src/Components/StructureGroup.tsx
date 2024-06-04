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
import {getGRUPlist} from '../utils_pyscript';
import { set, size } from 'lodash';
import StyledComponent from '@midasit-dev/moaui/Components/ColorPicker/Styled';
function StructureGroup(){
  const [STGroupList, setSTGroupList] = useRecoilState(STGroups);
  useEffect(() => {
    const GroupList = getGRUPlist()
    if (GroupList.hasOwnProperty('error')) {
      alert('Error in getting Group List')
      return
    }
    setSTGroupList(GroupList.map((item:any) => {
      return {
        name : item,
        checked : false
      }
    }))
  }, [])

  const handleListItemClick = (index: number) => {
		const newValues = JSON.parse(JSON.stringify(STGroupList));
		newValues[index].checked = !(newValues[index].checked);
		setSTGroupList(newValues);
	}

  const handleGRUPrefresh = () => {
    const GroupList = getGRUPlist()
    if (GroupList.hasOwnProperty('error')) {
      alert('Error in getting Group List')
      return
    }
    setSTGroupList(GroupList.map((item:any) => {
      return {
        name : item,
        checked : false
      }
    }))
  }

  return(
    <GuideBox width={200}>
      <GuideBox width={180} row horSpaceBetween verCenter>
        <Typography variant='h1'> StructureGroup </Typography>
          <IconButton onClick={handleGRUPrefresh} transparent>
            <Icon iconName="Refresh" />
          </IconButton>
      </GuideBox>
      
      
      <List dense={true} disablePadding={true}>
        {STGroupList.map((value:any, index:any) => {
          return (
            <ListItem
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