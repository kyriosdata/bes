/*
 *
 *  * Copyright (c) 2017
 *  *
 *  * Fábio Nogueira de Lucena
 *  * Fábrica de Software - Instituto de Informática (UFG)
 *  *
 *  * Creative Commons Attribution 4.0 International License.
 *
 *
 */

export function descricao(n) {
    return n.descricao;
}

export function tipo(n) {
    return n.tipo;
}


const cores = ["", "lightgray", "green", "blue", "red", "black"];

/**
 * Estabelece a cor a ser utilizado por um dado nó.
 * @param d Nó para o qual a cor é estabelecida.
 * @returns {string} A cor a ser utilizada para "pintar" o nó.
 */
export function cor(d) {
    return cores[d.tipo];
}

// Retorna campo 'value' de uma aresta
// (usado para indicar espessura da aresta)
export function espessuraAresta(a) {
    return tipo(a);
}

export function corAresta() {
    return "gray";
}