import { Request, Response } from "express";
const fs = require('fs');
import { generateData, generateTableImage } from "../functions/getData";

class Controller {  
  public async handle(request: Request, response: Response){

    const data = await generateData()

    await generateTableImage(data);

    return response.render('main', {layout: 'main', data});
  }



}

export default new Controller();