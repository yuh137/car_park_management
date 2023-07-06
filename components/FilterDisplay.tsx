"use client"

import { useState } from 'react';
import { Container, Box, TextField, Checkbox, Card, Modal, Pagination, FormGroup, FormControl, FormControlLabel } from '@mui/material'
import prisma from '@lib/prisma';
import React from 'react'

const FilterDisplay = () => {
  const [fourSeatersChecked, setFourCheck] = useState(false);
  const [sevenSeatersChecked, setSevenCheck] = useState(false);
  const [truckChecked, setTruckCheck] = useState(false);
  const [searchValue, setSearchValue] = useState("");


  return (
    <>
        <div className="search_bar">
            <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                color="secondary"
                className='w-[30rem]'
                onChange={async (event) => {
                    setSearchValue(event.target.value);
                    
                    // const vehicleRecords = await prisma.vehicle.findMany({
                    //     where: {
                    //         managedBy: {
                    //             startsWith: searchValue,
                    //         }
                    //     }
                    // })
                }}
            />
            <div className="vehicle_filter ml-3 mr-auto mx-auto">
                <FormControlLabel control={ <Checkbox checked={fourSeatersChecked} onChange={event => {console.log(event.target.checked);  setFourCheck(event.target.checked)}} />} label="4-seaters"/>
                <FormControlLabel control={ <Checkbox checked={sevenSeatersChecked} onChange={event => {console.log(event.target.checked);  setSevenCheck(event.target.checked)}}/>} label="7-seaters"/>
                <FormControlLabel control={ <Checkbox checked={truckChecked} onChange={event => {console.log(event.target.checked);  setTruckCheck(event.target.checked)}}/>} label="Truck"/>
            </div>
        </div>
        <div id="vehicle_container">

        </div>
    </>
  )
}

export default FilterDisplay