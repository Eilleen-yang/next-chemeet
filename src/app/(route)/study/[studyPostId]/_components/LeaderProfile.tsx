import { ProfileSchema } from "@/types/model/User";
import { BadgeIcon, ProfileHeartIcon } from "@public/icons";
import { DummyProfileImg } from "@public/images";
import Image from "next/image";

export default function LeaderProfile({ writer }: { writer: ProfileSchema }) {
  return (
    <div className="max-w-screen-sm w-full">
      <div className="flex justify-between items-start">
        <div className="flex gap-7">
          <Image
            className="w-12 h-12 rounded-full"
            width={48}
            height={48}
            src={writer.profile_img || DummyProfileImg}
            alt="profile"
          />
          <div className="flex flex-col">
            <div className="flex gap-2">
              <span className="text-2xl font-semibold">
                {writer.position_tag} {writer.name}
              </span>
              {writer.role === "pro" ? (
                <Image src={BadgeIcon} alt="프로 뱃지" />
              ) : null}
            </div>
            <span className="text-sm text-label-dimmed"> {writer.email}</span>
          </div>
        </div>
        <button className="flex items-center gap-1 px-4 py-1 bg-main-25 rounded-full">
          <Image src={ProfileHeartIcon} alt="찜하기" />
          <span className="text-main-600 font-semibold">찜하기</span>
        </button>
      </div>
      <p className="pt-4 text-sm text-label-dimmed">{writer.introduce}</p>
      <div className="flex gap-2 flex-wrap mt-4">
        {writer.my_category.map((tag) => (
          <span
            key={tag.value}
            className="py-1 px-5 text-main-600 text-xs font-semibold border border-blue-600 rounded-twenty"
          >
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
}
