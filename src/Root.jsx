import { useEffect, useRef } from "react";
import GlobalStyles from "./styles/GlobalStyles.styles";
import { Outlet } from "react-router-dom";
import Lenis from "lenis";
import Intro from "./pages/Intro";
import Header from "./Components/Header";
import Profile from "./pages/Profile";
import ProjectPart from "./pages/ProjectPart";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "./Components/Footer";

gsap.registerPlugin(ScrollTrigger);

const BgOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000; /* 처음 블랙 */
  z-index: -1;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

function Root() {
  const overlayRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    if (overlayRef.current) {
      // 인트로 들어가자마자 색상 페이드
      gsap.to(overlayRef.current, {
        backgroundColor: "rgba(159, 80, 124, 0.2)",
        opacity: 1,
        duration: 8, // 페이드 속도 (느리게)
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#intro", // 인트로 섹션
          start: "top top", // 들어가자마자
          end: "bottom center", // 프로필까지 유지
          scrub: true, // 스크롤에 따라 부드럽게
        },
      });
    }

    return () => {
      lenis.stop();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <>
      <GlobalStyles />
      <ContentWrapper>
        <Header />
        <div id="intro">
          <Intro />
        </div>
        <BgOverlay ref={overlayRef} />

        <div id="profile">
          <Profile />
        </div>
        <ProjectPart />
        <Outlet />
      </ContentWrapper>

      <Footer id="footer" />
    </>
  );
}

export default Root;
