import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
// import { BuiltInProviderType } from "@auth-core";
import { signIn } from "next-auth/react";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { IconType, Icons } from "@/components/shared/icons";

type TSignInParameters = Parameters<typeof signIn>;
type TProvider = TSignInParameters[0];

interface OAuthSignInButtonProps {
  signInClicked?: boolean;
  setSignInClicked: Dispatch<SetStateAction<boolean>>;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
  provider: TProvider; // BuiltInProviderType;
  ProviderIcon: IconType; // React.FC;
  text: string;
}

function OAuthSignInButton(props: OAuthSignInButtonProps) {
  const {
    // prettier-ignore
    signInClicked,
    setSignInClicked,
    setShowSignInModal,
    provider,
    ProviderIcon,
    text,
  } = props;
  return (
    <Button
      variant="default"
      disabled={signInClicked}
      onClick={() => {
        setSignInClicked(true);
        signIn(provider, { redirect: false }).then(() =>
          setTimeout(() => {
            setShowSignInModal(false);
          }, 400),
        );
      }}
    >
      {signInClicked ? (
        <Icons.spinner className="mr-2 size-4 animate-spin" />
      ) : (
        <ProviderIcon className="mr-2 size-4" />
      )}{" "}
      {text}
    </Button>
  );
}

function SignInModal({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [signInClicked, setSignInClicked] = useState(false);

  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center space-y-3 border-b bg-background px-4 py-6 pt-8 text-center md:px-16">
          <a href={siteConfig.url}>
            <Icons.logo className="size-10" />
          </a>
          <h3 className="font-urban text-2xl font-bold">Sign In</h3>
          <p className="text-sm text-gray-500">
            This is strictly for demo purposes - only your email and profile
            picture will be stored.
          </p>
        </div>

        <div className="flex flex-col space-y-4 bg-secondary/50 px-4 py-8 md:px-16">
          <OAuthSignInButton
            signInClicked={signInClicked}
            setSignInClicked={setSignInClicked}
            setShowSignInModal={setShowSignInModal}
            provider="github"
            ProviderIcon={Icons.github}
            text="Sign In with Github"
          />
          <OAuthSignInButton
            signInClicked={signInClicked}
            setSignInClicked={setSignInClicked}
            setShowSignInModal={setShowSignInModal}
            provider="yandex"
            ProviderIcon={Icons.yandex}
            text="Sign In with Yandex"
          />
          <OAuthSignInButton
            signInClicked={signInClicked}
            setSignInClicked={setSignInClicked}
            setShowSignInModal={setShowSignInModal}
            provider="google"
            ProviderIcon={Icons.google}
            text="Sign In with Google"
          />
          {/*
          <Button
            variant="default"
            disabled={signInClicked}
            onClick={() => {
              setSignInClicked(true);
              signIn("google", { redirect: false }).then(() =>
                setTimeout(() => {
                  setShowSignInModal(false);
                }, 400),
              );
            }}
          >
            {signInClicked ? (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            ) : (
              <Icons.google className="mr-2 size-4" />
            )}{" "}
            Sign In with Google
          </Button>
          */}
        </div>
      </div>
    </Modal>
  );
}

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({
      setShowSignInModal,
      SignInModal: SignInModalCallback,
    }),
    [setShowSignInModal, SignInModalCallback],
  );
}
