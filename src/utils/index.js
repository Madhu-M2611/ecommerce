import { useEffect, useMemo, useState } from "react";

export function makeUpLabel(key) {
  let newTitle = key.charAt(0).toUpperCase() + key.slice(1);

  return newTitle.replace(/-(.)/g, function (match, group) {
    return " " + group.toUpperCase();
  });
}

export function addCartItem(cartItems, addedItem) {
  let newCartItems = [];
  const tmpCart = [...cartItems];
  let isExist = tmpCart.some((_item) => _item.id === addedItem.id);
  if (!!isExist) {
    newCartItems = tmpCart.map((_item) =>
      _item.id === addedItem.id
        ? { ..._item, quantity: _item.quantity + 1 }
        : _item
    );
  } else {
    newCartItems = [
      ...tmpCart,
      {
        ...addedItem,
        quantity: 1,
        total: addedItem.price,
        discountedPrice: Number(
          parseFloat(
            (addedItem.price * (100 - addedItem.discountPercentage)) / 100
          ).toFixed(0)
        ),
      },
    ];
  }
  localStorage.setItem("order", JSON.stringify(newCartItems));
  return newCartItems;
}

export function removeCartItem(cartItems, removedItem) {
  let newCartItems = [...cartItems];
  localStorage.setItem("order", JSON.stringify(newCartItems));
  return newCartItems.filter((item) => item.id !== removedItem.id);
}

export function updateCart(cartItems) {
  localStorage.setItem("order", JSON.stringify(cartItems));
}

export function clearCart() {
  localStorage.setItem("order", JSON.stringify([]));
}

export default function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      ),
    [ref]
  );

  useEffect(() => {
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return isIntersecting;
}
