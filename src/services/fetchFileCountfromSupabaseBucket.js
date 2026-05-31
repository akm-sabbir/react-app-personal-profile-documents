import {resources} from '../constants/resourcesData';
import supabase from '../utils/supabase.tsx';
import globalCache from '../utils/cacheSystem.js';

export function fetchFileCountFromBucket(course, onLoad, setFileCountDict){
    const bucketName = 'academic-resources'; // The root bucket name
    const basePath = 'pdf-files'; // The path leading to your categories
    const stats = {};
    onLoad(true);
    if(globalCache.has(`${basePath}/${course.semLabel}/${course.code}`)){
             setFileCountDict(globalCache.get(`${basePath}/${course.semLabel}/${course.code}`));
             onLoad(false);
             return;
    }
    console.log("Our dictionary is empty");
    const getDeepFolderCounts = async () => {
            await Promise.all(
                resources.map(async (category) => {
                    const deepPath = `${basePath}/${course.semLabel}/${course.code}/${category.key}`;
                    const { data, error } = await supabase
                                            .storage
                                            .from(bucketName)
                                            .list(deepPath, {
                                                  limit: 1000,
                                                  offset: 0
                                            });
                    console.log("File count for key is:, ", category.key, data.length);
                    console.log("Full pathname, ", `${basePath}/${course.semLabel}/${course.code}/${category.key}`)
                    if (error) {
                        console.error(`Error reading ${deepPath}:`, error.message);
                        stats[category] = 0;
                    } else {
                        const fileCount = data.filter(f => f.name !== '.emptyFolderPlaceholder')
                                              .filter(f => f.name.toLowerCase().endsWith('.pdf')).length;
                        stats[category.key] = fileCount;
                    }
                }
                )
            );
        globalCache.set(`${basePath}/${course.semLabel}/${course.code}`, stats, 3600);
        setFileCountDict(stats);
        onLoad(false);
    }

    getDeepFolderCounts();
}
// Example Output: { "semester-1": 12, "semester-2": 8, "notes": 45 }
