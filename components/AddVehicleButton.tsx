"use client"

import React, { useState } from 'react'
import { Button, Modal, TextField, Box, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import { Vehicle } from '@interfaces'
import { addVehicle } from '@controllers/addVehicle'

const AddVehicleButton = () => {
  const [open, setOpen] = useState(false);
  const [vehicleId, setVehicleId] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleOwner, setVehicleOwner] = useState("");
  const [type, setType] = useState("");

  const vehicle: Vehicle = {
    id: vehicleId,
    model: vehicleModel,
    owner: vehicleOwner,
    type: type
  }

  return (
    <>
        <Button variant='contained' className='bg-orange-500' onClick={() => setOpen(true)}>
            Add vehicle
        </Button>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <form action="">
                <Box className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[400px] shadow-md bg-white flex flex-col p-10 border-solid border-black border-[1px] rounded-sm space-y-[3rem]">
                    <h1 className='w-full font-semibold my-0 mx-auto text-center text-2xl'>Fill information</h1>
                    <TextField variant='standard' id="vehicle_Id" name='vehicle_Id' placeholder='Vehicle ID' onChange={event => {setVehicleId(event.target.value)}}/>
                    <TextField variant='standard' id="vehicle_model" name='vehicle_model' placeholder='Vehicle model' onChange={event => {setVehicleModel(event.target.value)}}/>
                    <TextField variant='standard' id="vehicle_owner" name='vehicle_owner' placeholder='Owner name' onChange={event => {setVehicleOwner(event.target.value)}}/>
                    <RadioGroup
                        row
                        name='vehicle_type'
                        value={type}
                        onChange={event => {setType(event.target.value); console.log(event.target.value)}}
                    >
                        <FormControlLabel value="4-seaters" control={<Radio />} label="4-seaters" />
                        <FormControlLabel value="7-seaters" control={<Radio />} label="7-seaters" />
                        <FormControlLabel value="Truck" control={<Radio />} label="Truck" />
                    </RadioGroup>
                    <Button variant='contained' className='bg-orange-500' onClick={}></Button>
                </Box>
            </form>
        </Modal>
    </>
  )
}

export default AddVehicleButton