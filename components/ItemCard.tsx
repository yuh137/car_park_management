"use client"

import React, { useState, FormEvent, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardMedia, Collapse, Avatar, Button, IconButton, FormControlLabel, Checkbox } from '@mui/material'
import { Service, Vehicle } from '@interfaces'
import '@globals'
import { validateTime } from '@controllers/validateTime'

// const type = "truck";

interface ItemProps {
  vehicleId: string;
  owner: string;
  model: string;
  type: string;
  inputTime: string;
  index: number;

  // oilServices: oilService[];
  // washServices: washService[];
  // setOilServices: React.Dispatch<React.SetStateAction<oilService[]>>;
  // setWashServices: React.Dispatch<React.SetStateAction<washService[]>>;
}

interface oilService {
  vehicleId: string;
  used: boolean;
}

interface washService {
  vehicleId: string;
  used: boolean;
}

const ItemCard: React.FC<ItemProps> = ({ vehicleId, owner, type, model, inputTime, index }) => {
  const time: Date = new Date(inputTime);

  const [oilServices, setOilServices] = useState<oilService>({ vehicleId: vehicleId, used: false });
  const [washServices, setWashServices] = useState<washService>({ vehicleId: vehicleId, used: false });

  // function updateOilServices(vehicleId: string, used: boolean){
  //   setOilServices((prevState) => prevState.map((item) =>
  //     item.vehicleId === vehicleId ? { ...item, used: used } : item
  //   ));
  // };

  // LOAD PREVIOUS STATE OF OIL AND WASH SERVICES
  useEffect(() => {
    const oilStorage = localStorage.getItem(`oil:${vehicleId}`);
    if (oilStorage !== null) {
      const oil: oilService = JSON.parse(oilStorage);
      (oil.used ? setOilServices({ ...oil, used: true }) : setOilServices({...oil, used: false }));
      // console.log(oilServices);
    } else {
      setOilServices({ vehicleId: vehicleId, used: false });
    }

    const washStorage = localStorage.getItem(`wash:${vehicleId}`);
    if (washStorage !== null) {
      const wash: washService = JSON.parse(washStorage);
      (wash.used ? setWashServices({ ...wash, used: true }) : setWashServices({...wash, used: false }));
      // console.log(washServices);
    } else {
      setWashServices({ vehicleId: vehicleId, used: false });
    }
  }, []);

  useEffect(() => {
    
  }, [])

  // UPDATE AND SAVE OIL AND WASH SERVICE INSTANCES
  async function handleUpdate(vehicleId: string){
    const res = await fetch(`http://localhost:3000/api/services/${vehicleId}`);

    const vehicleServices: Service[] = await res.json();
    const wash = vehicleServices.find(item => item.serviceName === 'wash');
    const oil = vehicleServices.find(item => item.serviceName === 'oil');

    if (washServices.used) {
      if (!wash) {
        const newWash = await fetch('http://localhost:3000/api/services', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            vehicleId: vehicleId,
            serviceName: "wash",
            price: washingCost
          })
        })

        console.log( (await newWash.json()) )
      }

      localStorage.setItem(`wash:${vehicleId}`, (JSON.stringify({ vehicleId: vehicleId, used: washServices.used })));
    } else if (!washServices.used) {
      if (wash) {
        const deleteWash = await fetch(`http://localhost:3000/api/services/${wash.vehicleId}/wash`, {
          method: "DELETE",
          headers: { "Content_Type": "application/json"}
        })

        console.log( (await deleteWash.json()) );
        localStorage.removeItem(`wash:${vehicleId}`);
      }

      // localStorage.setItem(`wash:${vehicleId}`, (JSON.stringify({ vehicleId: vehicleId, used: washServices.used })));
    }

    if (oilServices.used) {
      if (!oil) {
        const newOil = await fetch(`http://localhost:3000/api/services`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            vehicleId: vehicleId,
            serviceName: "oil",
            price: oilCost
          })
        })

        console.log( (await newOil.json()) );
      }

      localStorage.setItem(`oil:${vehicleId}`, (JSON.stringify({ vehicleId: vehicleId, used: oilServices.used })));
    } else if (!oilServices.used) {
      if (oil) {
        const deleteOil = await fetch(`http://localhost:3000/api/services/${oil.vehicleId}/oil`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        })

        console.log( (await deleteOil.json()) );
        localStorage.removeItem(`oil:${vehicleId}`);
      }
    }
  }

  async function handleCheckout(vehicleId: string){
    const serviceRes = await fetch(`http://localhost:3000/api/services/${vehicleId}`);
    const services: Service[] = await serviceRes.json();

    let servicesFee = 0;
    services.forEach(service => servicesFee += service.price);

    const daysParked = validateTime(time);
    const parkingFee = ((type === "Truck") ? parkingCostTruck : (type === "4-seaters") ? parkingCost4 : parkingCost7) * daysParked;
    // const checkOutFee = parkingFee + 
    console.log(servicesFee, parkingFee);
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
          title={vehicleId}
          subheader={model}
        />
        <div className="content_box relative">
          <CardMedia 
            component="img"
            image={(type === "Truck") ? "/truck.jfif" : (type === "4-seaters") ? "/4seaters.jfif" : "/7seaters.jpg"}
            className='w-inherit h-[7rem] object-cover'
          />
          <CardContent className="inline-block">
            <p>Parking date: {time.getDate()}/{time.getMonth() + 1}/{time.getFullYear()}</p>
            <p>Owner: {owner}</p>
          </CardContent>
          <form action="">
            <div className='flex justify-center'>
              <FormControlLabel control={ <Checkbox checked={oilServices.used} value={oilServices.used} onChange={e => {e.preventDefault(); setOilServices({ vehicleId: vehicleId, used: e.target.checked }); }}/> } label="Oil"/>
              <FormControlLabel control={ <Checkbox checked={washServices.used} value={washServices.used} onChange={e => {e.preventDefault(); setWashServices({ vehicleId: vehicleId, used: e.target.checked }); }}/> } label="Wash"/>
            </div>
            <div className='flex justify-center gap-2 m-3'>
              <Button className='bg-blue-500 hover:bg-blue-700 ease-in w-fit font-bold text-white' onClick={() => {
                handleUpdate(vehicleId);
              }}>
                UPDATE
              </Button>
              <Button className="bg-red-500 hover:bg-red-700 ease-in w-fit font-bold text-white" onClick={() => {
                handleCheckout(vehicleId);
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