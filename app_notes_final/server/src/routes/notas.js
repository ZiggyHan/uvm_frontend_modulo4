import { Router } from "express";
import Nota from '../model/notas.js';

//Routes
const router = Router();

//Solicitudes de tipo GET
router.get('/notas', async(req, rest)=>{
    const notas = await Nota.find();
    rest.send(notas)
})

router.post('/notas', async(req, res)=> {
    const nota = new Nota({
        title: req.body.title,
        content: req.body.content
    })
    await nota.save()
    res.send(nota)
})

router.get('/notas/:id', async(req, res)=> {
    const nota = await Nota.findOne({_id: req.params.id,})
    res.send(nota)
})

router.patch('/notas/:id', async(req, res) =>{
    try{
        const nota = await Nota.findOne({_id: req.params.id,})
        if(req.body.title){
            nota.title = req.body.title
        }
        if(req.body.content){
            nota.content = req.body.content
        }

        nota.save()
        res.send(nota)
    }catch{
        res.send('La nota no esta registrada')
    }
})

router.delete('/notas/:id', async(req, res) =>{
    try{
        const nota = await Nota.deleteOne({_id: req.params.id,})
        res.send(nota)
    }catch{
        res.send('La nota no esta registrada')
    }
})

export default router;