"use client"

import React, { useState, FormEvent } from 'react'
import { Card, CardContent, CardHeader, CardMedia, Collapse, Avatar, Button, IconButton, FormControlLabel, Checkbox } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';

// const type = "truck";

interface ItemProps {
  id: string;
  owner: string;
  model: string;
  type: string;
  inputTime: string;
  index: number;
}

const ItemCard: React.FC<ItemProps> = ({ id, owner, type, model, inputTime, index }) => {
  const time: Date = new Date(inputTime);

  const [expanded, setExpanded] = useState<boolean[]>([false]);
  const [oilServices, setOilServices] = useState<boolean>(false);
  const [washServices, setWashServices] = useState<boolean>(false);

  function handleClick(index: number){
    console.log(expanded);
    setExpanded((prev) => {
      const newList = [...prev];
      newList[index] = !newList[index];
      return newList;
    });
    console.log(expanded);
  }

  async function handleCheckout(id: string, inputTime: string){
    await fetch("http://localhost:3000/api/services", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          vehicleId: id,
      })
    })
  }

  return (
    <>
      <Card className='w-[15rem]'>
        <CardHeader 
          avatar={
            <Avatar 
              className='' 
              src="/avatar.jfif"
            />
          }
          title={id}
          subheader={model}
        />
        <div className="content_box relative">
          <CardMedia 
            component="img"
            image={(type === "Truck") ? "/truck.jfif" : (type === "4-seaters") ? "/4seaters.jfif" : "/7seaters.jpg"}
            className='w-inherit h-[7rem] object-cover'
          />
          <CardContent className="inline-block">
            <p>Parking date: {time.getFullYear()}</p>
            <p>Owner: {owner}</p>
          </CardContent>
          {/* <IconButton className="inline-block absolute right-0">
            <MoreVertIcon onClick={() => {
              handleClick(index)
              // console.log(index);  
            }} />
          </IconButton>
          <Collapse in={expanded[index]}>
            Collapsible
            Collapsible
            Collapsible
            Collapsible
            Collapsible
            Collapsible
            Collapsible
            Collapsible
            Collapsible
            Collapsible
          </Collapse> */}
          <form action="">
            <div className='flex justify-center'>
              <FormControlLabel control={ <Checkbox value={oilServices} onChange={e => setOilServices(e.target.checked)}/> } label="Oil"/>
              <FormControlLabel control={ <Checkbox value={washServices} onChange={e => setWashServices(e.target.checked)}/> } label="Wash"/>
            </div>
            <div className='flex justify-center gap-2 m-3'>
              <Button className='bg-blue-500 hover:bg-blue-700 ease-in w-fit font-bold text-white'>
                UPDATE
              </Button>
              <Button className="bg-red-500 hover:bg-red-700 ease-in w-fit font-bold text-white" onClick={() => {
                handleCheckout(id, inputTime);
              }}>CHECKOUT</Button>
            </div>
          </form>
          {/* {expanded[index] ? (<></>) : (<div className='flex'><Button className="bg-red-500 hover:bg-red-700 ease-in w-fit my-3 mx-auto font-bold text-white">CHECK OUT</Button></div>)} */}
        </div>
      </Card>
    </>
  )
}

export default ItemCard