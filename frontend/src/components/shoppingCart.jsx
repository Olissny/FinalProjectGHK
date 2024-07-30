import styles from "./shoppingCart.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import ShoppingCartList from "./ShoppingCartList";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import emptyCart from "../image/empty.png";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

export default function ShoppingCart({
  chosenFoods,
  delFood,
  delAllFood,
  addItem,
  delItem,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };
  const handleScrollToTop = (num, str) => {
    window.scrollTo({
      top: num,
      behavior: str
    });
  };
  function handleClose() {
    setIsOpen(false);
  }
  function handleComfirm() {
    handleScrollToTop(0, 'auto');
    setIsOpen(false);
  }
  function handleClear() {
    // TODO pop-up window to comfrim delete
    delAllFood();
  }
  function handleToFoodMenu() {
    setTimeout(() => {
      handleScrollToTop(900, 'smooth');
    }, 100) 
    setIsOpen(false);
  }

  function totalQty() {
    let count = 0;
    for (let i = 0; i < chosenFoods.length; i++) {
      count += chosenFoods[i]["quantity"];
    }
    return count;
  }

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 0,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  return (
    <div className={styles.bgContainer}>
      <div className={styles.div_shoppingCart}>
        <button
          onClick={toggleDrawer(true)}
          className={styles.btn_shoppingCart}
        >
          <IconButton className={styles.cartBtn} aria-label="cart">
            <StyledBadge badgeContent={totalQty()} color="primary">
              <ShoppingCartIcon sx={{ fontSize: 30 }} />
            </StyledBadge>
          </IconButton>
          <label
            style={{ fontSize: "28px" }}
            className={styles.lbl_shoppingCart}
          >
            購 物 車
          </label>
        </button>
        <Drawer
          classes={{ paper: styles.drawerPaper }}
          anchor="right"
          open={isOpen}
          onClose={toggleDrawer(false)}
        >
          <div className={styles.drawerContent}>
            {chosenFoods.length === 0 ? 
              (<div className={styles.emptyCart}>
                <img src={emptyCart} alt="Empty Cart" />
                <p>Your Cart is Empty</p>
                <p>Add items to get started</p>
                <Link to="/home">
                  <button onClick={() => handleToFoodMenu()}>Continue to shop</button>
                </Link>
              </div>):
              (<div className={styles.notEmptyCart}>
                <div className={styles.CartList}>
                {chosenFoods
                  .filter(item => item.chineseName && item.foodPic && item.price)
                  .map((item, index) => (
                    <ShoppingCartList
                      key={index}
                      id={index}
                      chineseName={item.chineseName}
                      foodPic={item.foodPic}
                      price={item.price}
                      quantity={item.quantity}
                      delFood={delFood}
                      addItem={addItem}
                      delItem={delItem}
                    />
                  ))
                }
                </div>
                <div className={styles.controlPanel}>
                  <button className={styles.btn_Clear} onClick={() => handleClose()}></button>
                  <Link to="/cart" className={styles.btnComfirm} onClick={() => handleComfirm()}></Link>
                  <button className={styles.btn_Clear} onClick={() => handleClear()}></button>
                  <Link to="/home" className={styles.btn_ToFoodMenu} onClick={() => handleToFoodMenu()}></Link>
                </div>
              </div>)}
          </div>
        </Drawer>
      </div>
    </div>
  );
}
