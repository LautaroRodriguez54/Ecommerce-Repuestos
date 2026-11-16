"use client";
import "./home.css";
import { BannerSection } from "../components/home/BannerSection";
import { ClientSection } from "../components/home/ClientSection";
import { QuestionSection } from "../components/home/QuestionSection";
import { QASection } from "../components/home/QASection";
import { useAuth } from "@/components/auth/AuthContext";

export default function Page() {
  const { user, loading } = useAuth();
  return (
    <>
      <BannerSection />
      {!loading && !user && <ClientSection />}
      <QASection />
      <QuestionSection />
    </>
  );
}
