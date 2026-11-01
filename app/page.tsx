"use client";
import "./home.css";
import {BannerSection} from "../components/home/BannerSection.jsx";
import {ClientSection} from "../components/home/ClientSection";
import {QuestionSection} from "../components/home/QuestionSection";
import {QASection} from "../components/home/QASection";
export default function Page() {
  return (
    <>
      <BannerSection />
      <ClientSection />
      <QASection />
      <QuestionSection />
      
    </>
  );
}
