"use client";
import React from "react";
import Button from "./button";
import DarkMode from "../hooks/use-dark-mode";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const { theme, toggleTheme } = DarkMode();
  return (
    <Button variant='ghost' size='base' onClick={toggleTheme}>
      {theme === "dark" ? (
        <Moon className='h-4 w-4' />
      ) : (
        <Sun className='w-4 h-4' />
      )}
    </Button>
  );
}
