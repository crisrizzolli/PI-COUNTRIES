const express = require ('express');
const { getApiInfo, getName, getId }= require('./function');
const {Country, Activity}= require ('../db');
const sequelize= require ('sequelize');
const {Op}= require ('sequelize');


const router = express.Router();

router.get("/", async(req,res)=> {
  // try{
  //   let {name} = req.query;
  //   let countriesTotal = await getApiInfo();
  //   if(name){
  //       let countryName = countriesTotal.map((e)=>{
  //           e.name.toLowerCase().includes(name.toLowerCase())
  //       });
  //       countryName.length
  //       ? res.status(200).send(countryName) 
  //       : res.status(404).send('Country not found');
  //       }
  //      else{
  //          res.status(200).send(countriesTotal)
  //      } }
  //      catch(e){
  //        console.log(e)
  //      }
  try {
    let {name} = req.query;
    let countriesTotal = await getApiInfo();
    if(name){
      let countryData = await Country.findAll({
        where: sequelize.where(sequelize.fn('unaccent', sequelize.col('country.name')),
        {
          [Op.iLike]:
          name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase() + "%",
        }
        ),
        include: [{model: Activity}]


      }) 
      (countryData.length !== 0)
      ?res.status(200).send(countryData)
      :res.status(404).send('country not found')
      
    }else{
               res.status(200).send(countriesTotal)
           } 
  }
  catch(e){
    console.log(e)
  }
});

router.get('/:name', async(req, res)=> {
  let {name} = req.params
  let nameData= await getName(name)
  res.status(200).send(nameData)
  
})


router.get("/id/:id", async (req, res) => {
    let { id } = req.params;
    let countriesTotal= await getId(id);
    res.status(200).send(countriesTotal)
});



router.post(
    '/countries/:countryId/activity/:activityId',
    async (req, res, next) => {
      try {
        const { countryId, activityId } = req.params
        const country = await Country.findByPk(countryId)
        await country.addActivities(activityId)
  
        res.status(201).send('Successful relation')
      } catch (error) {
        next(error)
      }
    }
  )

  module.exports= router;