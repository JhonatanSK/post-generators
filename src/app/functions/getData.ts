import axios from "axios"
import fs from 'fs';
import { promisify } from 'util';
import handlebars from 'handlebars';
import { createCanvas, loadImage, Canvas } from 'canvas';
import htmlToImage from 'html-to-image';

export const generateData = async () => {
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
  return formattedData
}

function imageToBuffer(image: Canvas): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    image.createPNGStream()
      .on('data', (chunk: Uint8Array) => chunks.push(chunk))
      .on('end', () => resolve(Buffer.concat(chunks)))
      .on('error', (error: Error) => reject(error));
  });
}

export const generateTableImage = async (data: any) => {
  const path = "/home/jhonatan/www/jhonatan/post-generators/src/templates/layouts/main.handlebars"
  const readFileAsync = promisify(fs.readFile);
  const writeFileAsync = promisify(fs.writeFile);

  const templateSource = await readFileAsync(path, 'utf8');
  const template = handlebars.compile(templateSource);

  const fullHTML = template({ tableData: data });

  const canvas = createCanvas(800, 600);
  const ctx = canvas.getContext('2d');

  const image = await htmlToImage.toCanvas(fullHTML, {});
  const buffer = await imageToBuffer(image);

  await writeFileAsync('crypto_table.png', buffer);
  console.log('Imagem da tabela gerada com sucesso!');
}