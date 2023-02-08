import React from 'react'
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import { Card } from 'react-bootstrap'
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import ClickAwayListener from '@mui/material/ClickAwayListener';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

function EditProfileToolTip(props: CircularProgressProps & { value: number, data: any }) {
  console.log(props?.data)
  const [expanded, setExpanded] = React.useState(false);

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClickAway = () => {
    setExpanded(false);
  };
  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Card>
          <CardHeader
            avatar={
              <div className='profile-progress me-3'>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <CircularProgress variant="determinate" color='success' {...props} />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      color="text.secondary"
                    >{`${Math.round(props.value)}%`}</Typography>
                  </Box>
                </Box>
              </div>
            }
            action={
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            }
            title="Complete your profile and get a free 30 minute consult with one of our nurses."
          />



          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent className='pt-0'>
              <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                aria-label="contacts"
                className='profile-steps'
              >
                {/* <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <ListItemText primary="Upload a profile photo" className='text-start' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding className='completed'>
                <ListItemButton>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Invite a friend" className='text-start' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding className='completed'>
                <ListItemButton>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Book a Service" className='text-start' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Post on the Message Board" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Complete a course" />
                </ListItemButton>
              </ListItem> */}
                {
                  props?.data?.map((res: any, i: number) => (
                    <ListItem disablePadding className={`${res?.is_check && 'completed'}`} >
                      <ListItemButton>
                        <ListItemIcon>
                          <CheckIcon />
                        </ListItemIcon>
                        <ListItemText inset primary={res?.name} />
                      </ListItemButton>
                    </ListItem>
                  ))
                }

              </List>
            </CardContent>
          </Collapse>
        </Card>
      </ClickAwayListener>

    </>
  )
}

export default EditProfileToolTip
