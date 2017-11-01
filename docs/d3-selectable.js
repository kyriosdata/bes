"use strict";

/**
 * Inicialmente todos os tipos de nós são exibidos.
 * Ou seja, nós desmarcados é uma lista vazia.
 * @type {Set}
 */
var nosDesmarcados = new Set();

/**
 * Inicialmente todos os tipos de arestas são marcados para
 * exibição. Este conjunto permite acompanhar alterações
 * nesse conjunto por parte do usuário.
 * @type {Set}
 */
var arestasDesmarcadas = new Set();

/**
 * Indica se nós que não estão conectados a outros devem ser
 * removidos da apresentação. Inicialmente esta opção está
 * marcada, ou seja, nós isolados não devem ser exibidos.
 */
var excluirNosSemArestas = true;

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
}

function opcoesConteudoUnidade(checkbox) {
    atualizaArestasDesmarcadas(checkbox.checked, 1);
}

function opcoesDisciplinaConteudo(checkbox) {
    atualizaArestasDesmarcadas(checkbox.checked, 3);
}

function opcoesDisciplinaCondicaoMinima(checkbox) {
    atualizaArestasDesmarcadas(checkbox.checked, 2);
}

function opcoesHabilidadeUnidade(checkbox) {
    atualizaArestasDesmarcadas(checkbox.checked, 4);
}

function opcoesCondicoesUnidades(checkbox) {
    atualizaArestasDesmarcadas(checkbox.checked, 5);
}

function opcoesDisciplinaDisciplina(checkbox) {
    atualizaArestasDesmarcadas(checkbox.checked, 6);
}

function opcoesEntreCondicoes(checkbox) {
    atualizaArestasDesmarcadas(checkbox.checked, 7);
}

function opcoesEntreConteudos(checkbox) {
    atualizaArestasDesmarcadas(checkbox.checked, 8);
}

function opcoesEntreHabilidades(checkbox) {
    atualizaArestasDesmarcadas(checkbox.checked, 9);
}

function opcoesExcluirNosSemArestas(checkbox) {
    excluirNosSemArestas = checkbox.checked;
}

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
}

/**
 * Se desmarcado, remove nós do tipo disciplina.
 * @param checkbox
 */
function opcoesDisciplinas(checkbox) {
    atualizaNosDesmarcados(checkbox.checked, 1);
}

function opcoesTermos(checkbox) {
    atualizaNosDesmarcados(checkbox.checked, 5);
}

function opcoesCondicoes(checkbox) {
    atualizaNosDesmarcados(checkbox.checked, 3);
}

function opcoesHabilidades(checkbox) {
    atualizaNosDesmarcados(checkbox.checked, 4);
}

function opcoesConteudo(checkbox) {
    atualizaNosDesmarcados(checkbox.checked, 2);
}

