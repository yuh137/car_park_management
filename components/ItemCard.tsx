"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardMedia, Collapse, Avatar, Button } from '@mui/material'

const type = "truck";

interface ItemProps {
  id: string;
  owner: string;
  model: string;
  type: string;
  inputTime: string
}

const ItemCard: React.FC<ItemProps> = ({ id, owner, type, model, inputTime }) => {
  return (
    <>
      <Card className='w-[12rem]'>
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
        <CardMedia 
          component="img"
          image={(type === "Truck") ? "/truck.jfif" : (type === "4-seaters") ? "/4seaters.jfif" : "7seaters.jpg"}
          className='w-inherit h-[7rem] object-cover'
        />
        <CardContent>
          <p>Parking date: {inputTime}</p>
          <p>Owner: {owner}</p>
        </CardContent>
        <Collapse>

        </Collapse>
      </Card>
    </>
  )
}

export default ItemCard