"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

const DEFAULT_ADDRESS = "0x804Ca1983a06dE0cd04e1Dfe2972d40f4c3B111D";

export const useAddressInput = () => {
  const [address, setAddress] = useState(DEFAULT_ADDRESS);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const validateAddress = (input: string) => {
    // We are checking if the string starts with "0x"
    // Also we are checking if it is followed by exactly 40 characters consisting of lowercase or uppercase letters from A to F or digits from 0 to 9
    const addressRegex = /^0x[a-fA-F0-9]{40}$/;
    return addressRegex.test(input);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setAddress(value);

    if (validateAddress(value)) {
      setIsValid(true);
      setError("");
    } else {
      setIsValid(false);
      setError("Invalid address. Please enter a valid address.");
    }
  };

  const handleSubmit = () => {
    if (isValid) {
      router.push(`/${address}`);
    }
  };

  return {
    address,
    isValid,
    error,
    handleChange,
    handleSubmit,
  };
};
