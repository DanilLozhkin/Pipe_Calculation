const canvas = document.getElementById("canvas");
const engine = new BABYLON.Engine(canvas, true);
let scene;


let W = 0.25;

let pointStrings = `(${0} ${0} ${0.25}) //${0}\n`;;

const createScene = function () {

    const form = document.getElementById("form");
    D1 = parseFloat(form.elements.D1.value);
    D2 = parseFloat(form.elements.D2.value);
    l1 = parseFloat(form.elements.l1.value);
    l2 = parseFloat(form.elements.l2.value);
    d = parseFloat(form.elements.d.value);
    h1 = parseFloat(form.elements.h1.value);
    h2 = parseFloat(form.elements.h2.value);
    l_21 = parseFloat(form.elements.l_21.value);
    l_22 = parseFloat(form.elements.l_22.value);

    let count = 0;


    // Создание сцены
    const newScene = new BABYLON.Scene(engine);
    scene = newScene; // Присваиваем созданную сцену переменной scene

    // Создание камеры
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 10, BABYLON.Vector3.Zero(), scene);
    camera.target = new BABYLON.Vector3(0, 3, 0);

    camera.attachControl(canvas, true);

    // Создание текста для каждой точки
    const points = [

        new BABYLON.Vector3(0, 0, W),
        new BABYLON.Vector3(0, 0, -W),
        new BABYLON.Vector3(l_21 + l_22 / 2, 0, W),
        new BABYLON.Vector3(l_21 + l_22 / 2, 0, -W),

        new BABYLON.Vector3((l_21 + l_22) + l_22 / 2, 0, W),
        new BABYLON.Vector3((l_21 + l_22) + l_22 / 2, 0, -W),

        new BABYLON.Vector3(l1, 0, W),
        new BABYLON.Vector3(l1, 0, -W),
        new BABYLON.Vector3(l1 + l2, 0, W),
        new BABYLON.Vector3(l1 + l2, 0, -W),

        new BABYLON.Vector3(l1 + l2, D2 / 2, W),
        new BABYLON.Vector3(l1 + l2, D2 / 2, -W),
        new BABYLON.Vector3(l1, D2 / 2, -W),
        new BABYLON.Vector3(l1, D2 / 2, W),

        new BABYLON.Vector3((l_21 + l_22) + l_22 / 2, ((((l_21 + l_22) + l_22 / 2) * ((D2 - D1) / 2) / l1) + D1 / 2), -W),
        new BABYLON.Vector3((l_21 + l_22) + l_22 / 2, ((((l_21 + l_22) + l_22 / 2) * ((D2 - D1) / 2) / l1) + D1 / 2), W),

        new BABYLON.Vector3(l_21 + l_22 / 2, (((l_21 + l_22 / 2) * ((D2 - D1) / 2) / l1) + D1 / 2), -W),
        new BABYLON.Vector3(l_21 + l_22 / 2, (((l_21 + l_22 / 2) * ((D2 - D1) / 2) / l1) + D1 / 2), W),


        new BABYLON.Vector3(0, D1 / 2, -W),
        new BABYLON.Vector3(0, D1 / 2, W),



        new BABYLON.Vector3(l_21 - (Math.sqrt(2) * d) / 4, (h1 + h2 - (Math.sqrt(2) * d) / 4), W),
        new BABYLON.Vector3(l_21 - (Math.sqrt(2) * d) / 4, (h1 + h2 - (Math.sqrt(2) * d) / 4), -W),

        new BABYLON.Vector3(l_21 + (Math.sqrt(2) * d) / 4, (h1 + h2 - (Math.sqrt(2) * d) / 4), W),
        new BABYLON.Vector3(l_21 + (Math.sqrt(2) * d) / 4, (h1 + h2 - (Math.sqrt(2) * d) / 4), -W),

        new BABYLON.Vector3(l_21 - (Math.sqrt(2) * d) / 4, (h1 + h2 + (Math.sqrt(2) * d) / 4), W),
        new BABYLON.Vector3(l_21 - (Math.sqrt(2) * d) / 4, (h1 + h2 + (Math.sqrt(2) * d) / 4), -W),

        new BABYLON.Vector3(l_21 + (Math.sqrt(2) * d) / 4, (h1 + h2 + (Math.sqrt(2) * d) / 4), W),
        new BABYLON.Vector3(l_21 + (Math.sqrt(2) * d) / 4, (h1 + h2 + (Math.sqrt(2) * d) / 4), -W),



        new BABYLON.Vector3(l_21 + l_22 - (Math.sqrt(2) * d) / 4, (h1 - (Math.sqrt(2) * d) / 4), W),
        new BABYLON.Vector3(l_21 + l_22 - (Math.sqrt(2) * d) / 4, (h1 - (Math.sqrt(2) * d) / 4), -W),

        new BABYLON.Vector3(l_21 + l_22 + (Math.sqrt(2) * d) / 4, (h1 - (Math.sqrt(2) * d) / 4), W),
        new BABYLON.Vector3(l_21 + l_22 + (Math.sqrt(2) * d) / 4, (h1 - (Math.sqrt(2) * d) / 4), -W),

        new BABYLON.Vector3(l_21 + l_22 - (Math.sqrt(2) * d) / 4, (h1 + (Math.sqrt(2) * d) / 4), W),
        new BABYLON.Vector3(l_21 + l_22 - (Math.sqrt(2) * d) / 4, (h1 + (Math.sqrt(2) * d) / 4), -W),

        new BABYLON.Vector3(l_21 + l_22 + (Math.sqrt(2) * d) / 4, (h1 + (Math.sqrt(2) * d) / 4), W),
        new BABYLON.Vector3(l_21 + l_22 + (Math.sqrt(2) * d) / 4, (h1 + (Math.sqrt(2) * d) / 4), -W),
    ];

    // Создание красных сфер для точек
    const redMaterial = new BABYLON.StandardMaterial("redMaterial", scene);
    redMaterial.emissiveColor = new BABYLON.Color3(1, 0, 0);

    points.forEach(point => {
        const redSphere = BABYLON.MeshBuilder.CreateSphere(`red-sphere-${point.x}, ${point.y}, ${point.z}`, { diameter: 0.2 }, scene);
        redSphere.position = point;
        redSphere.material = redMaterial;

    });

    var linePoints = [];
    for (var i = 0; i <= 19; i++) {
        linePoints.push(points[i]);
    }
    var line = BABYLON.MeshBuilder.CreateLines("line", { points: linePoints }, scene);

    // Создание текста для каждой точки
    points.forEach(point => {
        const textMesh = BABYLON.MeshBuilder.CreatePlane(`text-${point.x}, ${point.y}, ${point.z}`, { size: 30 }, scene);
        textMesh.position = new BABYLON.Vector3(point.x, point.y + 0.3, point.z);

        const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(textMesh);
        const textBlock = new BABYLON.GUI.TextBlock();
        //textBlock.text = `${point.x} ${point.y} ${point.z}`;
        textBlock.text = `${count}`;
        textBlock.color = "white";
        textBlock.fontSize = 30;
        textBlock.rotation = - Math.PI / 5;
        advancedTexture.addControl(textBlock);

        if (count > 0) {
            pointStrings += `(${point.x} ${point.y} ${point.z}) //${count}\n`;
        }
        count += 1;
    });

    const tube =
        [
            new BABYLON.Vector3(l_21, (h1 + h2 - d / 2), -W),    // 0
            new BABYLON.Vector3(l_21, (h1 + h2 - d / 2), W),     // 1

            new BABYLON.Vector3(l_21 + l_22, (h1 - d / 2), -W),           // 2
            new BABYLON.Vector3(l_21 + l_22, (h1 - d / 2), W),            // 3

            new BABYLON.Vector3(l_21, (h1 + h2 + d / 2), -W),    // 4
            new BABYLON.Vector3(l_21, (h1 + h2 + d / 2), W),     // 5

            new BABYLON.Vector3(l_21 + l_22, (h1 + d / 2), -W),           // 6
            new BABYLON.Vector3(l_21 + l_22, (h1 + d / 2), W),            // 7

            new BABYLON.Vector3(l_21 - d / 2, (h1 + h2), -W),           // 8
            new BABYLON.Vector3(l_21 - d / 2, (h1 + h2), W),            // 9

            new BABYLON.Vector3(l_21 + l_22 - d / 2, h1, -W),                     // 10
            new BABYLON.Vector3(l_21 + l_22 - d / 2, h1, W),                      // 11

            new BABYLON.Vector3(l_21 + d / 2, (h1 + h2), -W),           // 12
            new BABYLON.Vector3(l_21 + d / 2, (h1 + h2), W),            // 13

            new BABYLON.Vector3(l_21 + l_22 + d / 2, h1, -W),                     // 14
            new BABYLON.Vector3(l_21 + l_22 + d / 2, h1, W)                       // 15

        ]

    const redMaterial_2 = new BABYLON.StandardMaterial("redMaterial_2", scene);
    redMaterial_2.emissiveColor = new BABYLON.Color3(1, 1, 0);

    tube.forEach(point => {
        const redSphere_2 = BABYLON.MeshBuilder.CreateSphere(`tube-sphere-${point.x}, ${point.y}, ${point.z}`, { diameter: 0.1 }, scene);
        redSphere_2.position = point;
        redSphere_2.material = redMaterial_2;

    });
    count = 0;

    tube.forEach(point => {
        const textMesh = BABYLON.MeshBuilder.CreatePlane(`tube-${point.x}, ${point.y}, ${point.z}`, { size: 30 }, scene);
        textMesh.position = new BABYLON.Vector3(point.x, point.y + 0.3, point.z);

        const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(textMesh);
        const textBlock = new BABYLON.GUI.TextBlock();
        //textBlock.text = `${point.x} ${point.y} ${point.z}`;
        textBlock.text = `${count}`;
        textBlock.color = "red";
        textBlock.fontSize = 30;
        textBlock.rotation = - Math.PI / 5;
        advancedTexture.addControl(textBlock);
        count += 1;
    });

    //var points_1 = new BABYLON.Vector3(l_21, (h1 + h2 - d/2)  * , -((h1 + h2- d/2) * s_w));



    // points.forEach(point => {
    //     const textMesh = BABYLON.MeshBuilder.CreatePlane(`text-${point.x}, ${point.y}, ${point.z}`, { size: 6 }, scene);
    //     textMesh.position = new BABYLON.Vector3(point.x, point.y + 0.3, point.z);

    //     const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(textMesh);
    //     const textBlock = new BABYLON.GUI.TextBlock();
    //     //textBlock.text = `${point.x} ${point.y} ${point.z}`;
    //     textBlock.text = `${count}`;
    //     textBlock.color = "white";
    //     textBlock.fontSize = 30;
    //     textBlock.rotation = - Math.PI / 5;
    //     advancedTexture.addControl(textBlock);

    //     if (count > 0) {
    //         pointStrings += `(${point.x} ${point.y} ${point.z}) //${count}\n`;
    //     }
    //     count += 1;
    // });

    let EXPORT = `
    /*--------------------------------*- C++ -*----------------------------------*\
      =========                 |
      \\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox
       \\    /   O peration     | Website:  https://openfoam.org
        \\  /    A nd           | Version:  11
         \\/     M anipulation  |
    \*---------------------------------------------------------------------------*/
    FoamFile
    {
        format      ascii;
        class       dictionary;
        object      blockMeshDict;
    }
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    
    convertToMeters 0.01;
    
    vertices
    (
    ${pointStrings}
    );
    
    blocks
    (
        // cylinder blocks
        hex (0 2 3 1 20 22 23 21) (30 1 30) simpleGrading (1 1 1)//bottom_1
        hex (2 4 5 3 28 30 31 29) (30 1 30) simpleGrading (1 1 1)//bottom_2
        
        hex (0 20 21 1 19 24 25 18) (30 1 30) simpleGrading (1 1 1)//left
        
        hex (22 2 3 23 26 17 16 27) (30 1 30) simpleGrading (1 1 1)//center_1
        hex (2 28 29 3 17 32 33 16) (30 1 30) simpleGrading (1 1 1)//center_2
        hex (30 4 5 31 34 15 14 35) (30 1 30) simpleGrading (1 1 1)//center_3

        hex (24 26 27 25 19 17 16 18) (30 1 30) simpleGrading (1 1 1)//top_1
        hex (32 34 35 33 17 15 14 16) (30 1 30) simpleGrading (1 1 1)//top_2
        
        hex (4 6 7 5 15 13 12 14) (100 1 30) simpleGrading (1 1 1)//right
        
        // right block
        hex (6 8 9 7 13 10 11 12) (90 1 30) simpleGrading (1 1 1)
    );
    edges
    (
        arc 21 23 (${tube[0].x} ${tube[0].y} ${tube[0].z})
        arc 20 22 (${tube[1].x} ${tube[1].y} ${tube[1].z})
        arc 29 31 (${tube[2].x} ${tube[2].y} ${tube[2].z})
        arc 28 30 (${tube[3].x} ${tube[3].y} ${tube[3].z})

        arc 25 27 (${tube[4].x} ${tube[4].y} ${tube[4].z})
        arc 24 26 (${tube[5].x} ${tube[5].y} ${tube[5].z})
        arc 33 35 (${tube[6].x} ${tube[6].y} ${tube[6].z})
        arc 32 34 (${tube[7].x} ${tube[7].y} ${tube[7].z})
        arc 21 25 (${tube[8].x} ${tube[8].y} ${tube[8].z})
        arc 20 24 (${tube[9].x} ${tube[9].y} ${tube[9].z})
        arc 29 33 (${tube[10].x} ${tube[10].y} ${tube[10].z})
        arc 28 32 (${tube[11].x} ${tube[11].y} ${tube[11].z})
        arc 23 27 (${tube[12].x} ${tube[12].y} ${tube[12].z})
        arc 22 26 (${tube[13].x} ${tube[13].y} ${tube[13].z})
        arc 31 35 (${tube[14].x} ${tube[14].y} ${tube[14].z})
        arc 30 34 (${tube[15].x} ${tube[15].y} ${tube[15].z})
    );
    boundary
    (
        inlet
        {
            type patch;
            faces
            (
                (0 19 18 1)
            );
        }
        outlet
        {
            type patch;
            faces
            (
                (8 10 11 9)
            );
        }
        wall
        {
            type wall;
            faces
            (
                (19 17 16 18)
                (17 15 14 16)
                (15 13 12 14)
                (13 10 11 12)

                //(0 2 3 1)
                //(2 4 5 3)
                //(4 6 7 5)
                //(6 8 9 7)
            );
        }
        cylinder_1
        {
            type wall;
            faces
            (
                (20 22 23 21)
                (22 26 27 23)
                (24 26 27 25)
                (20 24 25 21)


            );
            
        }
        cylinder_2
        {
            type wall;
            faces
            (
                (28 30 31 29)
                (30 34 35 31)
                (32 34 35 33)
                (28 32 33 29)
            );
            
        }
        frontAndBack
        {
            type empty;
            faces
            (
            		(1 3 23 21)
                (23 3 16 27)
                (3 29 33 16)
                (3 5 31 29)
                (31 5 14 35)
                (5 7 12 14)
                (7 9 11 12)
                (33 35 16 14)
                (25 27 16 18)
                (1 21 25 18)


                (0 2 22 20)
                (22 2 17 26)
                (2 28 32 17)
                (2 4 30 28)
                (30 4 15 34)
                (4 6 13 15)
                (6 8 10 13)
                (32 34 15 17)
                (24 26 17 19)
                (0 20 24 19)
            );
        }
    );`;

    let Good = document.getElementById('Good');
    let exportLines = EXPORT.split('\n');
    Good.value = exportLines.map(line => line.trim()).join('\n');
    autoExpand(Good); // Вызываем функцию автоматического расширения при загрузке страницы

    // Запускаем рендеринг сцены
    engine.runRenderLoop(function () {
        scene.render(); 
    });
};

function autoExpand(element) {
    element.style.height = 'auto';
    element.style.height = (element.scrollHeight) + 'px';
}

window.addEventListener("resize", function () {
    engine.resize();
});

const form = document.getElementById("form");
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Перезапускаем создание сцены при изменении параметров
    if (scene) {
        scene.dispose();
    }
    createScene();
});



