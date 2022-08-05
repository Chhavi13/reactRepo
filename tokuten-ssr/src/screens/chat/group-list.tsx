import React from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Right from '../../assets/images/mobileimages/chevron-right.svg';
import TextsmsIcon from '@material-ui/icons/Textsms';
import ListItemText from '@material-ui/core/ListItemText';

interface IProps { }

export const GroupsList = ({groupList}: any) => {

  const history = useHistory();
  
  return (
    <div className="unread_box_chat">
      {/* <h2>unread</h2> */}
      <div className="unread_main_content">
        {
          
          groupList.map((item: any) => {
            return(
              <div className="unread_detail" key={item?.id}>
                <Grid container onClick={() => 
                    history.push(
                      { pathname: `/channel/${item?.id}`, state: { groupItem: item } }
                    )}>
                  <Grid item md={2} sm={2} xs={2}>
                    <div className="unread_icon">
                      <TextsmsIcon />
                      <span className="unread_count">15</span>
                    </div>
                  </Grid>
                  <Grid item md={9} sm={9} xs={9} className="pl-0">
                    <ListItemText className="unread_top_content" secondary={item?.group_name}></ListItemText>
                    <span className="unread_thread">15 threads</span>
                    <div className="unread_para">
                      <ListItemText primary="Aliquet pretium dolor magna quisque..."></ListItemText>
                    </div>
                  </Grid>

                  <Grid item md={1} sm={1} xs={1} className="text-right">
                    <img src={Right} className="mt-2" alt="img" />
                  </Grid>
                </Grid>
              </div>
            )
          })
        }

        
      </div>
    </div>
  )
}