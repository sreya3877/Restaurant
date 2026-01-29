import './index.css'

const DishItem = ({
  dishDetails,
  cartItems,
  addItemToCart,
  removeItemFromCart,
}) => {
  const {
    dishId,
    dishName,
    dishType,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishImage,
    dishCalories,
    addonCat,
    dishAvailability,
  } = dishDetails

  const quantity = cartItems.find(item => item.dishId === dishId)?.quantity || 0

  return (
    <li className="dish-item">
      <div className="dish-left">
        <div
          className={`veg-indicator ${dishType === 1 ? 'non-veg' : 'veg'}`}
        />
      </div>
      <div className="dish-info">
        <h3>{dishName}</h3>
        <p className="price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="desc">{dishDescription}</p>

        {dishAvailability ? (
          <div className="counter">
            <button
              type="button"
              onClick={() => removeItemFromCart(dishDetails)}
            >
              -
            </button>
            <span>{quantity}</span>
            <button type="button" onClick={() => addItemToCart(dishDetails)}>
              +
            </button>
          </div>
        ) : (
          <p className="not-available">Not available</p>
        )}

        {addonCat.length > 0 && (
          <p className="custom">Customizations available</p>
        )}
      </div>

      <p className="calories">{dishCalories} calories</p>

      {dishImage && <img alt={dishName} src={dishImage} className="img" />}
    </li>
  )
}

export default DishItem
