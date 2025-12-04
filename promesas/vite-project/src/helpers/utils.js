
const VITE_API_URL = import.meta.env.VITE_API_URL;

export function dataJSONPromise (){
    console.log("-----------DATAJSONPROMISE------------")
    new Promise((resolve, reject) => {
        setTimeout(() => {
            
            resolve("Data loaded with Promise");
        }, 2000);
    }).then((data) => {
        console.log(data);
    });
}

export const dataJSONAsync = async () => {
    console.log("------- dataJSONAsyncAwait --------");
    try {
        const response = await fetch(VITE_API_URL);
        if (!response.ok) {
            throw new Error("Error al traer la data");
        }
        const data = await response.json();
        const dataParseada = data.map((infoFoto) => {
            return {
            title: infoFoto.title,
            thumbnailUrl: infoFoto.thumbnailUrl,
            }
        });

        console.log("-------------- Data parseada ---------------");
        console.log(dataParseada);
        
    } catch (error) {
        console.log("Error....", error);
    }
};