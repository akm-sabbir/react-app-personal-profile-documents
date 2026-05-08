import { useState, useEffect } from 'react';

export function fetchData(setData, selectedFile){
if (!selectedFile) return;
const fetchDataRemotely = async () => {
  try {

        const baseUrl = "http://localhost:5000/api/files/";
        const response = await fetch(`${baseUrl}${selectedFile}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setData(result);
         // Returns the data object
    }     catch (error) {
        console.error("Error fetching data:", error);
            return null;
        }
    };
    fetchDataRemotely();
}