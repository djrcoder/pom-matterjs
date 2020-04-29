
let startTime = 1000
let ballDrop = false;
var stopDropping;

function startTheTimer() {
    console.log("Started")

    makeTheThingsDance()

    // stopDropping

    stopDropping = setInterval(function () {
        countDown()
    }, 10000)

}



function countDown() {

    if (startTime === 0) {
        clearInterval(stopDropping);
        window.alert("Time's up!")
    } else {

        startTime = startTime - 50;
        console.log(startTime);
        ballDrop = true;
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
        Common = Matter.Common,
        Axes = Matter.Axes,
        Composites = Matter.Composites,
        Events = Matter.Events;

    // create an engine
    var engine = Engine.create(document.getElementById('canvas-container'));

    // create a renderer
    // var render = Render.create({
    //     element: document.body,
    //     engine: engine
    // });




    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 800,
            background: 'transparent',
            showAngleIndicator: false,
            wireframes: false
        }
    });

    Render.run(render);

    // var topH = Bodies.rectangle(400, 0, 800, 50, {
    //     isStatic: true,
    //     // render: {
    //     //     fillStyle: 'transparent'
    //     // }
    // });
    var top = Bodies.rectangle(450, 20, 500, 50, {
        isStatic: true,
        // render: {

        //     sprite: {
        //         texture: './img/pot2.png'
        //     }
        // }
    });



    var sideRight = Bodies.rectangle(700, 300, 50, 600, {
        isStatic: true,
        // render: {
        //     fillStyle: 'transparent'
        // }
    });
    var sideLeft = Bodies.rectangle(60, 300, 50, 600, {
        isStatic: true,
        // render: {
        //     fillStyle: 'transparent'
        // }
    });

    var bottom = Bodies.rectangle(380, 600, 690, 50, {
        isStatic: true,
        // render: {

        //     sprite: {
        //         texture: './img/pot2.png'
        //     }
        // }
    });


    // x, y, radius

    var timeBall = Bodies.circle(150, 0, 30, {

    })




    bodyArray.push(sideLeft, sideRight, top, bottom)

    // for (const item of responseArray) {

    //     const rand = randomNum(0, 600)
    //     foodArray.push(Bodies.rectangle(rand, 100, 80, 80, {
    //         render: {
    //             sprite: {
    //                 texture: item
    //             }
    //         },
    //         angle: 90
    //     }
    //     ));
    // }


    // foodArray.push(bottom)



    timeBall.restitution = 1.0;
    bottom.restitution = 1.0;
    // topH.restitution = 1.0;
    sideLeft.restitution = 1.0;
    sideRight.restitution = 1.0;






    // setInterval(function () {
    //     World.add(engine.world, [timeBall2]);
    // }, 2000)




    Events.on(engine, 'afterUpdate', function () {



        while (ballDrop === true) {
            var timeBall2 = Bodies.circle(150, 80, 60, {

            })

            // World.add(engine.world, timeBall2);

            World.add(engine.world, [timeBall2]);
            ballDrop = false;
        }








    });


    // add mouse control
    // var mouse = Mouse.create(render.canvas),
    //     mouseConstraint = MouseConstraint.create(engine, {
    //         mouse: mouse,
    //         constraint: {
    //             stiffness: 0.2,
    //             render: {
    //                 visible: false
    //             }
    //         }
    //     });

    // World.add(engine.world, mouseConstraint);

    // // keep the mouse in sync with rendering
    // render.mouse = mouse;



    World.add(engine.world, bodyArray)



    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);
}

