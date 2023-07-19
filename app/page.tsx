// "use client";

import React from 'react'
import { useState } from 'react';
import { Container, Box, TextField, Checkbox, Card, Modal, Pagination, FormGroup, FormControl, FormControlLabel } from '@mui/material'
import FilterDisplay from '@components/FilterDisplay';

const Home = () => {

  return (
    <div className="container pt-[5rem] min-h-[1160px] justify-between items-center flex flex-col bg-[#FFFAD7]">
      <FilterDisplay />
    </div>
  )
}

export default Home