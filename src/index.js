import db from './db.js';
import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

app.get('/produto', async(req,resp) => {
    try{
        let r = await
            db.tb_produto.findAll({
                order:[
                    ['id_produto', 'desc']
                ]
            })
        resp.send(r)
    } catch(e){
        resp.send({erro: e.toString()})
    }
})

app.post('/produto', async(req,resp) => {
    try{
        let { produto, categoria, precoDe, precoPor, avaliacao, descricao, estoque, imagem, ativo, inclusao } = req.body;
        if(produto == '' || categoria == '' || precoDe == 0 || precoPor == 0 || avaliacao == 0 || descricao == '' || estoque <= 0 || imagem == ''){
            resp.send({erro: 'Campo não inserido ou caracter invalido'} )}
        
        let s = await db.tb_produto.findOne({ where: { nm_produto: produto} });
        if (s != null){return resp.send({ erro: 'Produto ja Cadastrado' }); }
               

        if(isNaN(Number(avaliacao)) || isNaN(Number(estoque)) || isNaN(Number(precoDe)) || isNaN(Number(precoPor))){
            resp.send({erro: 'Campo não inserido ou caracter invalido'})
        }

        if(Math.sign(precoDe) == Math.sign(-1) || Math.sign(precoPor) == Math.sign(-1) || Math.sign(estoque) == Math.sign(-1) || Math.sign(avaliacao) == Math.sign(-1)){
            resp.send({erro: 'Campo não inserido ou caracter invalido'} )} 
         else{
            let ins = await
            db.tb_produto.create({
                nm_produto: produto,
                ds_categoria: categoria,
                vl_preco_de: precoDe,
                vl_preco_por: precoPor,
                vl_avaliacao: avaliacao,
                ds_produto: descricao,
                qtd_estoque: estoque,
                img_produto: imagem,
                bt_ativo: ativo,
                dt_inclusao: inclusao
            });
            resp.send(ins);
         }
        
    } catch(e){
        resp.send({erro: 'erro'})
    }
})

app.put('/produto/:id', async(req,resp) => {
    try{
        let { produto, categoria, precoDe, precoPor, avaliacao, descricao, estoque, imagem, ativo, inclusao } = req.body;
            let{id} = req.params;
            if(produto == '' || categoria == '' || precoDe == 0 || precoPor == 0 || avaliacao == 0 || descricao == '' || estoque <= 0 || imagem == ''){
                resp.send({erro: 'Campo não inserido ou caracter invalido'} )}
    
            if(isNaN(Number(avaliacao)) || isNaN(Number(estoque)) || isNaN(Number(precoDe)) || isNaN(Number(precoPor))){
                resp.send({erro: 'Campo não inserido ou caracter invalido'})}

            if(Math.sign(chamada) == Math.sign(-1)){
                resp.send({erro: 'Campo não inserido ou caracter invalido'} )} 

             else{
                let up = await db.tb_produto.update(
                    {
                        nm_produto: produto,
                        ds_categoria: categoria,
                        vl_preco_de: precoDe,
                        vl_preco_por: precoPor,
                        vl_avaliacao: avaliacao,
                        ds_produto: descricao,
                        qtd_estoque: estoque,
                        img_produto: imagem,
                        bt_ativo: ativo,
                        dt_inclusao: inclusao
                    },
                    {
                        where:{id_produto: id}
                    }
                )
            resp.sendStatus(200);
            }
    } catch(e){
        resp.send({erro: e.toString()})
    }
})

app.delete('/produto/:id', async(req,resp) => {
    try{
        let{id} = req.params;
        let de = await
            db.tb_produto.destroy(
                {
                    where: {id_produto: id}
                }
            )
        resp.sendStatus(200);
    } catch(e){
        resp.send({erro: e.toString()})
    }
})



app.listen(process.env.PORT,
    x => console.log(`Server up at port ${process.env.PORT}`))