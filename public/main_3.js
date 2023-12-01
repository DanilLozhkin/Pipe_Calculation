const canvas = document.getElementById("canvas");
const engine = new BABYLON.Engine(canvas, true);
let scene;


let s_h = 0.996195;
let s_w = 0.0871557;

let pointStrings = `(${0} ${0} ${0}) //${0}\n`;;
let count = 0;

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

    // Создание сцены
    const newScene = new BABYLON.Scene(engine);
    scene = newScene; // Присваиваем созданную сцену переменной scene

    // Создание камеры
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 10, BABYLON.Vector3.Zero(), scene);
    camera.target = new BABYLON.Vector3(0, 3, 0);

    camera.attachControl(canvas, true);

    // Создание текста для каждой точки
    const points = [

        new BABYLON.Vector3(0, 0, 0),
        new BABYLON.Vector3(l1 - (l1 - (l_21+l_22+(Math.sqrt(2) * d) / 4))/2, 0, 0),
        new BABYLON.Vector3(l1, 0, 0),
        new BABYLON.Vector3(l1 + l2, 0, 0),
        new BABYLON.Vector3(l1 + l2, s_h * D2 / 2, s_w * D2 / 2),
        new BABYLON.Vector3(l1 + l2, s_h * D2 / 2, -s_w * D2 / 2),
        new BABYLON.Vector3(l1, s_h * D2 / 2, -s_w * D2 / 2),
        new BABYLON.Vector3(l1, s_h * D2 / 2, s_w * D2 / 2),

        new BABYLON.Vector3(l_21+l_22/2, s_h * (((l_21+l_22/2)*((D2-D1)/2)/l1)+D1/2), -s_w * (((l_21+l_22/2)*((D2-D1)/2)/l1)+D1/2)),
        new BABYLON.Vector3(l_21+l_22/2, s_h * (((l_21+l_22/2)*((D2-D1)/2)/l1)+D1/2), s_w * (((l_21+l_22/2)*((D2-D1)/2)/l1)+D1/2)),

        new BABYLON.Vector3(0, s_h * D1 / 2, -s_w * D1 / 2),
        new BABYLON.Vector3(0, s_h * D1 / 2, s_w * D1 / 2),

        

        new BABYLON.Vector3(l_21 - (Math.sqrt(2) * d) / 4, (h1 + h2 - (Math.sqrt(2) * d) / 4) * s_h, (h1 + h2 - (Math.sqrt(2) * d) / 4) * s_w),
        new BABYLON.Vector3(l_21 - (Math.sqrt(2) * d) / 4, (h1 + h2 - (Math.sqrt(2) * d) / 4) * s_h, -(h1 + h2 - (Math.sqrt(2) * d) / 4) * s_w),

        new BABYLON.Vector3(l_21 + (Math.sqrt(2) * d) / 4, (h1 + h2 - (Math.sqrt(2) * d) / 4) * s_h, (h1 + h2 - (Math.sqrt(2) * d) / 4) * s_w),
        new BABYLON.Vector3(l_21 + (Math.sqrt(2) * d) / 4, (h1 + h2 - (Math.sqrt(2) * d) / 4) * s_h, -(h1 + h2 - (Math.sqrt(2) * d) / 4) * s_w),

        new BABYLON.Vector3(l_21 - (Math.sqrt(2) * d) / 4, (h1 + h2 + (Math.sqrt(2) * d) / 4) * s_h, (h1 + h2 + (Math.sqrt(2) * d) / 4) * s_w),
        new BABYLON.Vector3(l_21 - (Math.sqrt(2) * d) / 4, (h1 + h2 + (Math.sqrt(2) * d) / 4) * s_h, -(h1 + h2 + (Math.sqrt(2) * d) / 4) * s_w),

        new BABYLON.Vector3(l_21 + (Math.sqrt(2) * d) / 4, (h1 + h2 + (Math.sqrt(2) * d) / 4) * s_h, (h1 + h2 + (Math.sqrt(2) * d) / 4) * s_w),
        new BABYLON.Vector3(l_21 + (Math.sqrt(2) * d) / 4, (h1 + h2 + (Math.sqrt(2) * d) / 4) * s_h, -(h1 + h2 + (Math.sqrt(2) * d) / 4) * s_w),



        new BABYLON.Vector3(l_21 + l_22 - (Math.sqrt(2) * d) / 4, (h1 - (Math.sqrt(2) * d) / 4) * s_h, (h1 - (Math.sqrt(2) * d) / 4) * s_w),
        new BABYLON.Vector3(l_21 + l_22 - (Math.sqrt(2) * d) / 4, (h1 - (Math.sqrt(2) * d) / 4) * s_h, -(h1 - (Math.sqrt(2) * d) / 4) * s_w),

        new BABYLON.Vector3(l_21 + l_22 + (Math.sqrt(2) * d) / 4, (h1 - (Math.sqrt(2) * d) / 4) * s_h, (h1 - (Math.sqrt(2) * d) / 4) * s_w),
        new BABYLON.Vector3(l_21 + l_22 + (Math.sqrt(2) * d) / 4, (h1 - (Math.sqrt(2) * d) / 4) * s_h, -(h1 - (Math.sqrt(2) * d) / 4) * s_w),

        new BABYLON.Vector3(l_21 + l_22 - (Math.sqrt(2) * d) / 4, (h1 + (Math.sqrt(2) * d) / 4) * s_h, (h1 + (Math.sqrt(2) * d) / 4) * s_w),
        new BABYLON.Vector3(l_21 + l_22 - (Math.sqrt(2) * d) / 4, (h1 + (Math.sqrt(2) * d) / 4) * s_h, -(h1 + (Math.sqrt(2) * d) / 4) * s_w),

        new BABYLON.Vector3(l_21 + l_22 + (Math.sqrt(2) * d) / 4, (h1 + (Math.sqrt(2) * d) / 4) * s_h, (h1 + (Math.sqrt(2) * d) / 4) * s_w),
        new BABYLON.Vector3(l_21 + l_22 + (Math.sqrt(2) * d) / 4, (h1 + (Math.sqrt(2) * d) / 4) * s_h, -(h1 + (Math.sqrt(2) * d) / 4) * s_w),
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
    for (var i = 0; i <= 11; i++) {
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
        new BABYLON.Vector3(l_21, (h1 + h2 - d/2) * s_h, -((h1 + h2 - d/2) * s_w)),    // 0
        new BABYLON.Vector3(l_21, (h1 + h2 - d/2) * s_h, ((h1 + h2 - d/2) * s_w)),     // 1
        
        new BABYLON.Vector3(l_21 + l_22, (h1 - d/2) * s_h, -(h1 - d/2) * s_w),           // 2
        new BABYLON.Vector3(l_21 + l_22, (h1 - d/2) * s_h, (h1 - d/2) * s_w),            // 3
        
        new BABYLON.Vector3(l_21, (h1 + h2 + d/2) * s_h, -((h1 + h2 + d/2) * s_w)),    // 4
        new BABYLON.Vector3(l_21, (h1 + h2 + d/2) * s_h, ((h1 + h2 + d/2) * s_w)),     // 5
        
        new BABYLON.Vector3(l_21 + l_22, (h1 + d/2) * s_h, -(h1 + d/2) * s_w),           // 6
        new BABYLON.Vector3(l_21 + l_22, (h1 + d/2) * s_h, (h1 + d/2) * s_w),            // 7
        
        new BABYLON.Vector3(l_21 - d/2, (h1 + h2) * s_h, -((h1 + h2) * s_w)),           // 8
        new BABYLON.Vector3(l_21 - d/2, (h1 + h2) * s_h, ((h1 + h2) * s_w)),            // 9
        
        new BABYLON.Vector3(l_21 + l_22 - d/2, h1 * s_h, -h1 * s_w),                     // 10
        new BABYLON.Vector3(l_21 + l_22 - d/2, h1 * s_h, h1 * s_w),                      // 11
        
        new BABYLON.Vector3(l_21 + d/2, (h1 + h2) * s_h, -((h1 + h2) * s_w)),           // 12
        new BABYLON.Vector3(l_21 + d/2, (h1 + h2) * s_h, ((h1 + h2) * s_w)),            // 13
        
        new BABYLON.Vector3(l_21 + l_22 + d/2, h1 * s_h, -h1 * s_w),                     // 14
        new BABYLON.Vector3(l_21 + l_22 + d/2, h1 * s_h, h1 * s_w)                       // 15

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

    var points_1 = new BABYLON.Vector3(l_21, (h1 + h2 - d/2)  * s_h, -((h1 + h2- d/2) * s_w));



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
        hex (0 12 14 13 15 20 21) (30 1 30) simpleGrading (1 1 1)//bottom_1
        hex (0 20 21 22 23 1) (30 1 30) simpleGrading (1 1 1)//bottom_2
        hex (26 27 22 23 1 2) (30 1 30) simpleGrading (1 1 1)//bottom_3

        hex (10 11 0 12 13 16 17) (30 1 30) simpleGrading (1 1 1)//left

        hex (10 11 9 8 16 17 18 19) (30 1 30) simpleGrading (1 1 1)//top_1
        hex (18 19 9 8 24 25 26 27) (30 1 30) simpleGrading (1 1 1)//top_2
        hex (9 8 26 27 2 7 6) (30 1 30) simpleGrading (1 1 1)//top_3

        hex (26 27 2 7 6) (30 1 30) simpleGrading (1 1 1)//right

        // right block
        hex (7 6 2 3 4 5) (200 1 30) simpleGrading (1 1 1)
    );
    edges
    (
        arc 13 15 (${tube[0].x} ${tube[0].y} ${tube[0].z})
        arc 12 14 (${tube[1].x} ${tube[1].y} ${tube[1].z})
        arc 21 23 (${tube[2].x} ${tube[2].y} ${tube[2].z})
        arc 20 22 (${tube[3].x} ${tube[3].y} ${tube[3].z})

        arc 17 19 (${tube[4].x} ${tube[4].y} ${tube[4].z})
        arc 16 18 (${tube[5].x} ${tube[5].y} ${tube[5].z})
        arc 25 27 (${tube[6].x} ${tube[6].y} ${tube[6].z})
        arc 24 26 (${tube[7].x} ${tube[7].y} ${tube[7].z})
        arc 13 17 (${tube[8].x} ${tube[8].y} ${tube[8].z})
        arc 12 16 (${tube[9].x} ${tube[9].y} ${tube[9].z})
        arc 21 25 (${tube[10].x} ${tube[10].y} ${tube[10].z})
        arc 20 24 (${tube[11].x} ${tube[11].y} ${tube[11].z})
        arc 15 19 (${tube[12].x} ${tube[12].y} ${tube[12].z})
        arc 14 18 (${tube[13].x} ${tube[13].y} ${tube[13].z})
        arc 23 27 (${tube[14].x} ${tube[14].y} ${tube[14].z})
        arc 22 26 (${tube[15].x} ${tube[15].y} ${tube[15].z})
    );
    boundary
    (
        inlet
        {
            type patch;
            faces
            (
                (0 11 10)
            );
        }
        outlet
        {
            type patch;
            faces
            (
                (3 4 5)
            );
        }
        wall
        {
            type wall;
            faces
            (
                (11 10 9 8)
                (9 8 7 6)
                (7 6 4 5)
     
            );
        }
        cylinder
        {
            type wall;
            faces
            (
                (12 13 14 15)
                (14 15 18 19)
                (16 17 18 19)
                (16 17 12 13)

                (24 25 20 21)
                (20 22 23 21)
                (22 23 26 27)
                (24 25 26 27)
            );
        }
        frontAndBack
        {
            type empty;
            faces
            (
                (10 17 13 0)
                (0 11 16 17)
                (11 16 18 9)
                (10 17 19 8)
                (8 19 25 27)
                (9 18 24 26)
                (8 27 2 6)
                (9 26 2 7)
                (27 23 1 2)
                (26 22 1 2)
                (0 13 15 21)
                (0 12 14 20)
                (0 21 23 1)
                (0 20 22 1)
                (2 6 5 3)
                (7 2 4 3)
            );
        }
    );`;

    let Good = document.getElementById('Good');
    let exportLines = EXPORT.split('\n');
    Good.innerHTML = exportLines.map(line => line.trim()).join('<br>');


    // Запускаем рендеринг сцены
    engine.runRenderLoop(function () {
        scene.render();
    });
};

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



