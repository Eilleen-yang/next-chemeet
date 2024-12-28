import SectionTitle from "@/common/Atoms/Text/SectionTitle";
import { getSession } from "@/auth";
import { StudyDataFull } from "@/types/model/StudyCard";
import { getStudy } from "@/lib/actions/studyAction";
import StudyCardItem from "@/common/Organisms/StudyCardItem";

export default async function MyStudyPage() {
  const session = await getSession();
  const userId = session?.user.id;
  if (!userId) return;

  const studyList: StudyDataFull[] = (await getStudy()).data;
  const myStudy = studyList.filter((list) => list.writer._id === userId);

  return (
    <div className="flex flex-col gap-100 gridContent">
      <section>
        <SectionTitle size="md" className="mb-6">
          참여 중인 스터디
        </SectionTitle>
        {myStudy.length > 0 ? (
          <ul className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-gutter-sm xl:gap-gutter-xl">
            {myStudy.map((card) => (
              <StudyCardItem key={card.studyId} card={card} />
            ))}
          </ul>
        ) : (
          <Empty text="참여 중인 스터디가 없어요. 흥미가 있는 스터디에 지원해보세요!" />
        )}
      </section>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-[19rem] border rounded-3xl text-label-dimmed text-center">
      {text}
    </div>
  );
}
