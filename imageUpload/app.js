import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';
const app = express();
import dotenv from 'dotenv';
dotenv.config()
const port = process.env.PORT || 1221;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname+'/public'));
app.set('view engine','ejs');

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'uploads')
    },
    filename:(req,file,cb) => {
        cb(null, Date.now()+'-'+file.originalname)
    }
})

const upload = multer({storage:storage})

app.get('/',(req,res) => {
    res.render('index')
})

app.post('/upload',upload.single('file'),(req,res) => {
    res.json({message:'File Uploaded'})
})

app.listen(port,(err) => {
    console.log(`Running on port ${port}`)
})