import { descricao, tipo, cor, espessuraAresta, corAresta } from "./no.js";

/**
 * Inicialmente todos os tipos de nós são exibidos.
 * Ou seja, nós desmarcados é uma lista vazia.
 * @type {Set}
 */
let nosDesmarcados = new Set();

/**
 * Inicialmente todos os tipos de arestas são marcados para
 * exibição. Este conjunto permite acompanhar alterações
 * nesse conjunto por parte do usuário.
 * @type {Set}
 */
let arestasDesmarcadas = new Set();

/**
 * Indica se nós que não estão conectados a outros devem ser
 * removidos da apresentação. Inicialmente esta opção está
 * marcada, ou seja, nós isolados não devem ser exibidos.
 */
let excluirNosSemArestas = true;

/**
 * Grafo original carregado a partir dos dados.
 * Esse grafo é reutilizado.
 */
let grafo;

let disciplinas;
let bibliografias;
let ementas;
let habilidades;
let arestas;
let nos;

/**
 * Persiste grafo originalmente carregado a partir de dados.
 * @param g Grafo original.
 */
function gravaGrafoOriginal(g) {
    grafo = g;
}

function guardaDisciplinas(d) {
    disciplinas = d;
}

function guardaBibliografias(b) {
    bibliografias = b;
}

function guardaEmentas(e) {
    ementas = e;
}

function guardaHabilidades(h) {
    habilidades = h;
}

function guardaArestas(a) {
    arestas = a;
}

function guardaNos(n) {
    nos = n;
}

/**
 * Função que monta subgrafo do grafo original conforme opções
 * de seleção do usuário.
 * @param g.nodes Vetor de nós do grafo.
 * @param g.links Vetor de arestas do grafo.
 * @param g.links.tipo O tipo de uma aresta.
 * @returns {{}}
 */
function filtra(g) {
    let filtrado = {};

    // Remove links desmarcados
    filtrado.links = g.links.filter(function (l) {
        return !arestasDesmarcadas.has(tipo(l));
    });

    // Remove links para os quais pelo menos um dos nós foi desmarcado
    filtrado.links = filtrado.links.filter(function (l) {
        if (nosDesmarcados.has(tipo(l.source))) {
            return false;
        }

        return !nosDesmarcados.has(tipo(l.target));
    });

    // Se nós sem arestas devem ser excluídos, então apenas
    // nós ligados a arestas devem ser exibidos. Lembrar que
    // as arestas estão restritas àquelas cujos nós não foram
    // excluídos.
    if (excluirNosSemArestas) {
        const nos = new Set();
        filtrado.links.forEach(function (l) {
            nos.add(l.source);
            nos.add(l.target);
        });

        filtrado.nodes = [...nos];
    } else {
        // Remove nós desmarcados
        filtrado.nodes = g.nodes.filter(function (n) {
            return !nosDesmarcados.has(tipo(n));
        });
    }

    return filtrado;
}

/**
 * Função que exibe o grafo fornecido.
 * @param graph O grafo a ser exibido.
 */
