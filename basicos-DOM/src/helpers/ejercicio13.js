/*
    Crear una aplicación para gestionar las reseñas de restaurantes utilizando 
    closure y pattern factory.
*/

export default function createEjercicio13() {

    // FACTORY: crea la reseña
    const createReview = (text, rating) => ({
        text,
        rating,
        id: Date.now()
    });

    // CLOSURE: gestiona el LocalStorage
    const reviewStorage = (() => {
        const KEY = "reviews";

        const get = () => JSON.parse(localStorage.getItem(KEY)) || [];

        const save = (reviews) =>
            localStorage.setItem(KEY, JSON.stringify(reviews));

        const add = (review) => {
            const reviews = get();
            reviews.push(review);
            save(reviews);
        };

        const remove = (id) => {
            const reviews = get().filter(r => r.id !== id);
            save(reviews);
        };

        return { get, add, remove };
    })();

    //------------------------------ FORM -----------------------------------

    const createForm = () => {
        const container = document.createElement('div');
        const form = document.createElement('form');

        // textarea correcto
        const textarea = document.createElement('textarea');
        textarea.placeholder = "Escribe tu reseña...";
        textarea.required = true;

        const p = document.createElement('p');
        p.textContent = "Calificación:";

        const select = document.createElement('select');
        for (let i = 1; i <= 5; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            select.appendChild(option);
        }

        const button = document.createElement('button');
        button.textContent = "Guardar";

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // VALIDACIONES
            if (textarea.value.trim() === "") {
                alert("La reseña no puede estar vacía.");
                return;
            }

            const review = createReview(textarea.value, select.value);
            reviewStorage.add(review);

            textarea.value = ""; // limpiar
            select.value = 1;

            renderReviews(); // actualizar la vista
        });

        form.appendChild(textarea);
        form.appendChild(p);
        form.appendChild(select);
        form.appendChild(button);
        container.appendChild(form);

        return container;
    };

    //------------------------------- REVIEWS LIST ------------------------------

    const renderReviews = () => {
        const container = document.getElementById("reviews");
        container.innerHTML = ""; // limpiar

        const lsReviews = reviewStorage.get();

        lsReviews.forEach(review => {
            const div = document.createElement('div');

            const p = document.createElement('p');
            p.textContent = review.text;

            const starP = document.createElement('p');
            starP.textContent = `Estrellas: ${'★'.repeat(Math.floor(review.rating))}`;

            const delBtn = document.createElement('button');
            delBtn.textContent = "Eliminar";

            delBtn.addEventListener("click", () => {
                reviewStorage.remove(review.id);
                renderReviews();
            });

            div.appendChild(p);
            div.appendChild(starP);
            div.appendChild(delBtn);

            container.appendChild(div);
        });
    };

    //------------------------------- RENDER MAIN ------------------------------

    const render = () => {
        const app = document.getElementById("app");
        app.innerHTML = ""; // limpiar antes de renderizar

        const form = createForm();
        const reviewsDiv = document.createElement("div");
        reviewsDiv.id = "reviews";

        app.appendChild(form);
        app.appendChild(reviewsDiv);

        renderReviews();
    };

    return { render };
}
