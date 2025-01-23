import { Outlet, useLocation } from "react-router-dom";
import { Suspense, useEffect } from "react";
import Container from "../Container/Container";
import { scrollToTop } from "../../config/navigation";

const SharedLayout = () => {
  const location = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);
  return (
    <Container>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </Container>
  );
};

export default SharedLayout;
