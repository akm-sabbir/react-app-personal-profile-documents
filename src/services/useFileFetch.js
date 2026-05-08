import { useState, useEffect } from 'react';

export function fileFetch(setFiles, setError, setLoading){
    const FALLBACK_FILES= "pdf-files/Estimation_Practice_Problem.pdf"
    const fetchFiles = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("http://localhost:5000/api/files");

            if (!res.ok) throw new Error(`Server error (${res.status})`);

            const contentType = res.headers.get("content-type");

            if (!contentType?.includes("application/json")) {
                    throw new Error("Invalid response format (not JSON)");
            }

            const data = await res.json();

            if (!Array.isArray(data)) throw new Error("Data is not an array");
            console.log(data)
            setFiles(data);

        } catch (err) {
                console.log("Fetch failed:", err);
                setFiles(FALLBACK_FILES);
                setError(`${err.message}. Showing fallback.`);
        } finally {
            setLoading(false);
        }
    };
    return fetchFiles;
}
