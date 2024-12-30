import Image from "next/image";
import ResponsiveMenu from "./ProfileMenu/ResponsiveMenu";
import { DummyProfileImg } from "@public/images";
import { getUserData } from "@/lib/actions/userAction";
import { getSession } from "@/auth";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getAlert } from "@/lib/actions/AlertAction";
import Link from "next/link";

export default async function SessionedHeader() {
  const session = await getSession();
  const userId = session?.user.id;
  const queryClient = new QueryClient();
  let user;

  if (userId) {
    await queryClient.prefetchQuery({
      queryKey: ["alert", userId],
      queryFn: () => getAlert(userId),
    });
    const result = await getUserData(userId);
    user = result.data;
  } else {
    return (
      <Link
        href="/login"
        type="button"
        className="py-2 px-4 border border-solid border-main-600 rounded-[.6rem] text-main-600 font-semibold"
      >
        로그인
      </Link>
    );
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div>ddd</div>
      <div data-name="header__right-side__profile">
        <ResponsiveMenu
          profileImage={
            <div className="flex items-center">
              <span className="my-3 w-10 h-10 overflow-hidden rounded-full">
                <Image
                  src={user.profile_img || DummyProfileImg}
                  width="40"
                  height="40"
                  alt="profile img"
                  className="object-cover min-w-full h-full"
                />
              </span>
              <span className="pl-4 lg:hidden">{user?.name}</span>
            </div>
          }
        />
      </div>
    </HydrationBoundary>
  );
}
