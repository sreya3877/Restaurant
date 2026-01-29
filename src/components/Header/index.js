import './index.css'

const Header = ({cartItems}) => {
  const count = cartItems.reduce((a, c) => a + c.quantity, 0)

  return (
    <header className="header">
      <h1 className="logo">UNI Resto Cafe</h1>
      <div className="cart-section">
        <p className="orders">My Orders</p>
        <div className="cart-icon">
          <img src="/cart.png" alt="cart icon" className="cart-img" />
          <span className="count-badge">{count}</span>
        </div>
      </div>
    </header>
  )
}

export default Header