function exibeGrafo(graph) {
    var parentWidth = d3.select("svg").node().parentNode.clientWidth;
    var parentHeight = d3.select("svg").node().parentNode.clientHeight;
    var centerWidth = parentWidth / 2;
    var centerHeight = parentHeight / 2;

    var svg = d3.select("svg")
        .attr("width", parentWidth)
        .attr("height", parentHeight);

    // remove todos os elementos de classe g-main
    svg.selectAll(".g-main").remove();

    var gMain = svg.append("g")
        .classed("g-main", true);

    var rect = gMain.append("rect")
        .attr("width", parentWidth)
        .attr("height", parentHeight)
        .style("fill", "lightyellow");

    var gDraw = gMain.append("g");

    function zoomed() {
        gDraw.attr("transform", d3.event.transform);
    }

    // Habilita zoom (in and out)
    gMain.call(d3.zoom().on("zoom", zoomed));

    var nodes = {};
    graph.nodes.forEach(function (no) {
        nodes[no.id] = no;
        no.weight = 30 - (no.tipo * 15);
    });

    // the brush needs to go before the nodes so that it doesn't
    // get called when the mouse is over a node
    var gBrushHolder = gDraw.append("g");
    var gBrush = null;

    // Retorna campo 'value' de uma aresta
    // (usado para indicar espessura da aresta)
    function espessuraAresta(a) {
        return a.value;
    }

    function corAresta() {
        return "gray";
    }

    var link = gDraw.append("g")
        .attr("class", "link")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke-width", espessuraAresta)
        .attr("stroke", corAresta);

    var cores = ["", "lightgray", "green", "blue", "red", "black"];

    function corNo(d) {
        return cores[d.tipo];
    }

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
        var n = document.getElementById("tipo");
        n.innerHTML = d.tipo;

        var v = document.getElementById("tipo-valor");
        v.innerHTML = d.descricao;
    }

    function dragging() {
        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    var node = gDraw.append("g")
        .attr("class", "node")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", raioNo)
        .attr("fill", corNo)
        .call(dragging())
        .on("mouseover", detalhe)
        .on("click", destacaVizinhos);

    function destacaVizinhos(d) {
        var thisNode = d.id;
        var connected = graph.links.filter(function (e) {
            return e.source.id === thisNode || e.target.id === thisNode;
        });

        svg.selectAll("circle").attr("opacity", function (d) {
            return (connected.map(d => d.source.id).indexOf(d.id) > -1 || connected.map(d => d.target.id).indexOf(d.id) > -1) ? 1 : 0.1
        });

        var origens = connected.map(d => d.source.id);
        var destinos = connected.map(d => d.target.id);

        svg.selectAll("line").attr("opacity", function (d) {
            return origens.indexOf(d.source.id) > -1 || destinos.indexOf(d.target.id) > -1 ? 1 : 0;
        });
    }

    function getDescricao(d) {
        return d.descricao;
    }

    // add titles for mouseover blurbs
    node.append("title").text(getDescricao);

    function forceLink() {
        return d3.forceLink()
            .id(d => d.id)
            .distance(d => 100);
    }

    var simulation = d3.forceSimulation()
        .force("link", forceLink())
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(centerWidth, centerHeight))
        .force("x", d3.forceX(centerWidth))
        .force("y", d3.forceY(centerHeight));

    simulation.nodes(graph.nodes).on("tick", ticked);

    simulation.force("link").links(graph.links);

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

    var brushMode = false;
    var brushing = false;

    rect.on("click", () => {
        node.each(function (d) {
            d.selected = false;
            d.previouslySelected = false;
        });
        node.classed("selected", false);
    });

    d3.select("body").on("keydown", keydown);
    d3.select("body").on("keyup", keyup);

    var shiftKey;

    function keydown() {
        shiftKey = d3.event.shiftKey;

        if (shiftKey) {
            // if we already have a brush, don't do anything
            if (gBrush)
                return;

            brushMode = true;

            if (!gBrush) {
                gBrush = gBrushHolder.append("g");
                gBrush.call(brush);
            }
        }
    }

    function keyup() {
        shiftKey = false;
        brushMode = false;

        if (!gBrush)
            return;

        if (!brushing) {
            // only remove the brush if we're not actively brushing
            // otherwise it'll be removed when the brushing ends
            gBrush.remove();
            gBrush = null;
        }
    }

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.9).restart();

        if (!d.selected && !shiftKey) {
            node.classed("selected", function (p) {
                return p.selected = p.previouslySelected = false;
            });
        }

        d3.select(this).classed("selected", function (p) {
            d.previouslySelected = d.selected;
            return d.selected = true;
        });

        node.filter(function (d) {
            return d.selected;
        })
            .each(function (d) { //d.fixed |= 2;
                d.fx = d.x;
                d.fy = d.y;
            })

    }

    function dragged(d) {
        node.filter(function (d) {
            return d.selected;
        })
            .each(function (d) {
                d.fx += d3.event.dx;
                d.fy += d3.event.dy;
            })
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        node.filter(function (d) {
            return d.selected;
        })
            .each(function (d) {
                d.fx = null;
                d.fy = null;
            })
    }

    var info = ["Nós: ", "Arestas" ];

    svg.selectAll("text")
        .data(info)
        .enter()
        .append("text")
        .attr("x", 47)
        .attr("y", function(d,i) { return 12 + i * 18; })
        .text(function(d) { return d; });

    return graph;
}
