export const setResponse = (res, status, headers) => {
    res.status(status)
        .header('cache-control', 'no-cache, no-store, must-revalidate')
        .header('pragma', 'no-cache')

    //set the headers
    if (headers) {
        for (const [key, value] of Object.entries(headers)) {
            res.header(key, value);
        }
    }
    
    res.end();
}
