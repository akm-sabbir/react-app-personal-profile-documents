

export function fetchDataFromBucket(supabase, course, setFiles, setLoading, onSetSemester, onSetCode, setError){
    const repository = "academic-resources";
    const root = "pdf-files";
    console.log("Final path", `${root}/${course.semLabel}/${course.code}`);
        const listPdfFilesFromSupabaseBucket = async () => {
        try {
            const { data, error } = await supabase
                .storage
                .from(repository)
                .list(`${root}/${course.semLabel}/${course.code}`, {
                limit: 100,
                sortBy: { column: 'name', order: 'asc' },
            });

        // Filter out any subdirectories or non-pdf items natively
        const pdfFilesOnly = data.filter(item => item.name.toLowerCase().endsWith('.pdf'));
        setFiles(pdfFilesOnly);
        onSetSemester(course.semLabel.trim());
        onSetCode(course.code.trim());
        setLoading(false);
        console.log("Fetched files from SupaBase Bucket", pdfFilesOnly);

        // Output: Array of objects containing file metadata: [{ name: "name.pdf", id: "...", metadata: {...} }]
        }catch(error){
            console.error(error);
            setError(`${err.message}. Showing fallback.`);
        }finally{
        }
   };

    return listPdfFilesFromSupabaseBucket;
}