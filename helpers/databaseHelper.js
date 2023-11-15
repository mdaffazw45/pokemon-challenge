import fs, { readFileSync, writeFileSync } from 'fs'

const database = new URL('../database/db.json', import.meta.url)

const createDatabaseIfNotExists = () => {
    if (!fs.existsSync(database)) {
      const initialData = { data: [] };
      fs.writeFileSync(database, JSON.stringify(initialData));
    }
};
  
createDatabaseIfNotExists();

export const loadData = () => {
    try{
        const jsonData = JSON.parse(readFileSync(database))
        return jsonData.data
    }catch(error){
        console.error('Terjadi kesalahan saat membaca data:', error);
    return [];
    }
}
export const storeData = (data) => {
    try {
        const jsonData = { data }; 
        writeFileSync(database, JSON.stringify(jsonData, null, 2)); 
    } catch (error) {
        console.error('Terjadi kesalahan saat menyimpan data:', error);
    }
}