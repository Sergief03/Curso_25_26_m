export function createRickAndMorty() {
    const state = {
        cache: new Map(),
        isLoading: false,
        pageSize: 20,
        currentPage: 1
    };

    const debounce = (fn, delay) => setTimeout(fn, delay);

    const search = async (palabra) => {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${palabra}`);
            const data = await response.json();
            if (!data.results) return [];
            let resultados = [...data.results];
            if (data.info.pages > 1) {
                for (let i = 2; i <= data.info.pages; i++) {
                    const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${palabra}&page=${i}`);
                    const d = await res.json();
                    resultados.push(...d.results);
                }
            }
            return resultados;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const displayCharacter = (data) => {
        const cardGrid = document.createElement("div");
        cardGrid.className = "flex flex-wrap justify-center gap-4 mt-6 card-grid";

        const start = (state.currentPage - 1) * state.pageSize;
        const end = start + state.pageSize;
        const pageItems = data.slice(start, end);

        pageItems.forEach(c => {
            const card = document.createElement("div");
            card.classList.add("card", "p-4", "rounded", "shadow", "bg-white", "w-48");

            const name = document.createElement("h2");
            name.textContent = c.name;
            name.classList.add("font-bold", "text-lg", "mb-2");

            const image = document.createElement("img");
            image.src = c.image;
            image.classList.add("rounded");

            const status = document.createElement("p");
            status.textContent = `Status: ${c.status}`;

            const location = document.createElement("p");
            location.textContent = `Location: ${c.location.name}`;

            card.append(name, image, status, location);
            cardGrid.appendChild(card);
        });

        return { cardGrid };
    };

    let spinner;
    let paginationControls = null;

    const renderPagination = (totalItems, container, palabra) => {
        const totalPages = Math.ceil(totalItems / state.pageSize);

        // eliminar controles antiguos
        if (paginationControls) paginationControls.remove();

        paginationControls = document.createElement("div");
        paginationControls.className = "flex justify-center gap-4 mt-6";

        const prevBtn = document.createElement("button");
        prevBtn.textContent = "Anterior";
        prevBtn.className = "px-4 py-2 bg-gray-300 rounded disabled:opacity-50";
        prevBtn.disabled = state.currentPage === 1;

        const nextBtn = document.createElement("button");
        nextBtn.textContent = "Siguiente";
        nextBtn.className = "px-4 py-2 bg-gray-300 rounded disabled:opacity-50";
        nextBtn.disabled = state.currentPage === totalPages;

        prevBtn.onclick = () => {
            state.currentPage--;
            updateGrid(container, palabra);
        };

        nextBtn.onclick = () => {
            state.currentPage++;
            updateGrid(container, palabra);
        };

        paginationControls.append(prevBtn, nextBtn);
        container.appendChild(paginationControls);
    };

    const updateGrid = (container, palabra) => {
        const data = state.cache.get(palabra);

        // eliminar grid anterior
        const oldGrid = container.querySelector(".card-grid");
        if (oldGrid) oldGrid.remove();

        const { cardGrid } = displayCharacter(data);
        container.appendChild(cardGrid);

        renderPagination(data.length, container, palabra);
    };

    const render = () => {
        const app = document.getElementById("app");
        app.innerHTML = "";

        const container = document.createElement("div");
        container.classList.add("container", "p-6");

        const searchForm = document.createElement("form");
        searchForm.classList.add("search-form");

        const input = document.createElement("input");
        input.classList.add("search-input", "border", "p-2", "rounded", "w-full");
        input.type = "text";
        input.placeholder = "Search...";

        searchForm.appendChild(input);
        container.appendChild(searchForm);

        spinner = document.createElement("div");
        spinner.className = "flex justify-center mt-4 hidden";
        spinner.innerHTML = `
            <div class="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-transparent"></div>
        `;
        container.appendChild(spinner);

        const showSpinner = () => spinner.classList.remove("hidden");
        const hideSpinner = () => spinner.classList.add("hidden");

        input.addEventListener('input', () => {
            showSpinner();
            debounce(async () => {
                const palabra = input.value.trim().toLowerCase();
                state.currentPage = 1;

                // eliminar grid y paginación anteriores
                const oldGrid = container.querySelector(".card-grid");
                if (oldGrid) oldGrid.remove();
                if (paginationControls) paginationControls.remove();

                if (!palabra) {
                    hideSpinner();
                    return;
                }

                let data;

                if (state.cache.has(palabra)) {
                    data = state.cache.get(palabra);
                } else {
                    data = await search(palabra);
                    state.cache.set(palabra, data);
                }

                hideSpinner();

                if (data.length === 0) {
                    const msg = document.createElement('p');
                    msg.textContent = 'No se encontraron resultados';
                    msg.className = 'font-bold text-lg text-red-500 mt-4';
                    container.appendChild(msg);
                    return;
                }

                const { cardGrid } = displayCharacter(data);
                container.appendChild(cardGrid);

                renderPagination(data.length, container, palabra);

            }, 500);
        });

        app.appendChild(container);
        return { container };
    };

    return { render };
}
