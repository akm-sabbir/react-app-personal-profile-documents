import globalCache from '../utils/cacheSystem.js';

export function fetchDataFromBucket(supabase, course, setFiles, setLoading, onSetSemester, onSetCode, setError){
    const repository = "academic-resources";
    const root = "pdf-files";
    setLoading(true);
    console.log("Final path", `${root}/${course.semLabel}/${course.code}`);
        const listPdfFilesFromSupabaseBucket = async () => {
        if(globalCache.has(`${root}/${course.semLabel}/${course.code}`)){
            const pdfFilesOnly = globalCache.get(`${root}/${course.semLabel}/${course.code}`);
            setFiles(pdfFilesOnly);
            onSetSemester(course.semLabel.trim());
            onSetCode(course.code.trim());
            setLoading(false);
            console.log("Fetched files from Cache", pdfFilesOnly);
            return;
        }
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
        globalCache.set(`${root}/${course.semLabel}/${course.code}`, pdfFilesOnly, 3600);
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

    listPdfFilesFromSupabaseBucket();
}