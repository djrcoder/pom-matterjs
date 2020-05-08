
var canvasContainer = document.createElement('div')
document.body.appendChild(canvasContainer);

var statsContainer = document.createElement('div');
canvasContainer.appendChild(statsContainer);

var statsContent = document.createElement('h2');
statsContainer.appendChild(statsContent);


var titleEl = document.getElementById("ball-title");
var startButton = document.getElementById("starter-button")


let startTime = 1500000
let ballDrop = false;
let balls = 0;
var timerStarted = false;
var stopDropping;
var gong = new Audio('./sound/gong.mp3');
var waterDrop = new Audio('./sound/drop.mp3');
var pomodoroComplete = false;



makeTheThingsDance()

function startTheTimer() {

    // check if pomodoroComplete and reset everything

    if (pomodoroComplete === true) {

        balls = 0;
        startTime = 1500000;
        timerStarted = false;
        ballDrop = false;
        pomodoroComplete = false;

    }

    if (timerStarted === false && pomodoroComplete === false) {

        timerStarted = true;
        console.log("Started")
        startButton.textContent = "Let the balls drop!"
        gong.play()

        countDown()

        console.log("Vercel!")

        stopDropping = setInterval(function () {
            countDown()
        }, 60000)

        // stopDropping = setInterval(function () {
        //     countDown()
        // }, 600)
    }
}

function rando(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function countDown() {


    console.log("Remaining", startTime)

    if (balls === 24) {
        statsContent.textContent = "Less than 1 minute remaining!";
        titleEl.textContent = "Less than 1 minute remaining!"
    }

    if (startTime === 0) {
        clearInterval(stopDropping);
        gong.play();
        window.alert("Time's up!")
        statsContent.textContent = "All done!";
        titleEl.textContent = "Take a break!"
        timerStarted = false;
        pomodoroComplete = true;
        startButton.textContent = "Start another round?"


    } else {
        statsContent.textContent = (25 - (balls + 1)) + " minutes remaining!";
        // startTime = startTime - 60000; -----> real time!
        startTime = startTime - 60000;
        console.log(startTime);
        ballDrop = true;
        balls++;
    }
}

function makeTheThingsDance() {

    var bodyArray = [];

    // module aliases
    var Engine = Matter.Engine,
        Render = Matter.Render,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Events = Matter.Events;


    var engine = Engine.create(document.getElementById('canvas-container'));

    var render = Render.create({
        element: canvasContainer,
        engine: engine,
        options: {
            width: 800,
            height: 480,
            background: 'transparent',
            showAngleIndicator: false,
            wireframes: false
        }
    });

    Render.run(render);


    // var top = Bodies.rectangle(450, 125, 500, 50, {
    //     isStatic: true,
    //     render: {
    //         fillStyle: 'transparent'
    //     }
    // });



    var sideRight = Bodies.rectangle(700, 300, 50, 400, {
        isStatic: true,
        render: {

            sprite: {
                texture: './img/roWood.png'
            }
        }
    });
    var sideLeft = Bodies.rectangle(60, 300, 50, 400, {
        isStatic: true,
        render: {

            sprite: {
                texture: './img/roWood.png'
            }
        }
    });

    var bottom = Bodies.rectangle(380, 500, 600, 113, {
        isStatic: true,
        render: {

            sprite: {
                texture: './img/wood.png'
            }
        }
    });



    bodyArray.push(bottom, sideLeft, sideRight)


    bottom.restitution = 1.0;
    sideLeft.restitution = 1.0;
    sideRight.restitution = 1.0;


    Events.on(engine, 'beforeUpdate', function () {


        if (ballDrop === true) {

            titleEl.textContent = (25 - balls) + " minutes remaining!";

            const rand = rando(150, 450)

            var timeBall2 = Bodies.circle(rand, 80, 40, {
                render: {
                    sprite: {
                        texture: './img/oaky.png'
                    }
                }

            })


            World.add(engine.world, [timeBall2]);
            waterDrop.play();
            ballDrop = false;
            // balls++
            console.log("Balls dropped", balls)
        }

        // console.log(Bodies)
    });


    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });



    World.add(engine.world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;
    World.add(engine.world, bodyArray)

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);


}

