const path = require('path');
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
//const { exec } = require('child_process');

const { exec, spawn } = require('child_process');
const { error } = require('console');
let controller = new AbortController();
let { signal } = controller;

let spawnPROCESS = null;
let ls = null;

router.use(express.json())
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/add', async (req, res) => {
    const blockMeshDict = req.body.blockMeshDict;
    const U = req.body.U;

    console.log('Получено значение 1 из формы:', blockMeshDict);

    console.log('Получено значение 2 из формы:', U);

    // Сохраняем файл blockMeshDict
    fs.writeFile(__dirname + "/../KURSACH_2/system/blockMeshDict", blockMeshDict, (err) => {
        if (err) {
            console.error('Ошибка при сохранении blockMeshDict:', err);
            return res.status(500).json({ error: 'Ошибка при сохранении blockMeshDict' });
        }
        console.log('Значение 1 успешно сохранено в файле');
    });


    // Сохраняем файл U
    fs.writeFile(__dirname + "/../KURSACH_2/0/U", U, (err) => {
        if (err) {
            console.error('Ошибка при сохранении blockMeshDict:', err);
            return res.status(500).json({ error: 'Ошибка при сохранении blockMeshDict' });
        }
        console.log('Значение 2 успешно сохранено в файле');
    });

    //res.json({ message: 'Данные успешно обработаны' });


    try {
        //await PROCESS();
        await StartParaView();
        res.send('успешно');
    } catch {
        res.send("Не успешно")
    }


});

async function PROCESS() {
    return new Promise((resolve, reject) => {
        //spawnPROCESS = spawn("sh " + __dirname + "/../KURSACH_2/PROCESS.sh " + __dirname + "/../KURSACH_2/system/controlDict", [], {shell: true, signal});
        spawnPROCESS = spawn("sh /home/admin1/универ/гидро-термо-динамика/курсач/репозиторий/KURSACH_2/PROCESS.sh", [], { shell: true, signal });

        spawnPROCESS.stdout.on("data", (data) => {
            console.log(`stdout: ${data}`);
        });

        spawnPROCESS.stderr.on("data", (data) => {
            console.log(`stderr: ${data}`);
            
            console.error('Ошибка во время расчета');
        });

        spawnPROCESS.on("error", (error) => {
            cleaned = "Не удалось отчистить файл от предыдущего решения.";
            console.error(`Ошибка в дочернем процессе: ${error.message}`);
        });

        spawnPROCESS.on("spawn", () => {
            cleaned = "удалось отчистить файл от предыдущего решения и создать новое.";
            console.log(`cleaned`);
        });


        spawnPROCESS.on("close", (code) => {
            console.log(code);
            resolve();
        });
    });
}

async function StartParaView() {
    return new Promise((resolve, reject) => {
    ls = spawn("sh /home/admin1/универ/гидро-термо-динамика/курсач/репозиторий/KURSACH_2/; paraFoam;", [], {shell:true, signal });
   

    ls.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
        //document.getElementById("inputField").value = "Y";
    });

    ls.stderr.on("data", (data) => {
        console.log(`stderr: ${data}`);
     
    });

    ls.on("error", (error) => {
        console.error(`Ошибка в дочернем процессе: ${error.message}`);
    });

    ls.on("spawn", () => {
        console.log(`cleaned`);
    });


    ls.on("close", (code) => {
        console.log(code);
        
        resolve();
    });
    });
}

router.get('/babylon.js.map', (req, res) => {
    try {
        const filePath = path.join(__dirname, '../public/babylon.js');
        res.sendFile(filePath);
    } catch (error) {
        next(new Error('Ошибка при отправке файла babylon.js.map: ' + error.message));
    }
});


router.get('/babylon.gui.min.js.map', (req, res) => {
    try {
        const filePath = path.join(__dirname, '../public/babylon.gui.min.js');
        res.sendFile(filePath);
    } catch (error) {
        next(new Error('Ошибка при отправке файла babylon.gui.min.js.map: ' + error.message));
    }
});




module.exports = router;