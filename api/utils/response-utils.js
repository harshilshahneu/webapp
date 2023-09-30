export const setResponse = (res, status) => {
    res.status(status)
        .header('cache-control', 'no-cache, no-store, must-revalidate')
        .header('pragma', 'no-cache')
        .end();
}
