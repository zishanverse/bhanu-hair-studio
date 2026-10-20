import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  ScrollTrigger.config({ ignoreMobileResize: true });
  try {
    CustomEase.create("luxe", "0.22, 1, 0.36, 1");
  } catch (e) {
    // Fallback if CustomEase is already created
  }
}

export { gsap, ScrollTrigger, CustomEase };
