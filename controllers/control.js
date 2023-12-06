const path = require('path');
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const { exec } = require('child_process');

router.use(express.json())
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/add', (req, res) => {
    const blockMeshDict = req.body.blockMeshDict;
    const U = req.body.U;

    console.log('Получено значение 1 из формы:', blockMeshDict);

    console.log('Получено значение 2 из формы:', U);

    // Сохраняем файл blockMeshDict
    fs.writeFile(__dirname + "/../KURSACH_2/system/blockMeshDict", blockMeshDict, (err) => {
        if (err) throw err;
        console.log('Значение 1 успешно сохранено в файле');
    });

    // Сохраняем файл U
    fs.writeFile(__dirname + "/../KURSACH_2/0/U", U, (err) => {
        if (err) throw err;
        console.log('Значение 2 успешно сохранено в файле');
    });

    const pathToCleanScript = __dirname + "/../KURSACH_2/PROCESS.sh";


    //запуск исполнительного файла
    exec(`sh ${ pathToCleanScript }`, (error, stdout, stderr) => {
        if (error) {
            console.error(exec `error: ${ error }`);
            return;
        }
        console.log(`stdout: ${ stdout }`);
        console.error(`stderr: ${ stderr }`);
    });

    res.json({ message: 'Данные успешно обработаны' });

});


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