function exibeGrafo(graph) {
    const parentWidth = d3.select("svg").node().parentNode.clientWidth;
    const parentHeight = d3.select("svg").node().parentNode.clientHeight;
    const centerWidth = parentWidth / 2;
    const centerHeight = parentHeight / 2;

    const svg = d3.select("svg")
        .attr("width", parentWidth)
        .attr("height", parentHeight);

    // remove todos os elementos de classe g-main
    svg.selectAll(".g-main").remove();

    const gMain = svg.append("g")
        .classed("g-main", true);

    const rect = gMain.append("rect")
        .attr("width", parentWidth)
        .attr("height", parentHeight)
        .style("fill", "lightyellow");

    const gDraw = gMain.append("g");

    function zoomed() {
        gDraw.attr("transform", d3.event.transform);
    }

    // Habilita zoom (in and out)
    gMain.call(d3.zoom().on("zoom", zoomed));

    const link = gDraw.append("g")
        .attr("class", "link")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke-width", espessuraAresta)
        .attr("stroke", corAresta);

    function raioNo(d) {
        if (d.tipo === 1) {
            return 10;
        }

        return 5;
    }

    /**
     * Apresenta detalhes do nó fornecido.
     * @param d O nó cujos detalhes serão exibidos.
     */
    function detalhe(d) {
        document.getElementById("tipo").innerHTML = tipo(d);
        document.getElementById("tipo-valor").innerHTML = descricao(d);
    }

    function forceLink() {
        /**
         * Estabelece "força" (distância) entre nós.
         * @param a.tipo O tipo da aresta
         * @returns {number} Valor que estabelece
         */
        function distanciaEntreArestas(a) {
            return 100 * a.tipo;
        }

        return d3.forceLink()
            .id(function (d) {
                return d.id;
            })
            .distance(distanciaEntreArestas)
            .strength(2);
    }

    const repulsao = d3.forceManyBody().strength(-200);

    const simulation = d3.forceSimulation()
        .force("link", forceLink())
        .force("charge", repulsao)
        .force("center", d3.forceCenter(centerWidth, centerHeight))
        .force("x", d3.forceX(centerWidth))
        .force("y", d3.forceY(centerHeight));

    let node = null;
    function dragstarted(d) {
        if (!d3.event.active) {
            simulation.alphaTarget(0.9).restart();
        }

        if (!d.selected) {
            node.classed("selected", function (p) {
                p.selected = false;
                p.previouslySelected = false;
                return false;
            });
        }

        d3.select(this).classed("selected", function (p) {
            p.previouslySelected = p.selected;
            p.selected = true;
            return true;
        });

        node.filter(function (d) {
            return d.selected;
        })
            .each(function (d) { //d.fixed |= 2;
                d.fx = d.x;
                d.fy = d.y;
            });
    }

    function dragged() {
        node.filter(function (d) {
            return d.selected;
        })
            .each(function (d) {
                d.fx += d3.event.dx;
                d.fy += d3.event.dy;
            });
    }

    function dragended(d) {
        if (!d3.event.active) {
            simulation.alphaTarget(0);
        }

        d.fx = null;
        d.fy = null;
        node.filter(function (d) {
            return d.selected;
        }).each(function (d) {
            d.fx = null;
            d.fy = null;
        });
    }

    function dragging() {
        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    function destacaVizinhos(d) {
        const thisNode = d.id;
        const connected = graph.links.filter(function (e) {
            return e.source.id === thisNode || e.target.id === thisNode;
        });

        svg.selectAll("circle").attr("opacity", function (d) {
            function getTargetId(d) {

                return d.target.id;
            }

            function getSourceId(d) {

                return d.source.id;
            }

            function hasSource() {
                return connected.map(getSourceId).indexOf(d.id) > -1;
            }

            function hasTarget() {
                return connected.map(getTargetId).indexOf(d.id) > -1;
            }

            return (hasSource() || hasTarget());
        });

        const origens = connected.map(function (d) {
            return d.source.id;
        });

        const destinos = connected.map(function (d) {
            return d.target.id;
        });

        svg.selectAll("line").attr("opacity", function (d) {
            function hasOrigem() {
                return origens.indexOf(d.source.id) > -1;
            }

            function hasDestino() {
                return destinos.indexOf(d.target.id) > -1;
            }

            return (hasOrigem() || hasDestino()) ? 1 : 0;
        });
    }

    node = gDraw.append("g")
        .attr("class", "node")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", raioNo)
        .attr("fill", cor)
        .call(dragging())
        .on("mouseover", detalhe)
        .on("click", destacaVizinhos);

    // add titles for mouseover blurbs
    node.append("title").text(descricao);

    function ticked() {
        link.attr("x1", function (d) {
            return d.source.x;
        })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });

        node.attr("cx", function (d) {
            return d.x;
        })
            .attr("cy", function (d) {
                return d.y;
            });
    }

    simulation.nodes(graph.nodes).on("tick", ticked);

    simulation.force("link").links(graph.links);

    rect.on("click", function () {
        node.each(function (d) {
            d.selected = false;
            d.previouslySelected = false;
        });
        node.classed("selected", false);
    });

    function keydown() {
        if (d3.event.key === "h") {
            window.alert("h");
        }
    }

    function keyup() {
        window.alert("keyUp");
    }

    d3.select("body").on("keydown", keydown);
    d3.select("body").on("keyup", keyup);

    const info = [
        "Nós: " + graph.nodes.length,
        "Arestas: " + graph.links.length
    ];

    svg.selectAll("text").remove();

    function posicaoY(d, i) {
        return 12 + (i * 18);
    }

    function texto(d) {
        return d;
    }

    svg.selectAll("text")
        .data(info)
        .enter()
        .append("text")
        .attr("x", 82)
        .attr("y", posicaoY)
        .text(texto);
}

