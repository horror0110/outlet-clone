import React from 'react'

export const calculateTotalPrice = (items:any) => {
    let total = 0;
    for (const item of items) {
      total += item.price * item.quantity;
    }
    return total;
  };