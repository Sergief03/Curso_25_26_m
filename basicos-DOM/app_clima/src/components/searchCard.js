


export default function createSearchCard(onSearch) {

    //variables privadas

    let isSearching = false;

    //DOM
    const container = document.createElement('div');
    container.className="bg.white rounded-lg shadow-lg p-6 mb-6"

    const title = document.createElement('h2');
    title.textContent = 'Buscador ciudad';
    title.className="text-2xl font-bold mb-4";

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Introduce una ciudad...';
    input.className="border border-gray-300 rounded-md p-2 mb-4";

    const button = document.createElement('button');
    button.textContent = 'Buscar';
    button.className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

    //Crear un parrafo llamado statusElement que permita especificar los siguientes estasdos a traves de la accion de setStatus (message,info) los estasdos son:
    // - Loading (color azul-600)
    // - Success (color verde-600)
    // - Error (color rojo-600)
    // - Info (color gris-600)
    

    const statusElement=document.createElement('p');
    statusElement.textContent='';

    const setStatus = (message,status='info') => {
        statusElement.textContent=message;
        switch(status){
            case 'loading':
                statusElement.className+=` text-blue-600`;
                break;
            case 'success':
                statusElement.className+=` text-green-600`;
                break;
            case 'error':
                statusElement.className+=` text-red-600`;
                break;
            case 'info':
                statusElement.className+=` text-gray-600`;
                break;
        }    
    }


    const performSearch = async ()=>{
        const cityName=input.value.trim().toLowerCase()

        if(!cityName) return setStatus('No hay ciudad introducida', 'error');

        isSearching=true;
        setStatus('Cargando...', 'loading');

        try{
            const data=await onSearch(cityName);

            setStatus('Ciudad encontrada', 'success');
            


        }catch(error){
            setStatus('Ciudad no encontrada', 'error');
            throw new Error(error);
        }finally{
            isSearching=false;
        }
    }

    button.addEventListener('click', async ()=>{
        try{
            await performSearch();
        }catch(error){
            console.error(error);
        }
    })

    input.addEventListener('keypress',e=>{
        if(e.key==='Enter') performSearch();
    })
    


    container.append(title, input, button, statusElement);
    return {
        element:container,
        focus:()=>{
            input.focus();
        },
        clearForm:()=>{
            input.value='';
            setStatus('');
            isSearching=false;
        },
        getInput:()=>{
            return input.value.trim().toLowerCase();
        }
    };

}
