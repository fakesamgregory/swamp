/**********
 * Team Page Scripts:
 * These are run on our-services page
 *********/
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = gsap.utils.toArray(".team-member");
teamMembers.forEach((teamMember) => {
  gsap.fromTo(
    member,
    {
      y: 100,
      autoAlpha,
    },
    {
      autoAlpha: 1,
      y: 0,
      scrollTrigger: {
        trigger: teamMember,
        start: "center bottom",
      },
    }
  );
});
