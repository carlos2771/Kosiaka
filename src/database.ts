import mongoose from "mongoose"
import config from "./config/config"

mongoose.connect(config.DB.URI)
  .then(()=> console.log('connection db success 👽👽')) 
  .catch(e => console.log('error de conexión', e))
