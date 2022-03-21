import axios from "axios";

export default async function getGeneration(req, res) {
    if (req.method === "GET") {
        let listPokemons = [];

        for (let i = 1; i <= 151; i++) {
            const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`).then((res) => res.data);
            const pokemon = {
                id: result.id,
                nome: result.name,
                tipos: result.types.map(typeInfo => typeInfo.type.name),
                fotos: result.sprites.other.dream_world,
            };
            listPokemons.push(pokemon);
        }
        res.status(200).json(listPokemons);
    } else {
        res.status(405).json({ Error: "Method not Allowed!" });
    }
}
