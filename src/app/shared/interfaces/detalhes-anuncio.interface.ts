import { Anuncio } from "./anuncio.interface";
import { Empresa } from "./empresa.interface";
import { Produto } from "./produto.interface";

export interface AnuncioDetalhes {
    anuncio: Anuncio,
    produto: Produto,
    empresa: Empresa
}