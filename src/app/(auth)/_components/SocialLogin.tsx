import Image from "next/image";

type TSocialLogin = {
  icon: string;
  provider: string;
};

export function SocialLogin(props: TSocialLogin) {
  const { icon, provider } = props;

  return (
    <button>
      <Image src={icon} alt={`${provider} 로그인`} />
    </button>
  );
}
