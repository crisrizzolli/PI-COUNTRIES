const axios = require('axios');
const {Country, Activity, country_activity}= require('../db');

 const url=  `https://restcountries.com/v3/all`;


const getApiInfo = async ()=> {
  try{

    let apiInfoTotal = await axios.get(url);

    const apiData= await apiInfoTotal.data;
    const countryData= apiData.map((data)=> {
        return {
            id: data.cca3,
            name: data.name.common,
            flags: data.flags[1],
            continents: data.continents,
            capital: data.capital || ['No tiene Capital'],
            subregion: data.subregion,
            area: data.area,
            population: data.population,
        }
                
    });
    return countryData; 
     }
     catch(e){
       console.log(e)
     }
}

const getName = async(name)=> {
  try{
let getName = await axios.get(`https://restcountries.com/v3.1/name/${name}`)
const apiData= await getName.data;
const nameData= apiData.map((data)=> {
  return {
      id: data.cca3,
      name: data.name.common,
      flags: data.flags[1],
      continents: data.continents,
      capital: data.capital || ['No tiene Capital'],
      subregion: data.subregion,
      area: data.area,
      population: data.population,
  } 
});
  
return nameData;
} catch(e){
  console.log(e)
}
}
const getId = async(id)=> {
  try{
let getId = await axios.get(`https://restcountries.com/v3.1/alpha/${id}`)
const apiData= await getId.data;
const idData= apiData.map((data)=> {
  return {
      id: data.cca3,
      name: data.name.common,
      flags: data.flags[1],
      continents: data.continents,
      capital: data.capital || ['No tiene Capital'],
      subregion: data.subregion,
      area: data.area,
      population: data.population,
  } 
});
  
return idData;
} catch(e){
  console.log(e)
}
}

const getDb = async () => {
    //db and activity
    return await Country.findAll({
      include: {
        model: Activity,
        attributes: ['name', 'difficulty', 'duration', 'season'],
        through: {
          attributes: []
        }
      }
    })
}
module.exports = {
    getApiInfo,
    getDb,
    getName,
    getId,
}

