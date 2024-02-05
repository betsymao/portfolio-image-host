function getFileFromUrl(downloadURL) {
    const baseURL = `https://firebasestorage.googleapis.com/v0/b/${import.meta.env.VITE_STORAGE_BUCKET_URL}/o/`;
    console.log(baseURL);
    let fileGlob = downloadURL.replace(baseURL, '');

    const indexOfEndPath = fileGlob.indexOf('?');
    fileGlob = fileGlob.substring(0, indexOfEndPath);

    console.log(`Generated File Glob: ${fileGlob}`);
    return fileGlob;
}

export {
    getFileFromUrl,
}