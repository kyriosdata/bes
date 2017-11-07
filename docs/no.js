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

export function cor(d) {
    return cores[d.tipo];
}