"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardMedia, Collapse, Avatar, Button, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';

// const type = "truck";

interface ItemProps {
  id: string;
  owner: string;
  model: string;
  type: string;
  inputTime: string
}

const ItemCard: React.FC<ItemProps> = ({ id, owner, type, model, inputTime }) => {
  const time: Date = new Date(inputTime);

  const [expanded, setExpanded] = useState(false);

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
            image={(type === "Truck") ? "/truck.jfif" : (type === "4-seaters") ? "/4seaters.jfif" : "7seaters.jpg"}
            className='w-inherit h-[7rem] object-cover'
          />
          <CardContent className="inline-block">
            
            <p>Parking date: {time.getFullYear()}</p>
            <p>Owner: {owner}</p>
          </CardContent>
          <IconButton className="inline-block absolute right-0">
            <MoreVertIcon onClick={() => setExpanded(!expanded)} />
          </IconButton>
          <Collapse in={expanded}>
            Collapsable
            Collapsable
            Collapsable
            Collapsable
            Collapsable
            Collapsable
            Collapsable
            Collapsable
            Collapsable
            Collapsable
            Collapsable
          </Collapse>
          {expanded ? (<></>) : (<div className='flex'><Button className="bg-red-500 hover:bg-red-700 ease-in w-fit my-3 mx-auto font-bold text-white">CHECK OUT</Button></div>)}
        </div>
      </Card>
    </>
  )
}

export default ItemCard