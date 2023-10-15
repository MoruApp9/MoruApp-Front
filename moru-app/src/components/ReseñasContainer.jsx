import { Stars } from "./Stars"

export const ReseñasContainer = ({ reviews }) => {
    return (
        <div className="p-4 bg-gray-100 rounded-md">
            {
                reviews?.length > 0
                    ?
                    (<div>
                        <h1 className="text-purple-moru py-4 font-bold">Reseñas de clientes</h1>
                        {reviews?.map((r) => {
                            return (
                                <div key={r.id} className="border p-4 mb-4 rounded-lg bg-white">
                                    <h1 className="text-xl font-semibold mb-2">{r.client}</h1>
                                    <Stars score={r.punctuation} />
                                    <p className="text-gray-700">{r.comment}</p>
                                </div>
                            )
                        })}
                    </div>)
                    :
                    (<div>
                        <h1 className="text-purple-moru py-4">Aún no hay reseñas</h1>
                    </div>)
            } 
        </div>
    )
}
