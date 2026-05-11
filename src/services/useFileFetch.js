import { useState, useEffect } from 'react';

export function fileFetch(setFiles, setError, setLoading){
    const FALLBACK_FILES= "http://localhost:1234/pdf-files/Estimation_Practice_Problem.pdf"
    const fetchFiles = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("http://localhost:5000/api/files");//"https://backendresourceverceldeployment.vercel.app/api/files");

            if (!res.ok) throw new Error(`Server error (${res.status})`);

            const contentType = res.headers.get("content-type");

            if (!contentType?.includes("application/json")) {
                    throw new Error("Invalid response format (not JSON)");
            }

            const data = await res.json();

            if (!Array.isArray(data)) throw new Error("Data is not an array");
            console.log(data)
            setFiles(data);
            setLoading(false);
        } catch (err) {
                console.log("Fetch failed:", err);
                setFiles(FALLBACK_FILES);
                setError(`${err.message}. Showing fallback.`);
                return;
        } finally {

        }
    };

    return fetchFiles;
}
