"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { TextField, Checkbox, FormControlLabel } from '@mui/material'
import ItemCard from './ItemCard';
import React from 'react'

const FilterDisplay = () => {
  const [fourSeatersChecked, setFourCheck] = useState(false);
  const [sevenSeatersChecked, setSevenCheck] = useState(false);
  const [truckChecked, setTruckCheck] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [vehicleList, setVehicleList] = useState([]);
  const [filteredVehicleList, setFilteredVehicleList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
    
  useEffect(() => {
    fetchVehicleList();
    // setIsLoading(false);
  }, []); 

  async function fetchVehicleList() {
    const response = await fetch("http://localhost:3000/api/vehicle");

    const data = await response.json();
    setVehicleList(data);
    // console.log(vehicleList);
    setIsLoading(false);
  }
//   console.log(vehicleList);

  useEffect(() => {
    setIsLoading(true);
    setFilteredVehicleList(vehicleList);   
    
    setFilteredVehicleList(vehicleList.filter((item) => ((item.identification.toLowerCase().includes(searchValue.toLowerCase()) || item.model.toLowerCase().includes(searchValue.toLowerCase()) || item.owner.toLowerCase().includes(searchValue.toLowerCase()))
                                                         && (truckChecked ? item.typeName.toLowerCase().includes("truck") : true)
                                                         && (fourSeatersChecked ? item.typeName.toLowerCase().includes("4-seaters") : true)
                                                         && (sevenSeatersChecked ? item.typeName.toLowerCase().includes("7-seaters") : true)))); 

    setIsLoading(false);
}, [searchValue, truckChecked, sevenSeatersChecked, fourSeatersChecked]); 
  console.log(filteredVehicleList);     

  return (
    <>
        <div className="search_bar">
            {/* {isLoading ? (<p>Loading</p>) : (<p>{JSON.stringify(vehicleList)}</p>)} */}
            <Image 
                src="/logo.svg"
                alt="logo"
                width={350}
                height={0}
                className='object-contain my-0 mx-auto'
            />
            <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                color="secondary"
                className='w-[30rem]'
                onChange={(event) => {
                    setSearchValue(event.target.value);
                }}
            />
            <div className="vehicle_filter ml-3 mr-auto mx-auto">
                <FormControlLabel control={ <Checkbox checked={fourSeatersChecked} onChange={event => {console.log(event.target.checked);  setFourCheck(event.target.checked)}} />} label="4-seaters"/>
                <FormControlLabel control={ <Checkbox checked={sevenSeatersChecked} onChange={event => {console.log(event.target.checked);  setSevenCheck(event.target.checked)}}/>} label="7-seaters"/>
                <FormControlLabel control={ <Checkbox checked={truckChecked} onChange={event => {console.log(event.target.checked);  setTruckCheck(event.target.checked)}}/>} label="Truck"/>
            </div>
        </div>
        <div id="vehicle_container" className='flex w-full p-5 gap-3 flex-wrap my-0 mx-auto px-[4.4rem]'>
            {isLoading ? (
                <>
                    <p>Loading, please wait...</p>
                </>
            ) : (
                <>
                   {filteredVehicleList && (filteredVehicleList.length != 0) ? filteredVehicleList.map(ele => (
                    <ItemCard key={ele.id} owner={ele.owner} id={ele.identification} model={ele.model} inputTime={ele.inputTime} type={ele.typeName} />
                   )) : 
                    vehicleList.map(ele => (
                    <ItemCard key={ele.id} owner={ele.owner} id={ele.identification} model={ele.model} inputTime={ele.inputTime} type={ele.typeName} />
                   ))} 
                </>
            )}
        </div>
    </>
  )
}

export default FilterDisplay