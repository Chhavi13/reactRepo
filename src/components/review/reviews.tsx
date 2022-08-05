import  React, { useState } from 'react';
import "./reviews.scss";
import { useHistory } from 'react-router-dom';
import { Header } from '../../components/header/header';
export const Review = (props: any) => {
  const history = useHistory()

  const onPageBack = () => {
    history.goBack()
  }

  return (
    <div className="mobilemaincontainer">
      <div className="mobile_container dash_tabs thank_page pb-5">
         <Header title="Sabrina's Reviews" back={true} enableback={onPageBack} />
      </div>
    </div >
  )
}