import { Request, Response } from "express";
import axios from 'axios'

class Controller{
  public async handle(request: Request, response: Response){

    let formattedData = {}

    const { data } = await axios.get('https://api.coinstats.app/public/v1/coins?skip=0&limit=10&currency=USD')
    
    data.coins.forEach((coin: any, index: number) => {
      let newObj = Object.assign(formattedData, { [index + 1] : {
        rank: coin.rank,
        name: coin.name,
        icon: coin.icon,
        price: coin.price.toFixed(2),
        priceChange1h: {
          value: coin.priceChange1h < 0.00 ? coin.priceChange1h.toFixed(2) : '+' + coin.priceChange1h.toFixed(2),
          color: coin.priceChange1h < 0.00 ? 'rgb(210, 16, 16)' : 'rgb(79, 201, 106)'
        },
        priceChange1d: {
          value: coin.priceChange1d < 0.00 ? coin.priceChange1d.toFixed(2) : '+' + coin.priceChange1d.toFixed(2),
          color: coin.priceChange1d < 0.00 ? 'rgb(210, 16, 16)' : 'rgb(79, 201, 106)'
        },
        priceChange1w: {
          value: coin.priceChange1w < 0.00 ? coin.priceChange1w.toFixed(2) : '+' + coin.priceChange1w.toFixed(2),
          color: coin.priceChange1w < 0.00 ? 'rgb(210, 16, 16)' : 'rgb(79, 201, 106)'
        },
      }})
      formattedData = newObj
    })

    return response.render('main', {layout: 'main', data: formattedData});
  }
}

export default new Controller();