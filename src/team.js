/**********
 * Team Page Scripts:
 * These are run on our-services page
 *********/

const globalVariables = {
  breakpoints: {
    // these are min widths
    desktopl: 1920,
    desktop: 992,
    tablet: 768,
    mobile: {
      landscape: 480,
    },
  },
};

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
