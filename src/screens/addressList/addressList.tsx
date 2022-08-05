import React, { ChangeEvent, useState } from 'react';
import { useHistory } from "react-router-dom";
import search from "../../assets/images/mobileimages/search.svg";
import Button from "@material-ui/core/Button";
import InputGroup from 'react-bootstrap/InputGroup'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { Container } from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl'
import { Header } from '../../components/header/header';
import { useEffect } from 'react';
import { getAddressData } from '../../redux/action/addressAction';
import { useDispatch, useSelector } from 'react-redux';
import * as authService from '../../services/auth.service';
import * as alertService from '../../services/AlertService';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import "./addressList.scss";
import * as addressService from "../../services/adress.service"

interface IProps {
  isPublic: boolean,
  path: string
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      backgroundColor: '#1f1e2c',
    }
  }),
);
export const Address: React.FC<IProps> = () => {
  const classes = useStyles();
  const history = useHistory()
  const dispatch = useDispatch()
  const [address, setAddress] = useState<any>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchResults, setSearchResults] = useState<any>()
  // const userID: number = parseInt(props?.match?.params?.id);
  let [fetchAddess, setFetchAddess] = useState<boolean>(true);

  const pageBack = () => {
    history.goBack();
  }

  const addressRedux = useSelector((state: any) => {
    return state.addressReducer?.addressList;
  });

  const getAddress = async () => {
    try {
      const response: any = await dispatch(getAddressData());
      setAddress(response?.payload);
      response?.payload?.length > 0 ? setFetchAddess(true) : setFetchAddess(false);
    } catch (error) {
      console.log(error)
    }
  }

  // const getAddressByUser = async () => {
  //   try {
  //     const response: any = await authService.getAddressByUserId(userID);
  //     console.log(response)
  //     setAddress(response?.payload);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    // userID
    //   ? getAddressByUser()
    //   :
    addressRedux ? setAddress(addressRedux) : getAddress();
    console.log(addressRedux)
    addressRedux?.length > 0 ? setFetchAddess(true) : setFetchAddess(false);
  }, [setAddress]);

  const onEdit = (editAddid: number) => {
    history.push(`/edit/address/${editAddid}`)
  }

  const onDelete = async (id: number) => {
    try {
      const response: any = await addressService.deleteAddress(id);
      response && getAddress();
      //  alertService.success(response?.data?.message) 

    } catch (error: any) {
      debugger;
      alertService.error(error?.message)
    }
  }

  const selectAddress = (item: any) => {
    addressRedux.filter((x: any) => {
      if (x.id === item.id) {
        return x.is_selected = true;
      } else {
        return x.is_selected = false;
      }
    });
    history.goBack();
  }

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    if (searchTerm) {
      const search: string = address?.filter((add: any) => {
        return (
          add.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          add.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
          add.address_line_1.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })
      setSearchResults(search);
    }
  }

  const skeleton = () => {
    return (
      <>
        <div className="skelton-div">
          <Box display="flex" alignItems="center">
            <Box width="100%">
              <Skeleton animation="wave" height={40} width="30%" />
            </Box>
          </Box>
          <Box>
            <Skeleton variant="rect" animation="wave" height={80} width="100%" />
          </Box>
          <Box width="100%" className="row">
            <Box className="col-6">
              <Skeleton animation="wave" width="50%" height={50} />
            </Box>
            <Box className="col-6">
              <Skeleton animation="wave" width="50%" height={50} />
            </Box>
          </Box>
        </div>
        <Divider />
      </>
    )
  }
  return (
    <div className="mobilemaincontainer">
      <div className="mobile_container dash_tabs">
        <div className="sabrinamainscroll">
          <Header title={'Your Address'} back={true} enableback={pageBack} />
          <div className="address_section mt-4">
            <h5>
              Personal addresses
            </h5>
            {
              fetchAddess &&
              <div className="search_section mb-3">
                <InputGroup className="">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                      <img
                        src={search}
                        className=""
                        alt="search"
                      />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Search for address"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={searchTerm}
                    onChange={(e: any) => onSearch(e)}
                  />
                </InputGroup>
              </div>
            }
            <Container>
              {
                (address.length === 0 && fetchAddess) &&
                <Grid container spacing={8}>
                  <Grid item xs>
                    {
                      [1, 2, 3].map((x, i) => {
                        return (<div key={i}>{skeleton()}</div>);
                      })
                    }
                  </Grid>
                </Grid>
              }
              <div className="address_main">
                {
                  (searchResults || (!searchResults && address))
                  &&
                  ((searchResults || (!searchResults && address))?.map((item: any, i: number) => {
                    return (
                      <div className="address_content pb-3" key={i}>
                        <div className="address_box cursor-pointer" onClick={() => selectAddress(item)}>
                          <h6>
                            {item.first_name}
                          </h6>
                          <p>
                            {/* 203, Airport Road, Near Bank of Baroda Bank, */}
                            {item.address_line_1} ,
                            {/* Infront of Pooja Doodh Dairy  */}
                            {item.address_line_2} ,
                            {/* Vijaynagar, Airport Road  */}
                            {/* BHOPAL, MADHYAPRADESH 452008 */}
                            {`${item.city}, ${item.state},  ${item.zip_code}`} ,
                            {/* INDIA */}
                            {item.country}
                          </p>
                          <p className="mb-0">
                            {/* Phone number:- 9876543210 */}
                          </p>
                        </div>
                        {/* {
                          !userID && */}
                        <ButtonGroup className="w-100 d-flex btn_group_address" aria-label="outlined primary button group">
                          <Button className="btn_edit1" onClick={() => onEdit(item.id)}>edit</Button>

                          <Button className="btn_remove1" onClick={() => onDelete(item.id)} >remove</Button>
                        </ButtonGroup>
                        {/* } */}
                      </div>
                    )
                  }))
                }

                <div className="add-address-fab">
                  <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => { history.push('/add/address') }}>
                    <AddIcon />
                  </Fab>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  )
}