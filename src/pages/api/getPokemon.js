import axios from "axios";

export default async function getPokemon(req, res) {
    if (req.method === "GET") {
        const id = req.query.id;
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((res) => res.data);
        const pokemon = {
            id: result.id,
            nome: result.name,
            tipos: result.types.map(typeInfo => typeInfo.type.name),
            fotos: result.sprites.other.dream_world,
        };
        res.status(200).json(pokemon);
    } else {
        res.status(405).json({ Error: "Method not Allowed!" });
    }
}
