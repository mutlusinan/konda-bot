import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import "react-chatbot-kit/build/main.css";
import ChatbotComponent from "@/components/chatbot/chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export default function Home() {
  return (
    <>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <div style={{ position: "fixed", bottom: 0, right: 0 }}>
          <ChatbotComponent />
        </div>
      </div>
    </>
  );
}
