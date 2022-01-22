/**
 * яхта поднять паруса https://tlgrm.ru/_/stickers/499/b74/499b747f-ad76-3085-8b4f-401620753ae9/29.webp
 * улыбающийся пират https://tlgrm.ru/_/stickers/1d4/336/1d433610-907e-31e1-bcd1-bb87fb42375f/12.webp
 * пират https://tlgrm.ru/_/stickers/1d4/336/1d433610-907e-31e1-bcd1-bb87fb42375f/4.webp
 * пират смотрит в трубу https://tlgrm.ru/_/stickers/1d4/336/1d433610-907e-31e1-bcd1-bb87fb42375f/11.webp
 * я свободен https://tlgrm.ru/_/stickers/499/b74/499b747f-ad76-3085-8b4f-401620753ae9/33.webp
 * попутного ветра в спину https://tlgrm.ru/_/stickers/499/b74/499b747f-ad76-3085-8b4f-401620753ae9/30.webp
 * в пустят https://tlgrm.ru/_/stickers/499/b74/499b747f-ad76-3085-8b4f-401620753ae9/27.webp
 * https://tlgrm.ru/_/stickers/499/b74/499b747f-ad76-3085-8b4f-401620753ae9/28.webp
 * до рассвета https://tlgrm.ru/_/stickers/499/b74/499b747f-ad76-3085-8b4f-401620753ae9/23.webp
 *
 */

const arr = [
   'https://tlgrm.ru/_/stickers/1d4/336/1d433610-907e-31e1-bcd1-bb87fb42375f/2.webp',
   'https://tlgrm.ru/_/stickers/499/b74/499b747f-ad76-3085-8b4f-401620753ae9/29.webp',
   'https://tlgrm.ru/_/stickers/1d4/336/1d433610-907e-31e1-bcd1-bb87fb42375f/12.webp',
   'https://tlgrm.ru/_/stickers/1d4/336/1d433610-907e-31e1-bcd1-bb87fb42375f/4.webp',
   'https://tlgrm.ru/_/stickers/1d4/336/1d433610-907e-31e1-bcd1-bb87fb42375f/11.webp',
   'https://tlgrm.ru/_/stickers/499/b74/499b747f-ad76-3085-8b4f-401620753ae9/33.webp',
   'https://tlgrm.ru/_/stickers/499/b74/499b747f-ad76-3085-8b4f-401620753ae9/30.webp',
   'https://tlgrm.ru/_/stickers/499/b74/499b747f-ad76-3085-8b4f-401620753ae9/27.webp',
   'https://tlgrm.ru/_/stickers/499/b74/499b747f-ad76-3085-8b4f-401620753ae9/28.webp',
   'https://tlgrm.ru/_/stickers/499/b74/499b747f-ad76-3085-8b4f-401620753ae9/23.webp',
]

const res = () => {
   const max = arr.length
   const rand = Math.floor(Math.random() * max)
   return arr[rand]
}

module.exports = res
