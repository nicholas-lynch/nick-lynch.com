const frame = d3
    .select('body')
    .append('div')
    .classed('cube-frame', true)
;

face_data = [
    [0, 0, 'front', 'rgb(42.5, 42.5, 42.5)'],
    [0, 90, 'right', 'rgb(85, 85, 85)'],
    [0, 180, 'back', 'rgb(127.5, 127.5, 127.5'],
    [0, 270, 'left', 'rgb(170, 170, 170)'],
    [90, 0, 'top', 'rgb(212.5, 212.5, 212.5)'],
    [270, 0, 'bottom', 'rgba(255, 255, 255)']
]

const cube = frame
    .append('div')
    .classed('cube-group', true)
;

const faces = cube
    .selectAll('div')
    .data(face_data)
    .enter()
    .append('div')
;

faces.classed('cube-face', true)
    .style('transform', d => `rotateX(${d[0]}deg) rotateY(${d[1]}deg) translateZ(-100px)`)
    // .text(d => d[2])
    .style('background-color', d => d[3])
;

setInterval(
    _ => cube
        .transition()
        .duration(10)
        .styleTween(
            'transform', 
            _ => d3.interpolateString(
                cube.style('transform'), 
                rand_rotation()
            )
        ),
    10
);



function wobble() {
    const big_period = Math.floor(Math.random() * 15001) + 8000;
    const small_period = Math.random();

    (Date.now() % big_period) / big_period;

    return function() {
        return Math.sin(
            small_period *((Date.now() % big_period) / 1000) * 
            ((Date.now() % big_period) / big_period)
        )
    }
}

const w = [wobble(), wobble(), wobble(), wobble(), wobble()];
function rand_rotation() {
    return `rotate3d(${w[0]()}, ${w[1]()}, ${w[2]()}, ${180 * w[3]()}deg) translateZ(${w[4]()*100}px)`;
}

