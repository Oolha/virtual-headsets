import { SignInModal } from "../SignIn/SignIn";
import { SignUpModal } from "../SignUp/SignUp";

interface AuthModalsProps {
  isSignInOpen: boolean;
  isSignUpOpen: boolean;
  closeSignIn: () => void;
  closeSignUp: () => void;
  openSignIn: () => void;
  openSignUp: () => void;
}

export const AuthModals: React.FC<AuthModalsProps> = ({
  isSignInOpen,
  isSignUpOpen,
  closeSignIn,
  closeSignUp,
  openSignIn,
  openSignUp,
}) => {
  return (
    <>
      <SignInModal
        isOpen={isSignInOpen}
        onClose={closeSignIn}
        openRegister={openSignUp}
      />
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={closeSignUp}
        openLogin={openSignIn}
      />
    </>
  );
};
