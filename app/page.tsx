"use client";
import "./home.css";
import { useEffect } from "react";
import { BannerSection } from "../components/home/BannerSection";
import { ClientSection } from "../components/home/ClientSection";
import { QuestionSection } from "../components/home/QuestionSection";
import { QASection } from "../components/home/QASection";
import { useAuth } from "@/components/auth/AuthContext";

export default function Page() {
  const { user, loading } = useAuth();
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  return (
    <>
      <BannerSection />
      {!loading && !user && <ClientSection />}
      <QASection />
      <QuestionSection />
    </>
  );
}
