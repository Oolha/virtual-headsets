type NavLinkType = {
  readonly path: string;
  readonly label: string;
  readonly isSection: boolean;
};

export const navLinks: NavLinkType[] = [
  { path: "/", label: "Home", isSection: false },
  { path: "/catalog", label: "Catalog", isSection: false },
  { path: "/#contact", label: "Contact", isSection: true },
  { path: "/#features", label: "Features", isSection: true },
];
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
export const handleSectionNavigation = (
  path: string,
  isSection: boolean,
  e: React.MouseEvent,
  navigate: Function,
  onClose?: () => void
) => {
  if (isSection) {
    e.preventDefault();
    const sectionId = path.replace("/#", "");

    if (sectionId === "contact") {
      const section = document.getElementById(sectionId);

      if (section) {
        const elementTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const scrollTo = elementTop - windowHeight * 0.3;

        window.scrollBy({
          top: scrollTo,
          behavior: "smooth",
        });

        if (onClose) {
          onClose();
        }
      }
      return;
    }

    const currentPath = window.location.pathname;
    if (currentPath !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          const elementTop = section.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          const scrollTo = elementTop - windowHeight * 0.3;

          window.scrollBy({
            top: scrollTo,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        const elementTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const scrollTo = elementTop - windowHeight * 0.3;

        window.scrollBy({
          top: scrollTo,
          behavior: "smooth",
        });
      }
    }

    if (onClose) {
      onClose();
    }
  } else {
    scrollToTop();
  }
};
