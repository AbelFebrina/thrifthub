'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

interface AddressContextType {
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  getDefaultAddress: () => Address | undefined;
}

const AddressContext = createContext<AddressContextType>({
  addresses: [],
  addAddress: () => {},
  updateAddress: () => {},
  deleteAddress: () => {},
  setDefaultAddress: () => {},
  getDefaultAddress: () => undefined,
});

const STORAGE_KEY = 'thrifthub_addresses';

export function AddressProvider({ children }: { children: React.ReactNode }) {
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setAddresses(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
  }, [addresses]);

  const addAddress = useCallback((address: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...address,
      id: 'addr-' + Math.random().toString(36).slice(2, 9),
      isDefault: addresses.length === 0 || address.isDefault,
    };
    setAddresses(prev => {
      // If new address is default, unset others
      if (newAddress.isDefault) {
        prev = prev.map(a => ({ ...a, isDefault: false }));
      }
      return [...prev, newAddress];
    });
  }, [addresses.length]);

  const updateAddress = useCallback((id: string, updates: Partial<Address>) => {
    setAddresses(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  }, []);

  const deleteAddress = useCallback((id: string) => {
    setAddresses(prev => {
      const remaining = prev.filter(a => a.id !== id);
      // If deleted was default, set first remaining as default
      if (prev.find(a => a.id === id)?.isDefault && remaining.length > 0) {
        remaining[0].isDefault = true;
      }
      return remaining;
    });
  }, []);

  const setDefaultAddress = useCallback((id: string) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
  }, []);

  const getDefaultAddress = useCallback(() => {
    return addresses.find(a => a.isDefault) || addresses[0];
  }, [addresses]);

  return (
    <AddressContext.Provider value={{
      addresses,
      addAddress,
      updateAddress,
      deleteAddress,
      setDefaultAddress,
      getDefaultAddress,
    }}>
      {children}
    </AddressContext.Provider>
  );
}

export function useAddress() {
  return useContext(AddressContext);
}

export type { Address };
