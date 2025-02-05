import { Outlet, useLocation } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Container from "../Container/Container";
import { scrollToTop } from "../../config/navigation";
import Loader from "../Loader/Loader";

const SharedLayout = () => {
  const location = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);

  const getMetaTags = () => {
    const path = location.pathname;
    let title = "HoloGaze | Virtual Reality Store";
    let description = "Discover the latest VR headsets and games";

    switch (path) {
      case "/catalog":
        title = "VR Catalog | HoloGaze";
        description = "Browse our collection of VR headsets and accessories";
        break;
      case "/cart":
        title = "Shopping Cart | HoloGaze";
        description = "Review and complete your VR equipment purchase";
        break;
      case "/profile":
        title = "User Profile | HoloGaze";
        description = "Manage your HoloGaze account and orders";
        break;
    }

    return { title, description };
  };
  const { title, description } = getMetaTags();
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <link
          rel="canonical"
          href={`https://your-domain.com${location.pathname}`}
        />

        <link rel="preconnect" href="https://your-api-domain.com" />
        <link rel="dns-prefetch" href="https://your-api-domain.com" />
        <meta name="robots" content="index, follow" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Container>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Container>
    </>
  );
};

export default SharedLayout;
