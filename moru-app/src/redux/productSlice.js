import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    products: [
        {
            "product": {
                "id": "1",
                "name": "Peluche de Osito",
                "description": "Peluche suave y tierno, ideal para regalar.",
                "image": "https://http2.mlstatic.com/D_NQ_NP_2X_601270-MLM44514590038_012021-AB-M.jpg",
                "event": ["Aniversario"],
                "price": 20000,
                "season": ["Toda la temporada"],
                "gender": ["Unisex"],
                "logicalDraft": false
            },
            "productstatus": {
                "id": "1",
                "date": "2023-09-28T12:00:00Z",
                "status": "pending"
            },
            "generalCategory": ["Regalos"],
            "especificCategory": ["Peluches", "Aniversario", "Juguetes"],
            "stock": [{
                    "id": "1",
                    "size": "Pequeño",
                    "stock": 15
                },
                {
                    "id": "2",
                    "size": "Mediano",
                    "stock": 20
                }
            ]
        },
        {
            "product": {
                "id": "2",
                "name": "Muñeca de Porcelana",
                "description": "Muñeca delicadamente elaborada a mano.",
                "image": "https://juguetesdecoleccion.com/wp-content/uploads/muneca-rapunzel-princesa-disney.jpg",
                "event": ["Cumpleaños", "Navidad"],
                "price": 25000,
                "season": ["Invierno"],
                "gender": ["Femenino"],
                "logicalDraft": true
            },
            "productstatus": {
                "id": "2",
                "date": "2023-09-29T14:30:00Z",
                "status": "available"
            },
            "generalCategory": ["Regalos"],
            "especificCategory": ["Muñecas", "Arte"],
            "stock": [{
                    "id": "1",
                    "size": "Pequeña",
                    "stock": 10
                },
                {
                    "id": "2",
                    "size": "Grande",
                    "stock": 5
                }
            ]
        },
        {
            "product": {
                "id": "3",
                "name": "Rompecabezas de 1000 Piezas",
                "description": "Diviértete armando este desafiante rompecabezas.",
                "image": "https://http2.mlstatic.com/D_NQ_NP_2X_601270-MLM44514590038_012021-AB-M.jpg",
                "event": ["Tiempo Libre"],
                "price": 3000,
                "season": ["Toda la temporada"],
                "gender": ["Unisex"],
                "logicalDraft": false
            },
            "productstatus": {
                "id": "3",
                "date": "2023-09-30T10:15:00Z",
                "status": "available"
            },
            "generalCategory": ["Juegos"],
            "especificCategory": ["Rompecabezas"],
            "stock": [{
                "id": "1",
                "size": "Estándar",
                "stock": 30
            }]
        },
        {
            "product": {
                "id": "4",
                "name": "Peluche de Osito",
                "description": "Peluche suave y tierno, ideal para regalar.",
                "image": "https://http2.mlstatic.com/D_NQ_NP_2X_601270-MLM44514590038_012021-AB-M.jpg",
                "event": ["Aniversario"],
                "price": 20000,
                "season": ["Toda la temporada"],
                "gender": ["Unisex"],
                "logicalDraft": false
            },
            "productstatus": {
                "id": "1",
                "date": "2023-09-28T12:00:00Z",
                "status": "pending"
            },
            "generalCategory": ["Regalos"],
            "especificCategory": ["Peluches", "Aniversario", "Juguetes"],
            "stock": [{
                    "id": "1",
                    "size": "Pequeño",
                    "stock": 15
                },
                {
                    "id": "2",
                    "size": "Mediano",
                    "stock": 20
                }
            ]
        },
        {
            "product": {
                "id": "5",
                "name": "Muñeca de Porcelana",
                "description": "Muñeca delicadamente elaborada a mano.",
                "image": "https://juguetesdecoleccion.com/wp-content/uploads/muneca-rapunzel-princesa-disney.jpg",
                "event": ["Cumpleaños", "Navidad"],
                "price": 25000,
                "season": ["Invierno"],
                "gender": ["Femenino"],
                "logicalDraft": true
            },
            "productstatus": {
                "id": "2",
                "date": "2023-09-29T14:30:00Z",
                "status": "available"
            },
            "generalCategory": ["Regalos"],
            "especificCategory": ["Muñecas", "Arte"],
            "stock": [{
                    "id": "1",
                    "size": "Pequeña",
                    "stock": 10
                },
                {
                    "id": "2",
                    "size": "Grande",
                    "stock": 5
                }
            ]
        },
        {
            "product": {
                "id": "6",
                "name": "Rompecabezas de 1000 Piezas",
                "description": "Diviértete armando este desafiante rompecabezas.",
                "image": "https://http2.mlstatic.com/D_NQ_NP_2X_601270-MLM44514590038_012021-AB-M.jpg",
                "event": ["Tiempo Libre"],
                "price": 3000,
                "season": ["Toda la temporada"],
                "gender": ["Unisex"],
                "logicalDraft": false
            },
            "productstatus": {
                "id": "3",
                "date": "2023-09-30T10:15:00Z",
                "status": "available"
            },
            "generalCategory": ["Juegos"],
            "especificCategory": ["Rompecabezas"],
            "stock": [{
                "id": "1",
                "size": "Estándar",
                "stock": 30
            }]
        }
    ]
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
    },
});

export const {
    setProducts
} = productsSlice.actions;
export default productsSlice.reducer;