/**
 * Atualiza o conjunto de arestas desmarcadas. Uma aresta faz
 * parte desse conjunto se não estiver marcada.
 * @param marcada Indica se a aresta está marcada ou não.
 * @param valor O identificador do tipo de aresta.
 */
function atualizaArestasDesmarcadas(marcada, valor) {
    if (marcada) {
        arestasDesmarcadas.delete(valor);
    } else {
        arestasDesmarcadas.add(valor);
    }

    exibeGrafo(filtra(grafo));
}

window.opcoesConteudoUnidade = function(checkbox) {
    atualizaArestasDesmarcadas(checkbox.checked, 1);
};

window.opcoesDisciplinaConteudo = function(checkbox) {
    atualizaArestasDesmarcadas(checkbox.checked, 3);
};

window.opcoesDisciplinaCondicaoMinima = function(checkbox) {
    atualizaArestasDesmarcadas(checkbox.checked, 2);
};

window.opcoesHabilidadeUnidade = function(checkbox) {
    atualizaArestasDesmarcadas(checkbox.checked, 4);
};

window.opcoesCondicoesUnidades = function(checkbox) {
    atualizaArestasDesmarcadas(checkbox.checked, 5);
};

window.opcoesDisciplinaDisciplina = function(checkbox) {
    atualizaArestasDesmarcadas(checkbox.checked, 6);
};

window.opcoesEntreCondicoes = function(checkbox) {
    atualizaArestasDesmarcadas(checkbox.checked, 7);
};

window.opcoesEntreConteudos = function(checkbox) {
    atualizaArestasDesmarcadas(checkbox.checked, 8);
};

window.opcoesEntreHabilidades = function(checkbox) {
    atualizaArestasDesmarcadas(checkbox.checked, 9);
};

window.opcoesExcluirNosSemArestas = function(checkbox) {
    excluirNosSemArestas = checkbox.checked;
    exibeGrafo(filtra(grafo));
};

/**
 * Atualiza o conjunto de nós desmarcados. Um nó
 * faz parte deste conjunto se não estiver marcado.
 * @param marcado Indica se o nó está marcado ou não.
 * @param valor Identificador do nó que foi marcado ou desmarcado.
 */
function atualizaNosDesmarcados(marcado, valor) {
    if (marcado) {
        nosDesmarcados.delete(valor);
    } else {
        nosDesmarcados.add(valor);
    }

    exibeGrafo(filtra(grafo));
}

/**
 * Se desmarcado, remove nós do tipo disciplina.
 * @param checkbox
 */
window.opcoesDisciplinas = function(checkbox) {
    atualizaNosDesmarcados(checkbox.checked, 1);
};

window.opcoesTermos = function(checkbox) {
    atualizaNosDesmarcados(checkbox.checked, 5);
};

window.opcoesCondicoes = function (checkbox) {
    atualizaNosDesmarcados(checkbox.checked, 3);
};

window.opcoesHabilidades = function(checkbox) {
    atualizaNosDesmarcados(checkbox.checked, 4);
};

window.opcoesConteudo = function(checkbox) {
    atualizaNosDesmarcados(checkbox.checked, 2);
};

function carregaDados(define) {
    return function(error, carregado) {
        if (error) {
            alert("Erro ao carregar dados...");
            throw error;
        }

        define(carregado);
    };
}

function carregaPara(define) {
    return function(error, carregado) {
        if (error) {
            alert("Erro ao carregar dados...");
            throw error;
        }

        define(carregado);
        exibeGrafo(grafo);
    };
}
/**
 * Ponto de entrada da aplicação.
 */
d3.json("data/disciplinas.json", carregaDados(guardaDisciplinas));
d3.json("data/ementas.json", carregaDados(guardaEmentas));
d3.json("data/bibliografias.json", carregaDados(guardaBibliografias));
d3.json("data/habilidades.json", carregaDados(guardaHabilidades));
d3.json("data/nos.json", carregaDados(guardaNos));
d3.json("data/arestas.json", carregaDados(guardaArestas));
d3.json("d3.json", carregaPara(gravaGrafoOriginal));
