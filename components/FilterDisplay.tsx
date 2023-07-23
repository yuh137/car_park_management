"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { TextField, Checkbox, FormControlLabel, Pagination } from '@mui/material'
import ItemCard from './ItemCard';
import React, { FormEvent } from 'react';
import { Vehicle } from '@interfaces';

interface oilService {
  vehicleId: string;
  used: boolean;
}

interface washService {
  vehicleId: string;
  used: boolean;
}

const FilterDisplay = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fourSeatersChecked, setFourCheck] = useState(false);
  const [sevenSeatersChecked, setSevenCheck] = useState(false);
  const [truckChecked, setTruckCheck] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);
  const [filteredVehicleList, setFilteredVehicleList] = useState<Vehicle[]>([]);
  const [slicedVehicleList, setSlicedVehicleList] = useState<Vehicle[]>([]);
  // const [testState, setTestState] = useState<number[]>([]);

  // const [oilServices, setOilServices] = useState<oilService[]>([]);
  // const [washServices, setWashServices] = useState<washService[]>([]);

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
    // setIsLoading(true);
    // setFilteredVehicleList(vehicleList);   
    
    setFilteredVehicleList(vehicleList.filter((item) => ((item.identification.toLowerCase().includes(searchValue.toLowerCase()) || item.model.toLowerCase().includes(searchValue.toLowerCase()) || item.owner.toLowerCase().includes(searchValue.toLowerCase()))
                                                         && (truckChecked ? item.typeName.toLowerCase().includes("truck") : true)
                                                         && (fourSeatersChecked ? item.typeName.toLowerCase().includes("4-seaters") : true)
                                                         && (sevenSeatersChecked ? item.typeName.toLowerCase().includes("7-seaters") : true)))); 

    // setIsLoading(false);
    // console.log("from update", filteredVehicleList)
}, [vehicleList, searchValue, truckChecked, sevenSeatersChecked, fourSeatersChecked]); 

  // console.log(filteredVehicleList);     

  useEffect(() => {
    // setSlicedVehicleList(filteredVehicleList);

    setSlicedVehicleList(filteredVehicleList.slice((currentPage - 1) * 8, currentPage * 8));
  }, [filteredVehicleList, currentPage]) 

  
  return (
    <>
        <div className='items-center flex flex-col w-full'>
          <div className="search_bar justify-self-center">
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
                      <p className='absolute top-1/2 left-1/2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>
                      </p>
                  </>
              ) : (
                  <>
                    {(slicedVehicleList.length) ? slicedVehicleList.map((ele, index) => {
                      let oilUsed = false;
                      let washUsed = false;

                      const oilStorage = localStorage.getItem(`oil:${ele.identification}`);
                      if (oilStorage !== null) {
                        const oil: oilService = JSON.parse(oilStorage);
                        (oil.used ? oilUsed = true : oilUsed = false);
                        // console.log(oilServices);
                      } else {
                        oilUsed = false;
                      }
                  
                      const washStorage = localStorage.getItem(`wash:${ele.identification}`);
                      if (washStorage !== null) {
                        const wash: washService = JSON.parse(washStorage);
                        (wash.used ? washUsed = true : washUsed = false);
                        // console.log(washServices);
                      } else {
                        washUsed = false;
                      }
                      return (
                      <ItemCard key={index} owner={ele.owner} vehicleId={ele.identification} model={ele.model} inputTime={ele.inputTime} type={ele.typeName} index={index} oilUsed={oilUsed} washUsed={washUsed}/>
                    )}) : (
                      <>
                        <p>No items found</p>
                      </>
                    )} 
                  </>
              )}
          </div>
        </div>
        <Pagination className='my-8' color='primary' count={Math.ceil(vehicleList.length / 8)} page={currentPage} onChange={(e, value) => setCurrentPage(value)}></Pagination>
    </>
  )
}

export default FilterDisplay