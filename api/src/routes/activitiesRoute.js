const express = require ('express');
const { getDb}= require (('./function'))

const router = express.Router();


router.get('/activity', async (req, res) => {
    const { name } = req.query
    try {
      if (name) {
       let act = await Activities.findAll({
          where: {
            name: name
          },
          include: Country,
        });
  
        act.length
          ? res.status(200).send(act)
          : res.status(404).send("Cannot find any activity");
      } else {
        act = await Activities.findAll({
          include: Country,
        });
        res.status(201).send(act);
      }
    } catch (e) {
      console.log(e);
    }
  });

  router.post('/activity', async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body
    console.log(name, difficulty, duration, season, countries)
    //console.log(req.body)
   
    try {
      
      let [act, created] = await Activities.findOrCreate({
        //created es un valor booleano y si se creó correctamente muestra verdadero o falso en la consola.
        where: {
          name,
          difficulty,
          duration,
          season
        }
      })
      if (countries) {
        let actCreated = await Country.findAll({ where: { name: countries } })
        await act.addCountry(actCreated)
      }
      // esperar act.setCountries(actividad.países)
      return res.status(200).send('Table and activity created successfully')
    } catch (e) {
      console.log(e)
    }
  })
    
   module.exports= router;  