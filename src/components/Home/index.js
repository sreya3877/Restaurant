import {useState, useEffect} from 'react'
import Header from '../Header'
import DishItem from '../DishItem'
import './index.css'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [activeId, setActiveId] = useState('')
  const [cartItems, setCartItems] = useState([])

  // fetch data
  const fetchRestaurantApi = async () => {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    const data = await response.json()
    const formatted = data[0].table_menu_list.map(item => ({
      menuCategory: item.menu_category,
      menuCategoryId: item.menu_category_id,
      dishes: item.category_dishes.map(d => ({
        dishId: d.dish_id,
        dishName: d.dish_name,
        dishPrice: d.dish_price,
        dishCurrency: d.dish_currency,
        dishDescription: d.dish_description,
        dishImage: d.dish_image,
        dishCalories: d.dish_calories,
        dishAvailability: d.dish_Availability,
        dishType: d.dish_Type,
        addonCat: d.addonCat,
      })),
    }))
    setCategories(formatted)
    setActiveId(formatted[0].menuCategoryId)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchRestaurantApi()
  }, [])

  // add item
  const addItemToCart = dish => {
    const existing = cartItems.find(item => item.dishId === dish.dishId)
    if (existing) {
      setCartItems(prev =>
        prev.map(i =>
          i.dishId === dish.dishId ? {...i, quantity: i.quantity + 1} : i,
        ),
      )
    } else {
      setCartItems(prev => [...prev, {...dish, quantity: 1}])
    }
  }

  // remove item
  const removeItemFromCart = dish => {
    const existing = cartItems.find(item => item.dishId === dish.dishId)
    if (existing?.quantity > 1) {
      setCartItems(prev =>
        prev.map(i =>
          i.dishId === dish.dishId ? {...i, quantity: i.quantity - 1} : i,
        ),
      )
    } else {
      setCartItems(prev => prev.filter(i => i.dishId !== dish.dishId))
    }
  }

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner-border" />
      </div>
    )
  }

  const activeCategory = categories.find(cat => cat.menuCategoryId === activeId)

  return (
    <div className="home">
      <Header cartItems={cartItems} />

      <ul className="tabs">
        {categories.map(cat => (
          <li
            key={cat.menuCategoryId}
            className={`tab-item ${
              cat.menuCategoryId === activeId && 'active'
            }`}
            onClick={() => setActiveId(cat.menuCategoryId)}
          >
            {cat.menuCategory}
          </li>
        ))}
      </ul>

      <ul className="dishes-list">
        {activeCategory.dishes.map(dish => (
          <DishItem
            key={dish.dishId}
            dishDetails={dish}
            cartItems={cartItems}
            addItemToCart={addItemToCart}
            removeItemFromCart={removeItemFromCart}
          />
        ))}
      </ul>
    </div>
  )
}

export default Home
