import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Container from "../Container/Container";

const SharedLayout = () => {
  return (
    <Container>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </Container>
  );
};

export default SharedLayout;
