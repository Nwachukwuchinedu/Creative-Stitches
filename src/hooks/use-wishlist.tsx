
"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import type { Product } from '@/lib/types';

interface WishlistState {
  items: Product[];
}

interface WishlistContextProps extends WishlistState {
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isItemInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: { product: Product } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'SET_STATE'; payload: WishlistState };

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.product.id);
      if (existingItem) {
        return state; // Item already in wishlist
      }
      return {
        ...state,
        items: [...state.items, action.payload.product],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.productId),
      };
    case 'CLEAR_WISHLIST':
      return { ...state, items: [] };
    case 'SET_STATE':
      return action.payload;
    default:
      return state;
  }
};

const WISHLIST_STORAGE_KEY = 'stitchstyle_wishlist';

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) {
        dispatch({ type: 'SET_STATE', payload: JSON.parse(storedWishlist) });
      }
    } catch (error) {
      console.error("Could not load wishlist from local storage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Could not save wishlist to local storage", error);
    }
  }, [state]);

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: { product } });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  const isItemInWishlist = (productId: string) => {
    return state.items.some(item => item.id === productId);
  };
  
  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  return (
    <WishlistContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        isItemInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
