import React, { useState } from 'react'
import { CSVLink, CSVDownload } from 'react-csv'

export function Teste() {
  const csvData = [
    ['firstname', 'lastname', 'email'],
    ['Ahmed', 'Tomi', 'ah@smthing.co.com'],
    ['Raed', 'Labes', 'rl@smthing.co.com'],
    ['Yezzi', 'Min l3b', 'ymin@cocococo.com'],
  ]

  return <CSVLink data={csvData}>Download me</CSVLink>
}
