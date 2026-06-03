import {resources} from '../constants/resourcesData';
import supabase from '../utils/supabase.tsx';
import globalCache from '../utils/cacheSystem.js';
//import supaBase from '../utils/supabaseSystem.tsx';

export function fetchFileCountFromBucket(course, onLoad, setFileCountDict){
    const bucketName = 'academic-resources'; // The root bucket name
    const basePath = 'pdf-files'; // The path leading to your categories
    const stats = {};
    onLoad(true);
    const controller = new AbortController();
    const combinedSignal = AbortSignal.any([controller.signal, AbortSignal.timeout(10000) ]);

    if(globalCache.has(`${basePath}/${course.semLabel}/${course.code}`)){
             setFileCountDict(globalCache.get(`${basePath}/${course.semLabel}/${course.code}`));
             onLoad(false);
             return;
    }
    console.log("Our dictionary is empty");
    const getDeepFolderCounts = async () => {
        try{
            await Promise.all(
                resources.map(async (category) => {


                            const deepPath = `${basePath}/${course.semLabel}/${course.code}/${category.key}`;
                            const { data, error } = await supabase
                                            .storage
                                            .from(bucketName)
                                            .list(deepPath, {
                                                  limit: 1000,
                                                  offset: 0
                                            },{ signal: combinedSignal });

                        if (error) {
                            console.log(`Error reading ${deepPath}:`, error.message);
                            stats[category] = 0;
                        } else {
                            console.log("File count for key is:, ", category.key, data.length);
                            console.log("Full pathname, ", `${basePath}/${course.semLabel}/${course.code}/${category.key}`)
                            const fileCount = data.filter(f => f.name !== '.emptyFolderPlaceholder')
                                              .filter(f => f.name.toLowerCase().endsWith('.pdf')).length;
                            stats[category.key] = fileCount;
                        }


                }
                )
            );
        } catch (err) {
              if (err.name === 'AbortError') {
                  console.error('Request timed out: No internet or slow connection.')
                            // Handle offline UI logic here
              } else {
                            console.error('Supabase error:', err.message)
              }
        } finally {
                           // 4. Always clear the timeout once the request completes
                 //supaBase.clear();
        }
        globalCache.set(`${basePath}/${course.semLabel}/${course.code}`, stats, 3600);
        setFileCountDict(stats);
        onLoad(false);
    }

    getDeepFolderCounts();
}
// Example Output: { "semester-1": 12, "semester-2": 8, "notes": 45 }
