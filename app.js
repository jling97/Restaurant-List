// 載入express、express-handlebars、JSON資料
const express = require('express')
const {engine} = require('express-handlebars')
const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurant.json').results

// 設定樣板引擎
app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

// 網站首頁直接導向餐廳清單
app.get('/', (req,res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req,res) => {
  res.render('index',{ restaurants })
})

// 動態路由
app.get('/restaurants/:id', (req,res) => {
  const id = req.params.id
  const restaurant = restaurants.find((restaurant) => restaurant.id.toString() === id)
  res.render('show_page',{ restaurant })
})

// 依類別或名稱關鍵字搜尋餐廳
app.get('/search', (req,res) => {
  const keyword = req.query.keyword?.trim()
  const matchedRestaurants = keyword ? restaurants.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
  }) : restaurants
  res.render('index',{ restaurants: matchedRestaurants, keyword })
})

// 啟動並監聽伺服器
app.listen(port, () => {
  console.log(`Restaurant List listening on port ${port}`)
})